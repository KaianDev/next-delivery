"use client"

import { AuthContextProvider } from "@/contexts/auth"

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
