import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LiffeyCare Hospital Appointments",
  description: "Modern appointment booking for LiffeyCare Hospital in Dublin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} min-h-screen bg-slate-950 text-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
