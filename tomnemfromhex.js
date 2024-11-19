import { ethers } from 'ethers';

const entropyHex = '';

function generateMnemonic(entropyHex) {
    const entropy = ethers.getBytes(entropyHex);
    const mnemonic = ethers.Mnemonic.fromEntropy(entropy);
    return mnemonic.phrase;
}

const mnemonic = generateMnemonic(entropyHex);
console.log('Mnemonic:', mnemonic);

// Проверяем количество слов в мнемонике
const wordCount = mnemonic.split(' ').length;
console.log(`Количество слов в мнемонике: ${wordCount}`);

// Создаем кошелек из мнемоники
const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);
console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
