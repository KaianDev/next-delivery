"use client"

import Image from "next/image"

import type { CartItem as CartItemType } from "@/types/cart-item"

// Components
import { Quantity } from "@/app/[tenant]/_components/quantity"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { formatQuantity } from "@/helpers/formatQuantity"

interface CartItemProps {
  cartItem: CartItemType
  onChange?: (quantity: number, id: number) => void
  editable?: boolean
}

export const CartItem = ({ cartItem, onChange, editable }: CartItemProps) => {
  return (
    <div className="flex border-collapse items-center justify-between gap-2 border-t-2 py-2 pr-2">
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
      {editable && onChange && (
        <div>
          <Quantity
            variant="small"
            initialValue={cartItem.qt}
            setQuantity={(quantity) => onChange(quantity, cartItem.product.id)}
            min={0}
          />
        </div>
      )}
      {!editable && (
        <div className="flex flex-col text-tenant-primary">
          <p className="mb-1 text-xs">Qnt.</p>
          <div className="flex size-10 items-center justify-center rounded-[4px] bg-zinc-300/40 font-bold">
            {formatQuantity(cartItem.qt, 2)}
          </div>
        </div>
      )}
    </div>
  )
}
