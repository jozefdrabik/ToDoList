"use client";

import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/util/http";
import Link from "next/link";

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
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 py-6 px-4">
            <header className="text-center pb-10 pt-6">
              <Link href="/">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
                  📝 ToDo List App
                </h1>
                <p className="text-xl text-gray-200 mt-2">
                  Stay organized, one task at a time!
                </p>
              </Link>
            </header>
            <main className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
              {children}
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
