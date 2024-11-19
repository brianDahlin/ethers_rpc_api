import { ethers } from "ethers";

async function getNetworkId(rpcUrl) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const network = await provider.getNetwork();
        console.log(`Network ID: ${network.chainId}`);
    } catch (error) {
        console.error("Error fetching network ID:", error);
    }
}

const rpcUrl = "https://stagenet-rpc.atleta.network:9944";

getNetworkId(rpcUrl);
