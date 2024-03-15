import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

// Components
import { Header } from "@/components/header"
import { Line } from "@/components/line"
import { SignInForm } from "./_components/sign-in-form"
import { TenantTitle } from "../_components/tenant-title"
import { TenantLabel } from "../_components/tenant-label"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

interface SignUpPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: SignUpPageProps): Metadata => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)

  return {
    title: tenant ? `Cadastre-se | ${tenant.name}` : "Página não encontrada",
  }
}

const SignUpPage = ({ params }: SignUpPageProps) => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)

  if (!tenant) return notFound()

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}/login`} />

      <TenantTitle tenantName={tenant.name} />

      <TenantLabel>
        Preencha os campos <br />
        para criar o seu cadastro.
      </TenantLabel>

      <Line className="mb-14" />
      <SignInForm />
      <div className="mt-14 text-center">
        Já tem cadastro?{" "}
        <Link
          href={`/${tenant.slug}/login`}
          className="text-tenant-primary hover:underline"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage
