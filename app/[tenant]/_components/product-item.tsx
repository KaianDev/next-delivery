import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"

interface ProductItemProps {
  product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-product-item flex flex-col items-center overflow-hidden rounded-xl p-3 shadow-lg">
        <Image
          src={product.imageUrl}
          width={0}
          height={0}
          sizes="100"
          alt={product.name}
          className="aspect-square h-auto w-[80%]"
        />
        <div className="self-start">
          <p className="text-xs font-medium leading-none">{product.category}</p>
          <strong className="text-lg">{product.name}</strong>
          <p className="font-bold leading-none text-tenant">
            {product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "brl",
            })}
          </p>
        </div>
      </div>
    </Link>
  )
}
