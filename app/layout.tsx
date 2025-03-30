import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AirBrief - Aviation & Travel Companion",
  description: "Discover fascinating facts about famous airplanes and paradise travel destinations",
  keywords: "aviation, airplanes, travel destinations, aircraft facts, travel guide",
  openGraph: {
    title: "AirBrief - Aviation & Travel Companion",
    description: "Discover fascinating facts about famous airplanes and paradise travel destinations",
    url: "https://airbrief.vercel.app",
    siteName: "AirBrief",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AirBrief - Aviation & Travel Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirBrief - Aviation & Travel Companion",
    description: "Discover fascinating facts about famous airplanes and paradise travel destinations",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="flex-1 pb-16">{children}</main>
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'