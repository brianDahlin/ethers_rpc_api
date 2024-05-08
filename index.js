import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://testnet-rpc.atleta.network:9944"
);

await provider
  .getNetwork()
  .then((network) => {
    console.log("Network ID:", network.chainId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
