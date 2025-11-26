import hre from "hardhat";

async function main() {
    console.log("🔍 Checking wallet balance...\n");

    const [deployer] = await hre.ethers.getSigners();

    console.log("📝 Wallet Address:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    const balanceInAvax = hre.ethers.formatEther(balance);

    console.log("💰 Balance:", balanceInAvax, "AVAX");

    if (balance < hre.ethers.parseEther("0.5")) {
        console.log("\n⚠️  WARNING: Low balance!");
        console.log("   You need at least 0.5 AVAX to deploy.");
        console.log("   Get testnet AVAX from: https://faucet.avax.network/\n");
    } else {
        console.log("\n✅ Balance is sufficient for deployment!\n");
    }

    // Check network
    const network = await hre.ethers.provider.getNetwork();
    console.log("🌐 Network:", network.name);
    console.log("🔗 Chain ID:", network.chainId.toString());

    if (network.chainId === 43113n) {
        console.log("✅ Connected to Avalanche Fuji Testnet\n");
    } else if (network.chainId === 43114n) {
        console.log("✅ Connected to Avalanche Mainnet\n");
    } else {
        console.log("⚠️  Unknown network\n");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
