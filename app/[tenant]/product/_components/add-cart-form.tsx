"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { CartCookie } from "@/types/cart-cookie"
import type { Product } from "@/types/product"

// Components
import { CustomButton } from "@/components/custom-button"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { Quantity } from "@/app/[tenant]/_components/quantity"
import { getCookie, hasCookie, setCookie } from "cookies-next"

interface AddCartFormProps {
  product: Product
  tenantSlug: string
}

export const AddCartForm = ({ product, tenantSlug }: AddCartFormProps) => {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAddToCartClick = () => {
    const cart: CartCookie[] = []

    if (hasCookie("delivery.cart")) {
      const cartCookie = getCookie("delivery.cart")
      const cartJSON: CartCookie[] = JSON.parse(cartCookie as string)

      for (let item of cartJSON) {
        if (item.id && item.qt) {
          cart.push(item)
        }
      }
    }

    const cartIndex = cart.findIndex((item) => item.id === product.id)

    if (cartIndex > -1) {
      cart[cartIndex].qt += quantity
    } else {
      cart.push({ id: product.id, qt: quantity })
    }

    setCookie("delivery.cart", JSON.stringify(cart))

    router.push(`/${tenantSlug}/cart`)
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
