import { ethers } from "ethers";

function generateMnemonic() {
  const entropy = new Uint8Array([72, 48]);
  return ethers.Mnemonic.entropyToPhrase(entropy);
}

const mnemonic = generateMnemonic();
console.log(mnemonic);
