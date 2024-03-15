import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"

// Components
import { Line } from "@/components/line"
import { LoginForm } from "./_components/login-form"
import { CustomButton } from "@/components/custom-button"
import { Header } from "@/components/header"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"

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
    <div className="container max-w-lg bg-white py-12 ">
      <Header backHref={`/${tenant.slug}`} />
      <div className="mb-10 mt-5 text-center text-4xl font-bold text-zinc-900">
        {tenant.name}
      </div>

      <div className="relative mx-auto w-fit border-b border-tenant-primary pb-10 text-center text-lg leading-6">
        Use suas credenciais para <br /> realizar o login.
      </div>

      <Line className="mb-14" />

      <LoginForm />

      <div className="relative mx-auto mt-10 w-fit border-b border-tenant-primary pb-10">
        Esqueceu sua senha?{" "}
        <Link
          href={`/${tenant.slug}/sign-up`}
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
