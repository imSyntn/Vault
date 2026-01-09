"use client";

import SelectBlockchain from "@/components/newWallet/SelectBlockchain";
import Mnemonics from "@/components/newWallet/Mnemonics";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NewWalletSetup = () => {
  const router = useRouter();
  const isBlockchainDone = useDataStore((state) => state.blockchain.isDone);
  const isMnemonicsDone = useDataStore((state) => state.Mnemonics.isDone);

  useEffect(() => {
    if (isBlockchainDone && isMnemonicsDone) {
      router.push("/");
    }
  }, [isBlockchainDone, isMnemonicsDone, router]);

  if (!isBlockchainDone) {
    return <SelectBlockchain />;
  }

  if (!isMnemonicsDone) {
    return <Mnemonics />;
  }

  return null;
};

export default NewWalletSetup;
