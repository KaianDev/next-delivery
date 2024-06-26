import Image from "next/image"

// Utilities
import type { Product } from "@/types/product"
import { formatMoney } from "@/helpers/formatMoney"

interface ProductItemProps {
  product: Product
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
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
        <p className="font-bold leading-none text-tenant-primary">
          {formatMoney(product.price)}
        </p>
      </div>
    </div>
  )
}
