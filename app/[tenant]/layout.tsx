import { frontEndAPI } from "@/lib/frontend-api"

interface TenantLayoutProps {
  children: React.ReactNode
  params: {
    tenant: string
  }
}

const TenantLayout = async ({ children, params }: TenantLayoutProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()

  return (
    <body
      style={
        {
          "--tenant-primary": tenant ? tenant.primary : "#222",
          "--tenant-secondary": tenant ? tenant.secondary : "#ccc",
        } as React.CSSProperties
      }
    >
      {children}
    </body>
  )
}

export default TenantLayout
