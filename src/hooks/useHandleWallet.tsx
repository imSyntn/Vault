import useDataStore from "@/store/useDataStore";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { derivationPaths } from "@/lib";
import bs58 from "bs58";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const useHandleWallet = () => {
  const { set } = useLocalStorage();
  const setValues = useDataStore((state) => state.setValues);
  const { Mnemonics, blockchain, seed, wallets } = useDataStore();

  const createMnemonics = () => {
    const mnemonics = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonics).toString("hex");
    setValues({ Mnemonics: { val: mnemonics, isDone: false }, seed });
    return mnemonics;
  };

  const createWallet = (newSeed: string = "", redirection: boolean = false) => {
    const path = derivationPaths[blockchain.val].replace(
      "x",
      wallets.length.toString()
    );
    const derivedSeed = derivePath(path, newSeed || seed).key;
    const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(privateKey).publicKey.toBase58();

    const redirect = redirection
      ? { Mnemonics: { ...Mnemonics, isDone: true } }
      : {};

    setValues({
      wallets: [...wallets, { privateKey: bs58.encode(privateKey), publicKey }],
      ...redirect,
    });
    set(
      "save-it",
      JSON.stringify({
        blockchain,
        Mnemonics,
        wallets: [
          ...wallets,
          { privateKey: bs58.encode(privateKey), publicKey },
        ],
      })
    );
  };

  const importWallet = (mnemonics: string) => {
    const newSeed = mnemonicToSeedSync(mnemonics).toString("hex");
    setValues({ Mnemonics: { val: mnemonics, isDone: true }, seed: newSeed });
    createWallet(newSeed, true);
  };

  return {
    createMnemonics,
    createWallet,
    importWallet,
  };
};
