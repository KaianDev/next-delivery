import type { Metadata } from "next"
import { notFound } from "next/navigation"

// Components
import { Banner } from "./_components/banner"
import { Header } from "./_components/header"
import { ProductGrid } from "./_components/product-grid"

// Utilities
import { useApi } from "@/lib/use-api"

interface HomePageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: HomePageProps): Metadata => {
  const api = useApi()
  const tenant = api.getTenant(params.tenant)
  return {
    title: tenant ? `Next Delivery | ${tenant.name}` : "Página não encontrada",
  }
}

const HomePage = async ({ params }: HomePageProps) => {
  const api = useApi()
  const tenant = api.getTenant(params.tenant)
  if (!tenant) return notFound()

  return (
    <>
      <Header />
      <Banner />
      <ProductGrid tenantSlug={tenant.slug} />
    </>
  )
}

export default HomePage
