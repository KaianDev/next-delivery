import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

// Components
import { Header } from "@/components/header"
import { AddCartForm } from "../_components/add-cart-form"

// Utilities
import { frontEndAPI } from "@/lib/frontend-api"
import { Line } from "@/components/line"

interface ProductItemPageProps {
  params: {
    id: string
    tenant: string
  }
}

export const generateMetadata = ({
  params,
}: ProductItemPageProps): Metadata => {
  const api = frontEndAPI(params.tenant)
  const tenant = api.getTenant()
  const product = api.getProduct(parseInt(params.id))

  return {
    title:
      product && tenant
        ? `${product.name} | ${tenant.name}`
        : "Página não encontrada",
  }
}

const ProductItemPage = async ({ params }: ProductItemPageProps) => {
  const api = frontEndAPI(params.tenant)
  const tenant = await api.getTenant()
  const product = await api.getProduct(parseInt(params.id))

  if (!tenant) {
    return notFound()
  }

  return (
    <div className="flex flex-col md:container md:flex-row">
      <div className="container flex-col bg-tenant-primary bg-[url('/assets/product-bg.png')] bg-cover bg-center bg-no-repeat pt-12 md:flex md:h-screen">
        <Header inverter backHref={`/${tenant.slug}`} title="Produto" />
        <div className="sm:items-start md:flex md:flex-1 md:items-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={0}
            height={0}
            sizes="100"
            className="relative mx-auto h-auto w-[90%] max-w-[400px] animate-tenant-bounce object-cover md:max-w-none"
          />
        </div>
      </div>
      <div className="container -mt-20 bg-white pt-16 md:mt-0">
        <p className="text-base font-medium sm:text-lg">{product.category}</p>
        <h1 className="relative mb-5 w-fit border-b border-tenant-secondary pb-5 text-3xl font-bold md:text-4xl">
          {product.name}
        </h1>
        <Line className="-mt-[21px] mb-5" />
        <p className="mb-6 break-words text-left text-base text-muted-foreground md:text-lg">
          {product.description}
        </p>
        <AddCartForm product={product} tenantSlug={tenant.slug} />
      </div>
    </div>
  )
}

export default ProductItemPage
