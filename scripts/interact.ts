import hre from "hardhat";

// INSTRUCCIONES:
// 1. Primero deploya el contrato con: npm run deploy:fuji
// 2. Copia el contract address
// 3. Reemplaza CONTRACT_ADDRESS abajo con tu address
// 4. Ejecuta: npx hardhat run scripts/interact.ts --network avalancheFuji

const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE"; // ⬅️ REEMPLAZA ESTO

async function main() {
    console.log("🔗 Interacting with RailDropEscrow...\n");

    // Get contract instance
    const RailDropEscrow = await hre.ethers.getContractFactory("RailDropEscrow");
    const contract = RailDropEscrow.attach(CONTRACT_ADDRESS);

    console.log("📝 Contract Address:", CONTRACT_ADDRESS);

    // Get contract info
    console.log("\n📊 Contract Info:");
    const usdc = await contract.usdc();
    const railTreasury = await contract.railTreasury();

    console.log("   USDC Address:", usdc);
    console.log("   Rail Treasury:", railTreasury);

    // Example: Create a test split
    console.log("\n🧪 Creating test split...");

    const [deployer, addr1, addr2] = await hre.ethers.getSigners();

    const totalAmount = hre.ethers.parseUnits("100", 6); // 100 USDC (6 decimals)
    const participantWallets = [deployer.address, addr1.address];
    const participantAmounts = [
        hre.ethers.parseUnits("50", 6), // 50 USDC
        hre.ethers.parseUnits("50", 6)  // 50 USDC
    ];
    const description = "Test Dinner Split";
    const payee = hre.ethers.ZeroAddress;
    const expiresIn = 86400; // 24 hours

    try {
        const tx = await contract.createSplit(
            totalAmount,
            participantWallets,
            participantAmounts,
            description,
            payee,
            expiresIn
        );

        console.log("   Transaction hash:", tx.hash);
        console.log("   Waiting for confirmation...");

        const receipt = await tx.wait();
        console.log("   ✅ Split created!");
        console.log("   Block number:", receipt?.blockNumber);

        // Get split ID from event
        const event = receipt?.logs[0];
        if (event) {
            console.log("   Split ID:", event.topics[1]);
        }

    } catch (error: any) {
        console.log("   ⚠️  Error creating split:", error.message);
        console.log("   This is expected if you haven't approved USDC yet.");
    }

    console.log("\n✨ Interaction complete!");
    console.log("\n🔗 View on Snowtrace:");
    console.log(`   https://testnet.snowtrace.io/address/${CONTRACT_ADDRESS}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
