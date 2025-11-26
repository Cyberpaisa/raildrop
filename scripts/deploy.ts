import hre from "hardhat";

async function main() {
    console.log("🚀 Deploying RailDropEscrow...\n");

    // USDC on Avalanche Fuji Testnet
    const USDC_ADDRESS = "0x5425890298aed601595a70AB815c96711a31Bc65"; // USDC Fuji testnet

    // Temporary Rail treasury (deployer wallet for testing)
    const [deployer] = await hre.ethers.getSigners();
    const RAIL_TREASURY = deployer.address; // Por ahora, usamos tu wallet

    console.log("📝 Deploying with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "AVAX\n");

    if (balance < hre.ethers.parseEther("0.5")) {
        console.log("⚠️  WARNING: Low balance. Get testnet AVAX from:");
        console.log("   https://faucet.avax.network/\n");
    }

    // Deploy
    const RailDropEscrow = await hre.ethers.getContractFactory("RailDropEscrow");
    console.log("⏳ Deploying contract...");

    const escrow = await RailDropEscrow.deploy(USDC_ADDRESS, RAIL_TREASURY);
    await escrow.waitForDeployment();

    const address = await escrow.getAddress();

    console.log("\n✅ SUCCESS! Contract deployed to:", address);
    console.log("🔗 View on Explorer:", `https://testnet.snowtrace.io/address/${address}`);
    console.log("\n📋 Save this address for frontend:\n");
    console.log(`   CONTRACT_ADDRESS="${address}"\n`);

    console.log("🔍 Verifying contract on Snowtrace...");
    console.log("   (This may take 1-2 minutes)\n");

    // Wait for a few block confirmations
    const deployTx = escrow.deploymentTransaction();
    if (deployTx) {
        await deployTx.wait(5);
    }

    try {
        await hre.run("verify:verify", {
            address: address,
            constructorArguments: [USDC_ADDRESS, RAIL_TREASURY],
        });
        console.log("✅ Contract verified!");
    } catch (error: any) {
        if (error.message.includes("Already Verified")) {
            console.log("✅ Contract already verified!");
        } else {
            console.log("⚠️  Verification failed, but you can verify manually later");
            console.log("   Run this command:");
            console.log(`   npx hardhat verify --network avalancheFuji ${address} ${USDC_ADDRESS} ${RAIL_TREASURY}`);
        }
    }

    console.log("\n🎉 Deployment complete!\n");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
