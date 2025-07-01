import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeriLoc — Global Address Validator",
  description:
    "VeriLoc helps you verify and standardize addresses worldwide with real-time validation, geocoding, and deliverability checks.",
  keywords: [
    "address verification",
    "global address validator",
    "geocoding",
    "Melissa API",
    "Google Maps",
    "address normalization",
    "VeriLoc",
  ],
  authors: [{ name: "Amruth L P", url: "https://github.com/AmruthLP12" }],
  creator: "Amruth L P",
  openGraph: {
    title: "VeriLoc — Global Address Validator",
    description:
      "Standardize and verify global addresses using real-time APIs with geolocation support.",
    url: "https://veriloc.app", // replace if custom domain
    siteName: "VeriLoc",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://veriloc.app"), // replace if not hosted yet
  themeColor: "#6D28D9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="VeriLoc" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
