import { derivationPaths } from "@/lib";
import useDataStore from "@/store/useDataStore";
import { motion } from "framer-motion";

const SelectBlockchain = ({ description }: { description?: string }) => {
  const setValues = useDataStore((state) => state.setValues);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Multi-Chain Wallet
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {description ||
            "Select a blockchain to get started with your secure web3 journey."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4"
      >
        {Object.keys(derivationPaths).map((crypto, index) => (
          <motion.button
            key={crypto}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index + 0.4 }}
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setValues({
                blockchain: { val: crypto, isDone: true },
              })
            }
            className="group relative flex flex-col items-center justify-center p-8 h-48 rounded-3xl glass-card hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-primary/30 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <img
              src={`/${crypto}.svg`}
              alt={crypto}
              className="w-[60%] h-[60%] object-contain brightness-0 invert"
            />
            <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-sm text-primary font-medium">{crypto}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SelectBlockchain;
