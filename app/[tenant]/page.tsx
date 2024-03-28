import type { Metadata } from "next"
import { notFound } from "next/navigation"

// Components
import { Banner } from "./_components/banner"
import { Header } from "./_components/header"
import { ProductGrid } from "./_components/product-grid"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"
import { cookies } from "next/headers"
import { Home } from "./_components/home"

interface HomePageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: HomePageProps): Metadata => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()
  return {
    title: tenant ? tenant.name : "Página não encontrada",
  }
}

const HomePage = async ({ params }: HomePageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()
  if (!tenant) return notFound()
  const products = api.getAllProducts()
  const token = cookies().get("delivery.token")?.value
  const user = await api.authorizeToken(token as string)

  return (
    <Home
      tenantSlug={tenant.slug}
      products={products}
      user={user ? user : null}
      token={token ?? ""}
    />
  )
}

export default HomePage
