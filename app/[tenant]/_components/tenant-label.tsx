interface TenantLabelProps {
  children: React.ReactNode
}

export const TenantLabel = ({ children }: TenantLabelProps) => {
  return (
    <div className="relative mx-auto w-fit border-b border-tenant-primary pb-10 text-center text-lg leading-6">
      {children}
    </div>
  )
}
