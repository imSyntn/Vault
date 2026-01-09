import type { Metadata } from "next";
import "../index.css";
import Header from "../components/Header";
import { Toaster } from "../components/ui/sonner";

import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: "Vault",
  description: "A simple web3 wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-col justify-center items-center min-h-screen pt-20 pb-10 px-4 relative z-10">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
