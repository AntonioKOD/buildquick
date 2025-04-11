import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuildQuick - Unlimited Web Development Subscription",
  description:
    "BuildQuick offers unlimited web development for a flat monthly fee. Get your MVP built in days, not months. Pause or cancel anytime.",
  keywords: "web development, subscription, MVP, startup, React, Next.js, unlimited development, BuildQuick",
  authors: [{ name: "BuildQuick Team" }],
  creator: "BuildQuick",
  publisher: "BuildQuick",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://buildquick.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildquick.io",
    title: "BuildQuick - Unlimited Web Development Subscription",
    description:
      "BuildQuick offers unlimited web development for a flat monthly fee. Get your MVP built in days, not months. Pause or cancel anytime.",
    siteName: "BuildQuick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BuildQuick - Unlimited Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildQuick - Unlimited Web Development Subscription",
    description:
      "BuildQuick offers unlimited web development for a flat monthly fee. Get your MVP built in days, not months. Pause or cancel anytime.",
    images: ["/twitter-image.png"],
    creator: "@buildquick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "BuildQuick",
  category: "technology",
}

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

        {children}
        <GoogleTagManager gtmId="G-Q6NC95DWJK" />
      </body>
    </html>
  );
}
