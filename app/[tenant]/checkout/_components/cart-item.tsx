/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import type { CartItem as CartItemType } from "@/types/cart-item"

// Components
import { Quantity } from "@/app/[tenant]/_components/quantity"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"

interface CartItemProps {
  cartItem: CartItemType
  onChange: (quantity: number, id: number) => void
}

export const CartItem = ({ cartItem, onChange }: CartItemProps) => {
  return (
    <div className="flex border-collapse items-center justify-between gap-2 border-t-2 py-2">
      <Image
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        width={0}
        height={0}
        sizes="100"
        className="size-20"
      />
      <div className="flex-1">
        <p className="text-xs leading-none text-muted-foreground">
          {cartItem.product.category}
        </p>
        <p className="font-medium">{cartItem.product.name}</p>
        <p className="font-semibold text-tenant-primary">
          {formatMoney(cartItem.product.price)}
        </p>
      </div>
      <div>
        <Quantity
          variant="small"
          initialValue={cartItem.qt}
          setQuantity={(quantity) => onChange(quantity, cartItem.product.id)}
          min={0}
        />
      </div>
    </div>
  )
}
