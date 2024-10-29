import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const love = localFont({
  src: "./fonts/LoveRegular.ttf",
  variable: "--love",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Love Journey",
  description:
    "Crie e compartilhe a linha do tempo da sua história de amor. Perfeito para casais que desejam celebrar momentos especiais juntos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body
        className={`${geistSans.variable} ${love.variable} ${love.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
