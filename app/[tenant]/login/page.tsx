import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

// Components
import { Line } from "@/components/line"
import { LoginForm } from "./_components/login-form"
import { CustomButton } from "@/components/custom-button"
import { Header } from "@/components/header"
import { TenantTitle } from "../_components/tenant-title"
import { Description } from "../_components/tenant-label"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

interface LoginPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: LoginPageProps): Metadata => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()
  return {
    title: tenant ? `Login | ${tenant.name}` : "Página não encontrada",
  }
}

const LoginPage = ({ params }: LoginPageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()
  if (!tenant) return notFound()

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}`} />

      <TenantTitle tenantName={tenant.name} />

      <Description>
        Use suas credenciais para <br /> realizar o login.
      </Description>

      <Line className="mb-14" />

      <LoginForm tenantSlug={tenant.slug} />

      <div className="relative mx-auto mt-10 w-fit border-b border-tenant-primary pb-10">
        Esqueceu sua senha?{" "}
        <Link
          href={`/${tenant.slug}/forget`}
          className="text-tenant-primary hover:underline"
        >
          Clique aqui
        </Link>
      </div>

      <Line className="mb-14" />

      <Link href={`/${tenant.slug}/sign-up`}>
        <CustomButton hollow>Quero me cadastrar</CustomButton>
      </Link>
    </div>
  )
}

export default LoginPage
