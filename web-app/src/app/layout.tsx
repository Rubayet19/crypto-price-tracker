import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CryptoProvider } from "@/context/CryptoContext";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Price Tracker",
  description: "Track live cryptocurrency prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <CryptoProvider>
          <Layout>
            {children}
          </Layout>
        </CryptoProvider>
      </body>
    </html>
  );
}
