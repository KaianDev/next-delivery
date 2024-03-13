import { useApi } from "@/lib/use-api"

interface TenantLayoutProps {
  children: React.ReactNode
  params: {
    tenant: string
  }
}

const TenantLayout = async ({ children, params }: TenantLayoutProps) => {
  const api = useApi()
  const tenant = api.getTenant(params.tenant)

  return (
    <body
      style={
        {
          "--tenant": tenant ? tenant.color : "0 0% 100%",
          "--tenant-opacity": tenant ? `${tenant.color}/30%` : "0 5% 16%/50%",
        } as React.CSSProperties
      }
    >
      {children}
    </body>
  )
}

export default TenantLayout
