import React, { useState } from "react";
import { Button } from "../ui/button";
import useDataStore from "@/store/useDataStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useHandleWallet } from "@/hooks/useHandleWallet";

const AddMnemonics = () => {
  const [data, setData] = useState("");
  const { importWallet } = useHandleWallet();

  const saveData = () => {
    const words = data.trim().split(" ");
    if (!data || words.length !== 12) {
      toast.error("Please enter exactly 12 words separated by spaces");
      return;
    }
    importWallet(words.join(" "));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card p-8 rounded-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Secret Recovery Phrase
          </h1>
          <p className="text-muted-foreground">
            Enter your 12-word recovery phrase to import your wallet.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="word1 word2 word3 ..."
              className="relative w-full h-40 p-6 bg-black/20 border border-white/10 rounded-xl text-lg text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveData}
            className="w-full py-4 rounded-xl glass-button text-lg font-semibold tracking-wide cursor-pointer"
          >
            Import Wallet
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMnemonics;
