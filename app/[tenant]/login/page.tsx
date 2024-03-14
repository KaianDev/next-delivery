import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Header } from "@/components/header"
import { frontEndAPI } from "@/lib/frontend-api"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface LoginPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: LoginPageProps): Metadata => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)
  return {
    title: tenant ? `Login | ${tenant.name}` : "Página não encontrada",
  }
}

const LoginPage = ({ params }: LoginPageProps) => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)
  if (!tenant) return notFound()

  return (
    <div className="container space-y-4 bg-white pt-12">
      <Header backHref={`/${tenant.slug}`} />
      <CustomInput placeholder="Digite seu e-mail" color={tenant.color} />
      <CustomInput placeholder="Digite sua senha" type="password" />
      <CustomButton mainColor={tenant.color}>AA</CustomButton>
      <CustomButton inverter>BB</CustomButton>
    </div>
  )
}

export default LoginPage
