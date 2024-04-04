"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import type { CartCookie } from "@/types/cart-cookie"

export const addProductToCart = (
  tenantSlug: string,
  productId: number,
  quantity: number,
) => {
  const cookieStore = cookies()
  const cart: CartCookie[] = []

  if (cookieStore.has(`${tenantSlug}.cart`)) {
    const cartCookie = cookieStore.get(`${tenantSlug}.cart`)
    const cartJSON: CartCookie[] = JSON.parse(cartCookie?.value as string)

    for (let item of cartJSON) {
      if (item.id && item.qt) {
        cart.push(item)
      }
    }
  }

  const cartIndex = cart.findIndex((item) => item.id === productId)

  if (cartIndex > -1) {
    cart[cartIndex].qt += quantity
  } else {
    cart.push({ id: productId, qt: quantity })
  }

  cookieStore.set(`${tenantSlug}.cart`, JSON.stringify(cart))

  redirect(`/${tenantSlug}/cart`)
}

export const updateCartCookie = (
  tenantSlug: string,
  cartCookie: CartCookie[],
) => {
  const cookieStore = cookies()
  cookieStore.set(`${tenantSlug}.cart`, JSON.stringify(cartCookie))
}
