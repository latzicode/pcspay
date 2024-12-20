import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Image from 'next/image';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCSPAY - La solution de paiement pour l'Afrique",
  description: "PCSPAY - Payez facilement vos services en Afrique avec la solution de paiement la plus innovante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-background text-text antialiased relative`}>
        <div className="fixed inset-0 -z-10">
          <Image
            src="/patterns/pattern1.png"
            alt="PCSPAY Background Pattern"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
