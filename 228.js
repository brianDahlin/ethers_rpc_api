import { ethers } from "ethers";
import fs from "fs";

async function findAddressWithPrefix(prefix, maxIndexPerMnemonic = 20) {
  let addressesChecked = 0;
  let mnemonicsTried = 0;

  while (true) {
    mnemonicsTried++;

    const entropy = ethers.randomBytes(32);
    const entropyHex = ethers.hexlify(entropy);
    const mnemonic = ethers.Mnemonic.entropyToPhrase(entropy);

    // Берём "account"-узел: m/44'/60'/0'/0
    const accountNode = ethers.HDNodeWallet.fromPhrase(
      mnemonic,
      undefined,
      "m/44'/60'/0'/0"
    );

    for (let index = 0; index < maxIndexPerMnemonic; index++) {
      const wallet = accountNode.derivePath(index.toString());
      const derivationPath = `m/44'/60'/0'/0/${index}`;

      addressesChecked++;

      if (wallet.address.toLowerCase().startsWith(prefix.toLowerCase())) {
        console.log(
          `Адрес найден: ${wallet.address} (index: ${index}) после проверки ${addressesChecked} адресов и ${mnemonicsTried} мнемоник`
        );

        return {
          entropy: entropyHex,
          mnemonic: mnemonic.replace(/,/g, " "),
          wallets: [
            {
              index,
              derivationPath,
              address: wallet.address,
              privateKey: wallet.privateKey,
            },
          ],
          stats: {
            addressesChecked,
            mnemonicsTried,
          },
        };
      }

      if (addressesChecked % 1000 === 0) {
        console.log(`Проверено адресов: ${addressesChecked}`);
      }
    }

    // Если в пределах maxIndexPerMnemonic не нашли — генерируем новую мнемонику и продолжаем цикл
  }
}

const desiredPrefix = "0x777";

findAddressWithPrefix(desiredPrefix, 50).then((result) => {
  const fileName = "wallet_with_desired_prefix.json";
  const { wallets } = result;

  console.log("Найденный адрес:", wallets[0].address);
  console.log("Индекс в деривации:", wallets[0].index);
  console.log("Путь:", wallets[0].derivationPath);

  let existing = [];

  if (fs.existsSync(fileName)) {
    try {
      const raw = fs.readFileSync(fileName, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) existing = [];
    } catch (e) {
      console.error("Ошибка парсинга JSON, файл будет перезаписан.", e);
      existing = [];
    }
  }

  existing.push(result);

  fs.writeFileSync(fileName, JSON.stringify(existing, null, 2), "utf8");

  console.log("Новая запись добавлена в", fileName);
});
