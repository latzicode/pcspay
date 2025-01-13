import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import SettingsMenu from "@/components/ui/SettingsMenu";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "MY DIASPO - La solution de paiement pour l'Afrique",
  description: "MY DIASPO - Payez facilement vos services en Afrique avec la solution de paiement la plus innovante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <style>
          {`
            ::selection {
              background-color: rgba(212, 183, 143, 0.3);
              color: #1A1814;
            }
            
            body {
              overflow-x: hidden;
            }
          `}
        </style>
      </head>
      <body className="font-sans text-primary bg-background antialiased relative min-h-screen selection:bg-primary-light/30 selection:text-text">
        <ThemeProvider>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 relative z-0">
              {children}
            </main>
            <SettingsMenu />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
