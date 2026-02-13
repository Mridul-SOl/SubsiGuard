import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { OfficialHeader } from "@/components/official-header";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubsiGuard | National Subsidy Leakage Detection Portal",
  description: "Official government portal for detecting and preventing subsidy leakage in PDS, PM-KISAN, and MGNREGA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gov-bg min-h-screen flex flex-col`}>
        <Providers>
          <LanguageProvider>
            <OfficialHeader />
            <main className="flex-1 w-full">
              {children}
            </main>
            <footer className="bg-gov-navy text-white text-center py-4 text-sm mt-auto">
              <p>&copy; {new Date().getFullYear()} SubsiGuard. All Rights Reserved. Government of India.</p>
            </footer>
            <Toaster richColors position="top-right" />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
