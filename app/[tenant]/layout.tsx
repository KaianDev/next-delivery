"use client"

import { useApi } from "@/lib/api"
import { useLayoutEffect, useState } from "react"

interface TenantLayoutProps {
  children: React.ReactNode
  params: {
    tenant: string
  }
}

const TenantLayout = ({ children, params }: TenantLayoutProps) => {
  const [loading, setLoading] = useState(true)
  const api = useApi()

  const setTenantColor = () => {
    const tenant = api.getTenant(params.tenant)
    if (tenant) {
      document.body.style.setProperty("--tenant", tenant.color)
      document.body.style.setProperty(
        "--tenant-opacity",
        `${tenant.color} / 30%`,
      )
    }
    setLoading(false)
  }

  useLayoutEffect(() => {
    setTenantColor()
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
