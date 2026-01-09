interface valType {
  val: string;
  isDone: boolean;
}
interface walletType {
  publicKey: string;
  privateKey: string;
}

export interface storeType {
  blockchain: valType;
  Mnemonics: valType;
  seed: string;
  wallets: walletType[];

  setValues: (data: Partial<storeType>) => void;
}
