import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Balão Mágico | Festas & Diversão",
    template: "%s | Balão Mágico",
  },
  description:
    "Aluguel de brinquedos e serviços para festas infantis. Leve diversão, segurança e momentos mágicos para sua festa.",
  keywords: [
    "aluguel de brinquedos",
    "festas infantis",
    "brinquedos para festas",
    "cama elástica",
    "piscina de bolinhas",
    "brinquedos infláveis",
    "Balão Mágico",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#FFF8E9] font-sans text-[#0B356B]">
        {children}
      </body>
    </html>
  );
}