// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @title RailDropEscrow
 * @dev Smart contract for splitting bills among friends using USDC
 * Powered by Rail + Avalanche
 */
contract RailDropEscrow is ReentrancyGuard, Ownable {
    
    IERC20 public usdc;
    address public railTreasury; // Address where Rail receives funds for conversion
    
    enum SplitStatus { ACTIVE, COMPLETED, CANCELLED }
    
    struct Participant {
        address wallet;
        uint256 amount;
        bool paid;
    }
    
    struct Split {
        bytes32 id;
        address creator;
        uint256 totalAmount;
        uint256 paidAmount;
        uint256 participantCount;
        SplitStatus status;
        string description; // "Dinner at La Pizzeria"
        address payee; // Restaurant/merchant address (optional)
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    mapping(bytes32 => Split) public splits;
    mapping(bytes32 => Participant[]) public participants;
    mapping(bytes32 => mapping(address => uint256)) public participantIndex;
    
    // Events
    event SplitCreated(bytes32 indexed splitId, address indexed creator, uint256 totalAmount, uint256 participantCount);
    event PaymentReceived(bytes32 indexed splitId, address indexed participant, uint256 amount);
    event SplitCompleted(bytes32 indexed splitId, uint256 totalAmount);
    event SplitCancelled(bytes32 indexed splitId);
    event FundsForwarded(bytes32 indexed splitId, address indexed recipient, uint256 amount);
    
    
    constructor(address _usdc, address _railTreasury) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        railTreasury = _railTreasury;
    }

    
    /**
     * @dev Create a new split
     * @param _totalAmount Total amount to split (in USDC wei)
     * @param _participantWallets Array of participant wallet addresses
     * @param _participantAmounts Array of amounts each participant owes
     * @param _description Description of the split
     * @param _payee Optional merchant/restaurant address
     * @param _expiresIn Expiration time in seconds (e.g., 86400 = 24 hours)
     */
    function createSplit(
        uint256 _totalAmount,
        address[] calldata _participantWallets,
        uint256[] calldata _participantAmounts,
        string calldata _description,
        address _payee,
        uint256 _expiresIn
    ) external returns (bytes32 splitId) {
        require(_totalAmount > 0, "Amount must be > 0");
        require(_participantWallets.length > 0, "Need at least 1 participant");
        require(_participantWallets.length == _participantAmounts.length, "Arrays length mismatch");
        require(_expiresIn >= 3600, "Expiration must be >= 1 hour"); // Min 1 hour
        
        // Verify amounts sum to total
        uint256 sum = 0;
        for (uint256 i = 0; i < _participantAmounts.length; i++) {
            sum += _participantAmounts[i];
        }
        require(sum == _totalAmount, "Amounts don't sum to total");
        
        // Generate unique split ID
        splitId = keccak256(abi.encodePacked(
            msg.sender,
            _totalAmount,
            block.timestamp,
            block.prevrandao
        ));
        
        // Create split record
        splits[splitId] = Split({
            id: splitId,
            creator: msg.sender,
            totalAmount: _totalAmount,
            paidAmount: 0,
            participantCount: _participantWallets.length,
            status: SplitStatus.ACTIVE,
            description: _description,
            payee: _payee,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + _expiresIn
        });
        
        // Add participants
        for (uint256 i = 0; i < _participantWallets.length; i++) {
            participants[splitId].push(Participant({
                wallet: _participantWallets[i],
                amount: _participantAmounts[i],
                paid: false
            }));
            participantIndex[splitId][_participantWallets[i]] = i;
        }
        
        emit SplitCreated(splitId, msg.sender, _totalAmount, _participantWallets.length);
    }
    
    /**
     * @dev Participant pays their share
     * @param _splitId ID of the split
     */
    function payShare(bytes32 _splitId) external nonReentrant {
        Split storage split = splits[_splitId];
        require(split.status == SplitStatus.ACTIVE, "Split not active");
        require(block.timestamp < split.expiresAt, "Split expired");
        
        // Get participant info
        uint256 idx = participantIndex[_splitId][msg.sender];
        Participant storage participant = participants[_splitId][idx];
        
        require(participant.wallet == msg.sender, "Not a participant");
        require(!participant.paid, "Already paid");
        require(participant.amount > 0, "Amount is 0");
        
        // Transfer USDC from participant to contract
        require(
            usdc.transferFrom(msg.sender, address(this), participant.amount),
            "Transfer failed"
        );
        
        // Update state
        participant.paid = true;
        split.paidAmount += participant.amount;
        
        emit PaymentReceived(_splitId, msg.sender, participant.amount);
        
        // Check if split is complete
        if (split.paidAmount == split.totalAmount) {
            _completeSplit(_splitId);
        }
    }
    
    /**
     * @dev Internal function to complete split and forward funds
     */
    function _completeSplit(bytes32 _splitId) internal {
        Split storage split = splits[_splitId];
        split.status = SplitStatus.COMPLETED;
        
        // Forward all USDC to Rail treasury for fiat conversion
        require(
            usdc.transfer(railTreasury, split.totalAmount),
            "Forward failed"
        );
        
        emit SplitCompleted(_splitId, split.totalAmount);
        emit FundsForwarded(_splitId, railTreasury, split.totalAmount);
    }
    
    /**
     * @dev Cancel split and refund participants (only creator or after expiration)
     */
    function cancelSplit(bytes32 _splitId) external nonReentrant {
        Split storage split = splits[_splitId];
        require(split.status == SplitStatus.ACTIVE, "Split not active");
        require(
            msg.sender == split.creator || block.timestamp >= split.expiresAt,
            "Not authorized or not expired"
        );
        
        split.status = SplitStatus.CANCELLED;
        
        // Refund all participants who paid
        for (uint256 i = 0; i < participants[_splitId].length; i++) {
            Participant storage participant = participants[_splitId][i];
            if (participant.paid) {
                require(
                    usdc.transfer(participant.wallet, participant.amount),
                    "Refund failed"
                );
            }
        }
        
        emit SplitCancelled(_splitId);
    }
    
    /**
     * @dev Get split details
     */
    function getSplit(bytes32 _splitId) external view returns (
        address creator,
        uint256 totalAmount,
        uint256 paidAmount,
        uint256 participantCount,
        SplitStatus status,
        string memory description,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        Split storage split = splits[_splitId];
        return (
            split.creator,
            split.totalAmount,
            split.paidAmount,
            split.participantCount,
            split.status,
            split.description,
            split.createdAt,
            split.expiresAt
        );
    }
    
    /**
     * @dev Get all participants for a split
     */
    function getParticipants(bytes32 _splitId) external view returns (Participant[] memory) {
        return participants[_splitId];
    }
    
    /**
     * @dev Update Rail treasury address (only owner)
     */
    function updateRailTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        railTreasury = _newTreasury;
    }
    
    /**
     * @dev Emergency withdraw (only owner, only if funds stuck)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner(), balance), "Emergency withdraw failed");
    }
}
