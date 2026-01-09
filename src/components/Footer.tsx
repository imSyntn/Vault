"use client";

import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-4 backdrop-blur-md bg-background/50 border-t border-white/5">
      <a
        href="https://github.com/imSyntn/Vault"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
      >
        <Github className="w-5 h-5" />
        <span className="text-sm font-medium">Built by imSyntn</span>
      </a>
    </footer>
  );
};

export default Footer;
