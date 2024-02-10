import { ethers } from "ethers";

const mnem = "design smart butter ";

const entro = ethers.Mnemonic.phraseToEntropy(mnem);

const entropyArray = ethers.toBeArray(entro);

console.log(entropyArray);
