import { ethers } from "ethers";
import fs from 'fs';

function generateMnemonic(byteLength) {
  const entropy = ethers.randomBytes(byteLength);
  console.log("Entropy (Buffer):", entropy);
  const entropyHex = ethers.hexlify(entropy);
  const mnemonic = ethers.Mnemonic.entropyToPhrase(entropy);
  return { entropyHex, mnemonic };
}


const desiredByteLength = 32;

const { entropyHex, mnemonic } = generateMnemonic(desiredByteLength);

async function deriveWallets(mnemonic, count) {
  const wallets = [];
  for (let i = 0; i < count; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, path);
    wallets.push({
      index: i,
      address: wallet.address,
      privateKey: wallet.privateKey
    });
  }
  return wallets;
}

deriveWallets(mnemonic, 50).then(wallets => {
  const outputData = {
    entropy: entropyHex,
    mnemonic: mnemonic.replace(/,/g, ' '),
    wallets: wallets
  };

  console.log("Энтропия (материнский ключ):", outputData.entropy);
  console.log("Мнемоника:", outputData.mnemonic);
  outputData.wallets.forEach(wallet => {
    console.log(`Индекс: ${wallet.index}`);
    console.log(`Адрес: ${wallet.address}`);
    console.log(`Приватный ключ: ${wallet.privateKey}`);
    console.log('---------------------------');
  });

  // Сохранение в JSON-файл
  const jsonData = JSON.stringify(outputData, null, 2);
  fs.writeFileSync('wallets.json', jsonData, 'utf8');
  console.log('Данные кошельков сохранены в wallets.json');
});
