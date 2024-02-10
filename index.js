import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

await provider
  .getNetwork()
  .then((network) => {
    console.log("Network ID:", network.chainId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
