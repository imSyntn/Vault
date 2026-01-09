"use client";

import AddMnemonics from "@/components/importWallet/AddMnemonics";
import SelectBlockchain from "@/components/newWallet/SelectBlockchain";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ImportWallet = () => {
  const router = useRouter();
  const isBlockchainDone = useDataStore((state) => state.blockchain.isDone);
  const isMnemonicsDone = useDataStore((state) => state.Mnemonics.isDone);

  useEffect(() => {
    if (isBlockchainDone && isMnemonicsDone) {
      router.push("/");
    }
  }, [isBlockchainDone, isMnemonicsDone, router]);

  if (!isBlockchainDone) {
    return (
      <SelectBlockchain description="Select a blockchain to import your wallet." />
    );
  }

  if (!isMnemonicsDone) {
    return <AddMnemonics />;
  }

  return null;
};

export default ImportWallet;
