"use client";

import { queryClient } from "@/util/http";
import Link from "next/link";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ILayoutQueryChildren } from "@/components/LayoutQueryClient/prop";

export default function LayoutQueryClient({
  children,
}: ILayoutQueryChildren): React.ReactElement {
  return (
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
  );
}
