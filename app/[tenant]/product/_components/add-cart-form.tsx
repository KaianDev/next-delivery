"use client"

import { useState } from "react"
import type { Product } from "@/types/product"

// Components
import { CustomButton } from "@/components/custom-button"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { Quantity } from "@/app/[tenant]/_components/quantity"
import { addProductToCart } from "@/action/cart"

interface AddCartFormProps {
  product: Product
  tenantSlug: string
}

export const AddCartForm = ({ product, tenantSlug }: AddCartFormProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCartClick = () => {
    addProductToCart(tenantSlug, product.id, quantity)
  }

  return (
    <div>
      <p className="mb-3">Quantidade</p>
      <div className="mb-10 flex items-center justify-between">
        <Quantity initialValue={quantity} setQuantity={setQuantity} min={1} />
        <div className="text-3xl font-semibold text-tenant-primary sm:text-4xl">
          {formatMoney(product.price * quantity)}
        </div>
      </div>
      <CustomButton onClick={handleAddToCartClick}>
        Adicionar à sacola
      </CustomButton>
    </div>
  )
}
