import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
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
      <body className={`${geistSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}