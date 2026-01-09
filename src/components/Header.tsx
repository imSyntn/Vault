"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 backdrop-blur-md bg-background/50 border-b border-white/5"
    >
      <Link href="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <span className="text-2xl font-bold tracking-widest bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          VAULT
        </span>
      </Link>
    </motion.header>
  );
};

export default Header;
