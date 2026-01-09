import { Loader2Icon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader2Icon className="animate-spin text-primary" />
    </div>
  );
};

export default Loader;
