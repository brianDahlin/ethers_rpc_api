import { ethers } from "ethers";

function generateMnemonic() {
  const entropy = new Uint8Array([228, 1488, 322, "xyu"]);
  return ethers.Mnemonic.entropyToPhrase(entropy);
}

const mnemonic = generateMnemonic();
console.log(mnemonic);
