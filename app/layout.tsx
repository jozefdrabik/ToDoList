import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { Metadata } from "next";
import LayoutQueryClient from "@/components/LayoutQueryClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ToDo List App",
  description: "App to manage your tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutQueryClient>{children}</LayoutQueryClient>
      </body>
    </html>
  );
}
