import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SubsiGuard - Subsidy Fraud Detection",
  description: "AI-powered dashboard for detecting leakage and fraud in Indian government subsidy programs (PDS, PM-KISAN, LPG, MGNREGA)",
  keywords: ["subsidy", "fraud detection", "India", "PDS", "PM-KISAN", "MGNREGA", "government schemes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-navy text-foreground antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-right" theme="dark" richColors />
        </Providers>
      </body>
    </html>
  );
}
