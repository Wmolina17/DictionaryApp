"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <html lang="es">
        <body className="max-w-[90%] md:max-w-[80%] lg:max-w-[60%] m-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-5">
          <NavBar></NavBar>
          <main className="mx-auto w-full p-4 mt-3 space-y-4">{children}</main>
        </body>
      </html>
    </Provider>
  );
}
