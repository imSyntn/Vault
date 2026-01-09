import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
// import useDataStore from "@/store/useDataStore";s

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const generateRecoveryPhases = () => {
//   // const setValues = useDataStore((state) => state.setValues);
//   const mnemonic = generateMnemonic();
//   console.log("mnemonic", mnemonic);
//   // setValues({ Mnemonics: { val: mnemonic, isDone: true } });
//   const seed = mnemonicToSeedSync(mnemonic);
//   console.log("seed", seed);
//   console.log(seed.toString("utf-8"));

//   // console.log(new TextDecoder().decode(seed));
// };
