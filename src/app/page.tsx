"use client";

import WalletDetails from "@/components/WalletDetails";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useDataStore from "@/store/useDataStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Download } from "lucide-react";

const Home = () => {
  const router = useRouter();
  const localData = useLocalStorage();
  const walletAvailable = useDataStore((state) => state.wallets).length > 0;
  const setValues = useDataStore((state) => state.setValues);

  useEffect(() => {
    const savedData = localData.get("save-it");

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setValues(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  if (!walletAvailable) {
    return (
      <div className="flex flex-col items-center justify-center space-y-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent">
            VAULT
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            The next generation of secure, multi-chain web3 wallets.
            <br />
            <span className="text-primary/80">Simple. Secure. Beautiful.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/new-wallet")}
            className="group relative px-8 py-6 rounded-2xl glass-card hover:bg-primary/20 transition-all duration-300 flex items-center gap-4 min-w-[240px] justify-center overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Plus className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-white">
              Create New Wallet
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/import-wallet")}
            className="group relative px-8 py-6 rounded-2xl glass-card hover:bg-white/10 transition-all duration-300 flex items-center gap-4 min-w-[240px] justify-center cursor-pointer"
          >
            <Download className="w-6 h-6 text-white/70 group-hover:text-white" />
            <span className="text-lg font-semibold text-white/70 group-hover:text-white">
              Import Wallet
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return <WalletDetails />;
};

export default Home;
