import { toast } from "sonner";

export const useCopyToClipboard = () => {
  return (data: string, msg?: string) => {
    if (!data) {
      toast.warning("No values to copy.");
      return;
    }
    navigator.clipboard
      .writeText(data)
      .then(() => {
        toast.success(msg || "Copied successfully.");
      })
      .catch((e) => {
        toast.error("An error occured.");
        console.log(e.message)
      });
  };
};
