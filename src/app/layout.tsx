import type { Metadata } from "next";
import { Inter, Space_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import NavLayout from "@layouts/l-nav-layout";
import URQLProvider from "@/components/providers/urql";
import JotaiProvider from "@/components/providers/jotai";
import UseWalletProvider from "@/components/providers/use-wallet";
import { Toaster } from "@ui/toaster";
import { ContractClientsProvider } from "@/components/providers/contract";
import LoadingProvider from "@/components/providers/page-loading-bar";

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zaibatsu",
  description: "A decentralized crypto lending platform...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <LoadingProvider>
        <UseWalletProvider>
          <ContractClientsProvider>
            <JotaiProvider>
              <URQLProvider>
                <body
                  className={`${mono.variable} ${inter.variable} ${sans.variable} font-mono h-screen overflow-y-hidden`}
                >
                  <NavLayout>{children}</NavLayout>
                  <Toaster />
                </body>
              </URQLProvider>
            </JotaiProvider>
          </ContractClientsProvider>
        </UseWalletProvider>
      </LoadingProvider>
    </html>
  );
}
