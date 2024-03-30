import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { getCookie } from "cookies-next"

// Components
import { Cart } from "./_components/cart"
import { Header } from "@/components/header"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

interface CartPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = async ({
  params,
}: CartPageProps): Promise<Metadata> => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()

  return {
    title: tenant ? `Sacola | ${tenant.name}` : "Página não encontrada",
  }
}

const CartPage = async ({ params }: CartPageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()
  if (!tenant) {
    return notFound()
  }

  const cartCookie = getCookie(`${tenant.slug}.cart`, { cookies })
  console.log({ cartCookie })
  const cart = await api.getCartProducts(cartCookie as string)
  const token = getCookie("delivery.token", { cookies })
  const user = await api.authorizeToken(token as string)

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}`} title="Sacola" />

      <Cart
        cart={cart}
        tenantSlug={tenant.slug}
        user={user ? user : null}
        token={token ?? ""}
      />
    </div>
  )
}

export default CartPage
