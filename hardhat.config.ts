import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        // Avalanche Fuji Testnet (PARA TESTING)
        avalancheFuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            chainId: 43113,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            gasPrice: 25000000000,
        },
        // Avalanche Mainnet (PARA PRODUCCIÓN)
        avalanche: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            gasPrice: 25000000000,
        },
    },
    etherscan: {
        apiKey: {
            avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
            avalanche: process.env.SNOWTRACE_API_KEY || "",
        },
        customChains: [
            {
                network: "avalancheFujiTestnet",
                chainId: 43113,
                urls: {
                    apiURL: "https://api-testnet.snowtrace.io/api",
                    browserURL: "https://testnet.snowtrace.io"
                }
            }
        ]
    },
    sourcify: {
        enabled: false
    }
};

export default config;
