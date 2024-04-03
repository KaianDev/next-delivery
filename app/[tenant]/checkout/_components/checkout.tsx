"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ChevronRight,
  CircleCheckBig,
  CircleDollarSign,
  CreditCard,
  MapPin,
  Ticket,
} from "lucide-react"

import type { CartItem as CartItemType } from "@/types/cart-item"
import type { User } from "@/types/user"
import type { Address } from "@/types/address"

// Components
import { CustomButton } from "@/components/custom-button"
import { Line } from "@/components/line"
import { CartItem } from "@/app/[tenant]/_components/cart-item"
import { CustomInput } from "@/components/custom-input"
import { ButtonWithIcon } from "../../_components/button-with-icon"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { DiscountCouponForm } from "./discount-coupon-form"

interface CheckoutProps {
  cart: CartItemType[]
  tenantSlug: string
  token: string
  user: User | null
}

export const Checkout = ({ cart, tenantSlug }: CheckoutProps) => {
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<Address>()

  const [paymentType, setPaymentType] = useState<"money" | "card">("money")
  const [discountCoupon, setDiscountCoupon] = useState("")
  const [discountValue, setDiscountValue] = useState(0)

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, current) => (acc += current.product.price * current.qt),
      0,
    )
  }, [cart])

  const handleSelectAddress = () => {
    setShippingAddress({
      id: 1,
      cep: "62580000",
      street: "Rua São José",
      district: "Pedrinhas",
      city: "Acaraú",
      state: "CE",
      number: "265",
    })
    setShippingPrice(10)
  }

  const handleDiscountSubmit = (coupon: string) => {
    setDiscountCoupon(coupon)
    setDiscountValue(10)
  }

  return (
    <div>
      <div className="mb-6 space-y-6">
        <div>
          <p className="mb-2">Endereço</p>
          <ButtonWithIcon
            label={
              shippingPrice
                ? `${shippingAddress?.street}, ${shippingAddress?.number}, ${shippingAddress?.district} - ${shippingAddress?.city}`
                : "Selecione um endereço"
            }
            rightIcon={<MapPin size={24} />}
            leftIcon={<ChevronRight size={24} />}
            onClick={handleSelectAddress}
          />
        </div>

        <div>
          <p className="mb-2">Tipo de Pagamento</p>
          <div className="flex gap-6">
            <ButtonWithIcon
              label="Dinheiro"
              checked={paymentType === "money"}
              onClick={() => setPaymentType("money")}
              rightIcon={<CircleDollarSign size={24} />}
            />
            <ButtonWithIcon
              label="Cartão"
              checked={paymentType === "card"}
              onClick={() => setPaymentType("card")}
              rightIcon={<CreditCard size={24} />}
            />
          </div>
        </div>

        {paymentType === "money" && (
          <div>
            <p className="mb-2">Troco</p>
            <div>
              <CustomInput placeholder="Vai precisar de troco? Digite seu troco" />
            </div>
          </div>
        )}

        <div>
          <p className="mb-2">Cupom de desconto</p>
          {discountCoupon ? (
            <ButtonWithIcon
              label={discountCoupon}
              rightIcon={<Ticket size={24} />}
              leftIcon={<CircleCheckBig size={20} />}
              onClick={() => {}}
            />
          ) : (
            <DiscountCouponForm onSubmit={handleDiscountSubmit} />
          )}
        </div>
      </div>

      <div className="py-2">
        {cart.length} {cart.length === 1 ? "item" : "itens"}
      </div>

      <div className="my-2 border-b-2">
        {cart.map((item) => (
          <CartItem key={item.product.id} cartItem={item} />
        ))}
      </div>

      <div className="space-y-4">
        <div className="mt-6 p-4">
          <div className="flex justify-between gap-4 font-semibold">
            <p>Subtotal</p>
            <p className="text-end">{formatMoney(subtotal)}</p>
          </div>
          {discountCoupon && (
            <div className="flex justify-between gap-4 font-semibold">
              <p>Desconto</p>
              <p> - {formatMoney(discountValue)}</p>
            </div>
          )}
          <div className="flex justify-between gap-4 font-semibold">
            <p>Frete</p>
            <p className="text-end">
              {shippingPrice > 0 ? formatMoney(shippingPrice) : "--"}
            </p>
          </div>

          <Line className="my-4 border-dashed" />
          <div className="mb-6 flex items-center justify-between">
            <p>Total</p>
            <p className="text-2xl font-semibold text-tenant-primary">
              {formatMoney(subtotal - discountValue + shippingPrice)}
            </p>
          </div>
          <Link href={`/${tenantSlug}/orders`}>
            <CustomButton disabled={!shippingPrice}>
              Finalizar Pedido
            </CustomButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
