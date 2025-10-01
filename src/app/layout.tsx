import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const clashFonts = localFont({
  variable: '--font-geist-supercell',
  src: '/fonts/supercell.otf'
})

const clashFontsBold = localFont({
  variable: '--font-geist-supercell-bold',
  src: '/fonts/supercell_Bold.otf'
})

export const metadata: Metadata = {
  title: "Starlord.dev",
  description: "My Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashFonts.variable} ${clashFontsBold.variable} antialiased`}
      >
        {/* <Header/> */}
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
