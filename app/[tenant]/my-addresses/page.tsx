import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { getCookie } from "cookies-next"

// Components
import { Header } from "@/components/header"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"
import { CustomButton } from "@/components/custom-button"
import { AddressList } from "./_components/address-list"
import Link from "next/link"

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
    title: tenant ? `Meus endereços | ${tenant.name}` : "Página não encontrada",
  }
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()
  if (!tenant) {
    return notFound()
  }

  const token = getCookie("delivery.token", { cookies })
  const user = await api.authorizeToken(token as string)
  console.log({ user })
  if (!user) {
    redirect(`/${tenant.slug}/login`)
  }

  const addresses = await api.getUserAddresses(user.email)
  console.log({ addresses })

  return (
    <div className="container flex min-h-dvh max-w-lg flex-col bg-white py-12">
      <Header backHref={`/${tenant.slug}/checkout`} title="Meus endereços" />
      {addresses.length > 0 ? (
        <AddressList addresses={addresses} tenantSlug={tenant.slug} />
      ) : (
        <div className="flex flex-1 items-center justify-center text-center">
          Você ainda não possui <br /> endereços cadastrados
        </div>
      )}

      <Link href={`/${tenant.slug}/new-address`}>
        <CustomButton className="mt-4">Novo Endereço</CustomButton>
      </Link>
    </div>
  )
}

export default CheckoutPage
