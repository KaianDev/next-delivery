"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { setCookie } from "cookies-next"

import type { CartItem as CartItemType } from "@/types/cart-item"
import type { User } from "@/types/user"
import type { CartCookie } from "@/types/cart-cookie"

// Components
import { CustomButton } from "@/components/custom-button"
import { Line } from "@/components/line"
import { ShippingForm } from "./shippingForm"
import { CartItem } from "./cart-item"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"

interface CartProps {
  cart: CartItemType[]
  tenantSlug: string
  token: string
  user: User | null
}

export const Cart = ({ cart: data, tenantSlug }: CartProps) => {
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingTime, setShippingTime] = useState(0)
  const [shippingAddress, setShippingAddress] = useState("")
  const [cart, setCart] = useState(data.filter((item) => item.qt > 0))

  const handleShippingSubmit = async ({ zipCode }: { zipCode: string }) => {
    setShippingPrice(10.5)
    setShippingTime(15)
    setShippingAddress("Rua das Flores - Jardins da Serra - Campina Pequena")
  }

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, current) => (acc += current.product.price * current.qt),
      0,
    )
  }, [cart])

  const handleCartChange = (quantity: number, id: number) => {
    const newCart = [...cart]
      .map((item) => {
        if (item.product.id === id) {
          item.qt = quantity
        }
        return item
      })
      .filter((item) => item.qt !== 0)

    const cartCookie: CartCookie[] = []

    for (let item of newCart) {
      if (item.qt > 0) {
        cartCookie.push({
          id: item.product.id,
          qt: item.qt,
        })
      }
    }

    setCookie(`${tenantSlug}.cart`, JSON.stringify(cartCookie))
    setCart(newCart)
  }

  return (
    <div>
      <div className="py-2">
        <div>
          {cart.length} {cart.length === 1 ? "item" : "itens"}
        </div>
      </div>

      <div className="my-2 border-b-2">
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            cartItem={item}
            onChange={handleCartChange}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="mt-6 text-muted-foreground">Calcular frete e prazo</div>

        <ShippingForm onShippingSubmit={handleShippingSubmit} />

        {shippingTime > 0 && (
          <div className="p-4">
            <p className="text-xs text-muted-foreground">{shippingAddress}</p>
            <div className="mt-2 flex justify-between">
              <p className="font-normal">
                Receba em até {shippingTime} minutos
              </p>
              <p className="font-semibold text-tenant-primary">
                {formatMoney(shippingPrice)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 p-4">
          <div className="grid grid-cols-[1fr_120px] gap-y-4  font-semibold">
            <p>Subtotal</p>
            <p className="text-end">{formatMoney(subtotal)}</p>
            <p>Frete</p>
            <p className="text-end">
              {shippingPrice > 0 ? formatMoney(shippingPrice) : "--"}
            </p>
          </div>
          <Line className="my-4 border-dashed" />
          <div className="mb-6 flex items-center justify-between">
            <p>Total</p>
            <p className="text-2xl font-semibold text-tenant-primary">
              {formatMoney(subtotal + shippingPrice)}
            </p>
          </div>
          <Link href={`/${tenantSlug}`}>
            <CustomButton>Continuar</CustomButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
