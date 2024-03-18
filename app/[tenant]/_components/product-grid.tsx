"use client"

import Link from "next/link"
import { ProductItem } from "./product-item"
import { Product } from "@/types/product"
import { useState } from "react"

interface ProductGridProps {
  tenantSlug: string
  data: Product[]
}

// const data: Product[] = [
//   {
//     id: 1,
//     imageUrl: "/temp/burger1.png",
//     name: "Texas Burger",
//     category: "Tradicional",
//     price: 25.5,
//   },
//   {
//     id: 2,
//     imageUrl: "/temp/burger2.png",
//     name: "Monster Burger",
//     category: "Tradicional",
//     price: 25.5,
//   },
//   {
//     id: 3,
//     imageUrl: "/temp/burger3.png",
//     name: "Old Burger",
//     category: "Tradicional",
//     price: 25.5,
//   },
//   {
//     id: 4,
//     imageUrl: "/temp/burger4.png",
//     name: "Golden Burger",
//     category: "Tradicional",
//     price: 25.5,
//   },
// ]

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
