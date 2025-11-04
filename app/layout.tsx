import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthContextWrapper from "./contexts/AuthContextWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className="bg-black text-white"
      >
        <AuthContextWrapper>{children}</AuthContextWrapper>
      </body>
    </html>
  );
}