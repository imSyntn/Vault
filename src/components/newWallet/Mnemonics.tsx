import { toast } from "sonner";
import { Button } from "../ui/button";
import { ArrowBigRight, Copy } from "lucide-react";
import useDataStore from "@/store/useDataStore";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useHandleWallet } from "@/hooks/useHandleWallet";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { Toggle } from "../ui/toggle";

const Mnemonics = () => {
  const mnemonics = useDataStore((state) => state.Mnemonics);
  const { createMnemonics, createWallet } = useHandleWallet();

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCopyToClipboard();

  const handleWaletCreation = () => {
    createWallet("", true);
  };

  useEffect(() => {
    const data = createMnemonics();
    if (data.length > 0) {
      setLoading(false);
    } else {
      toast.error("Something went wrong");
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
          Secret Recovery Phrase
        </h1>
        <p className="text-muted-foreground text-lg">
          Save these words in a safe place. You'll need them to recover your
          wallet.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full mb-10">
            {mnemonics.val.split(" ").map((word: string, index: number) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-center select-none"
              >
                <span className="absolute top-2 left-3 text-xs text-muted-foreground/50 font-mono">
                  {index + 1}
                </span>
                <span className="font-mono text-lg tracking-wide text-white/90">
                  {word}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Toggle
              variant="outline"
              className="cursor-pointer flex-1 min-h-12 text-base border-white/10 hover:bg-white/5 hover:text-white transition-all data-[state=on]:[&_svg]:fill-primary"
              pressed={copied}
              onPressedChange={() => {
                setCopied(true);
                copyToClipboard(mnemonics.val);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied" : "Copy Phrase"}
            </Toggle>
            <Button
              className="flex-1 h-12 text-base bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              onClick={handleWaletCreation}
            >
              Next Step
              <ArrowBigRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mnemonics;
