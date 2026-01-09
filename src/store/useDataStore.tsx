import type { storeType } from "@/types";
import { create } from "zustand";

const useDataStore = create<storeType>((set, get) => ({
  blockchain: { val: "", isDone: false },
  Mnemonics: {
    val: "carpet cat flower chair foot river make image amazing three say shoe",
    isDone: false,
  },
  seed: "",
  wallets: [],

  setValues: (data) => {
    const prev = get();
    console.log(prev);
    set({ ...prev, ...data });
  },
}));

export default useDataStore;
