import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Copy, Eye, EyeOff, Trash, Plus, Wallet } from "lucide-react";
import { Toggle } from "./ui/toggle";
import useDataStore from "@/store/useDataStore";
import { cn } from "@/lib";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AlertDialog from "./AlertDialog";
import { useHandleWallet } from "@/hooks/useHandleWallet";

const PrivateKeyDetails = ({ privateKey }: { privateKey: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyPrivateKey = useCopyToClipboard();

  return (
    <div className="flex gap-2">
      <div className="w-full relative">
        <Input
          type={!showPassword ? "password" : "text"}
          className={cn(
            "w-full pr-10 glass-input text-white/90",
            showPassword && "text-ellipsis"
          )}
          value={privateKey}
          disabled
        />
        <Button
          variant="ghost"
          className="cursor-pointer absolute right-0 top-0 h-full hover:bg-white/10 text-white/70 hover:text-white"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </Button>
      </div>
      <Toggle
        variant="outline"
        className="cursor-pointer border-white/10 hover:bg-white/10 data-[state=on]:bg-primary/20 data-[state=on]:text-primary"
        pressed={copied}
        onPressedChange={() => {
          copyPrivateKey(privateKey, "Private key copied successfully.");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <Copy className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

const WalletDetails = () => {
  const blockchainVal = useDataStore((state) => state.blockchain.val);
  const wallets = useDataStore((state) => state.wallets);
  const setValues = useDataStore((state) => state.setValues);
  const { set, get } = useLocalStorage();

  const { createWallet } = useHandleWallet();

  const handleClearWallets = () => {
    setValues({
      blockchain: { val: "", isDone: false },
      Mnemonics: { val: "", isDone: false },
      seed: "",
      wallets: [],
    });
    set("save-it", "");
  };

  const handleDeleteWallet = (publicKey: string) => {
    if (wallets.length === 1) {
      handleClearWallets();
      return;
    }
    const updates = wallets.filter((wallet) => wallet.publicKey !== publicKey);
    setValues({
      wallets: updates,
    });
    const savedData = get("save-it") || "";
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      set("save-it", JSON.stringify({ ...parsedData, wallets: updates }));
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 glass-card rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {blockchainVal} Wallets
            </h1>
            <p className="text-white/50">Manage your secure accounts</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="glass-button gap-2" onClick={() => createWallet()}>
            <Plus className="w-4 h-4" /> Add Wallet
          </Button>
          <AlertDialog action={handleClearWallets} actionLabel="Clear Wallets">
            <Button
              variant="destructive"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/20"
            >
              Clear Wallets
            </Button>
          </AlertDialog>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map(({ publicKey, privateKey }, index) => (
          <motion.div
            key={publicKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-6 group hover:border-primary/30 transition-colors duration-300"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-xl font-semibold text-white/90">
                Wallet {index + 1}
              </h2>
              <AlertDialog
                action={() => handleDeleteWallet(publicKey)}
                actionLabel="Delete wallet"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/50 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </AlertDialog>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-primary/80">
                  Public Key
                </h3>
                <p className="text-sm text-white/70 break-all font-mono bg-black/20 p-3 rounded-lg border border-white/5">
                  {publicKey}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-primary/80">
                  Private Key
                </h3>
                <PrivateKeyDetails privateKey={privateKey} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WalletDetails;
