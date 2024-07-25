import { ethers } from "ethers";

function generateMnemonic() {
  const entropy = ethers.randomBytes(32);
  console.log(entropy);
  return ethers.Mnemonic.entropyToPhrase(entropy);
}

const mnemonic = generateMnemonic();
console.log(mnemonic);
