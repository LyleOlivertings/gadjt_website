import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Gadjt Store page",
  description:
    "Gadjt Store is a fantastic place to buy handmade and custom-made items.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <ClerkProvider>
        <Navbar />
          {children}
        
        </ClerkProvider>
      </body>
    </html>
  );
}
