import "./globals.css"

import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { Providers } from "@/providers"

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
          "min-h-dvh bg-zinc-100 font-sans antialiased",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
