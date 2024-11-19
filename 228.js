import { ethers } from "ethers";
import fs from 'fs';

async function findAddressWithPrefix(prefix) {
  let found = false;
  let attempts = 0;
  let wallet = null;
  let entropyHex = '';
  let mnemonic = '';

  while (!found) {
    attempts++;

    const entropy = ethers.randomBytes(32); 
    entropyHex = ethers.hexlify(entropy);
    mnemonic = ethers.Mnemonic.entropyToPhrase(entropy);

    // Генерируем кошелек из мнемоники
    const path = `m/44'/60'/0'/0/0`;
    wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, path);

    // Проверяем, начинается ли адрес на требуемый префикс
    if (wallet.address.toLowerCase().startsWith(prefix.toLowerCase())) {
      found = true;
    }

    // Выводим количество попыток каждые 1000 итераций
    if (attempts % 1000 === 0) {
      console.log(`Попыток: ${attempts}`);
    }
  }

  console.log(`Адрес найден после ${attempts} попыток`);
  return {
    entropy: entropyHex,
    mnemonic: mnemonic.replace(/,/g, ' '),
    wallets: [{
      index: 0,
      address: wallet.address,
      privateKey: wallet.privateKey
    }]
  };
}

const desiredPrefix = '0x228';

findAddressWithPrefix(desiredPrefix).then(result => {
  const { entropy, mnemonic, wallets } = result;

  // Выводим информацию
  console.log("Энтропия (материнский ключ):", entropy);
  console.log("Мнемоника:", mnemonic);
  console.log(`Адрес: ${wallets[0].address}`);
  console.log(`Приватный ключ: ${wallets[0].privateKey}`);

  // Сохранение в JSON-файл
  const jsonData = JSON.stringify(result, null, 2);
  fs.writeFileSync('wallet_with_desired_prefix.json', jsonData, 'utf8');
  console.log('Данные кошелька сохранены в wallet_with_desired_prefix.json');
});
