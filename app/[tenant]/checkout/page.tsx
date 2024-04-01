import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getCookie } from "cookies-next"

// Components
import { Checkout } from "./_components/checkout"
import { Header } from "@/components/header"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

interface CheckoutPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = async ({
  params,
}: CheckoutPageProps): Promise<Metadata> => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()

  return {
    title: tenant ? `Checkout | ${tenant.name}` : "Página não encontrada",
  }
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()
  if (!tenant) {
    return notFound()
  }

  const cartCookie = getCookie(`${tenant.slug}.cart`, { cookies })
  const cart = await api.getCartProducts(cartCookie as string)
  const token = getCookie("delivery.token", { cookies })
  const user = await api.authorizeToken(token as string)

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}/cart`} title="Checkout" />

      <Checkout
        cart={cart}
        tenantSlug={tenant.slug}
        user={user ? user : null}
        token={token ?? ""}
      />
    </div>
  )
}

export default CheckoutPage
