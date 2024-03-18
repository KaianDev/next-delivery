import { LucideSend } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

// Components
import { Header } from "@/components/header"
import { CustomButton } from "@/components/custom-button"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

interface ForgetSuccessPagePros {
  params: {
    tenant: string
  }
}

export const generateMetadata = ({
  params,
}: ForgetSuccessPagePros): Metadata => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()

  return {
    title: tenant ? `E-mail Enviado | ${tenant.name}` : "Página não encontrada",
  }
}

const ForgetSuccessPage = ({ params }: ForgetSuccessPagePros) => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()

  if (!tenant) {
    return notFound()
  }

  return (
    <div className="container max-w-lg bg-white py-12">
      <Header backHref={`/${tenant.slug}/forget`} />

      <div className="mb-12 mt-24 flex justify-center">
        <LucideSend className="text-tenant-primary" size={80} />
      </div>

      <div className="mb-7 text-center text-2xl font-semibold">
        Verifique seu e-mail
      </div>

      <div className="mb-7 text-center">
        Enviamos as instruções para <br />
        recuperação de senha para o seu <br />
        e-mail.
      </div>

      <Link href={`/${tenant.slug}/login`}>
        <CustomButton>Fazer Login</CustomButton>
      </Link>
    </div>
  )
}

export default ForgetSuccessPage
