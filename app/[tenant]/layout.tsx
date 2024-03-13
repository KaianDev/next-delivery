"use client"

import { useLayoutEffect, useState } from "react"

interface TenantLayoutProps {
  children: React.ReactNode
}

const TenantLayout = ({ children }: TenantLayoutProps) => {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    const color = "35 100 49"
    document.body.style.setProperty("--tenant", color)
    setLoading(false)
  }, [])

  if (loading)
    return (
      <div className="flex h-screen w-full items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    )

  return <>{children}</>
}

export default TenantLayout
