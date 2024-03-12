import "./globals.css"

import type { Metadata } from "next"
import { Poppins as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Next Delivery",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          "min-h-dvh bg-background font-sans antialiased",
        )}
      >
        {children}
      </body>
    </html>
  )
}
