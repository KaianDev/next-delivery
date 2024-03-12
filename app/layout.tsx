import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

import "./globals.css"

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Next Delivery",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-Br">
      <body
        className={cn(
          fontSans.className,
          "bg-background min-h-screen font-sans antialiased",
        )}
      >
        {children}
      </body>
    </html>
  )
}
