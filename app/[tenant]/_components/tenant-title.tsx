interface TenantTitleProps {
  tenantName: string
}

export const TenantTitle = ({ tenantName }: TenantTitleProps) => {
  return (
    <div className="mb-10 mt-5 text-center text-4xl font-bold text-zinc-900">
      {tenantName}
    </div>
  )
}
