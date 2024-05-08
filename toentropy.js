import { ethers } from "ethers";

const mnem = "design xanax penis loxer nuher gloomik";

const entro = ethers.Mnemonic.phraseToEntropy(mnem);

const entropyArray = ethers.toBeArray(entro);

console.log(entropyArray);
