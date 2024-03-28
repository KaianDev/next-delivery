"use client"

import Link from "next/link"
import { ProductItem } from "./product-item"
import type { Product } from "@/types/product"
import { useState } from "react"

interface ProductGridProps {
  tenantSlug: string
  data: Product[]
}

export const ProductGrid = ({ tenantSlug, data }: ProductGridProps) => {
  // TODO: GET Products
  const [products, setProducts] = useState<Product[]>(data)

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 px-6 pb-8 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} href={`/${tenantSlug}/product/${product.id}`}>
          <ProductItem product={product} />
        </Link>
      ))}
    </div>
  )
}
