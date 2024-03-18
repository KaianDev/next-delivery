import { Metadata } from "next"
import { notFound } from "next/navigation"

// Components
import { Header } from "@/components/header"
import { TenantTitle } from "../_components/tenant-title"
import { Description } from "../_components/tenant-label"
import { ForgetForm } from "./_components/forget-form"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"
import { Line } from "@/components/line"

interface ForgetPageProps {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({ params }: ForgetPageProps): Metadata => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)
  return {
    title: tenant ? `Esqueceu senha | ${tenant.name}` : "Página não encontrada",
  }
}

const ForgetPage = ({ params }: ForgetPageProps) => {
  const api = frontEndAPI()
  const tenant = api.getTenant(params.tenant)
  if (!tenant) {
    return notFound()
  }

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}/login`} />

      <TenantTitle tenantName={tenant.name} />
      <div className="mb-7 text-center text-2xl font-semibold">
        Esqueceu sua senha?
      </div>
      <Description>
        Preencha o campo com seu e-mail <br />
        e receba as instruções necessárias <br />
        para redefinir a sua senha.
      </Description>

      <Line className="mb-14" />
      <ForgetForm />
    </div>
  )
}

export default ForgetPage
