import {
  ClerkProvider
} from "@clerk/nextjs";
import {Inter} from "next/font/google";
import "../globals.css";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"]})  


export const metadata: Metadata = {
  title: "gadjt",
  description: "The official store for Gadjt",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}