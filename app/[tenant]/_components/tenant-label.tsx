interface DescriptionProps {
  children: React.ReactNode
}

export const Description = ({ children }: DescriptionProps) => {
  return (
    <div className="relative mx-auto w-fit border-b border-tenant-primary pb-10 text-center text-lg leading-6">
      {children}
    </div>
  )
}
