"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { setCookie } from "cookies-next"
import {
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  MapPin,
  Ticket,
} from "lucide-react"

import type { CartItem as CartItemType } from "@/types/cart-item"
import type { User } from "@/types/user"
import type { CartCookie } from "@/types/cart-cookie"

// Components
import { CustomButton } from "@/components/custom-button"
import { Line } from "@/components/line"
import { ShippingForm } from "./shippingForm"
import { CartItem } from "@/app/[tenant]/_components/cart-item"
import { CustomInput } from "@/components/custom-input"
import { ButtonWithIcon } from "../../_components/button-with-icon"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { Address } from "@/types/address"

interface CheckoutProps {
  cart: CartItemType[]
  tenantSlug: string
  token: string
  user: User | null
}

export const Checkout = ({ cart: data, tenantSlug }: CheckoutProps) => {
  const [shippingPrice, setShippingPrice] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<Address>()
  const [cart, setCart] = useState(data.filter((item) => item.qt > 0))
  const [paymentChecked, setPaymentChecked] = useState({
    money: true,
    card: false,
  })

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

  const handleTogglePaymentType = () => {
    setPaymentChecked((prev) =>
      prev.card ? { card: false, money: true } : { card: true, money: false },
    )
  }

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
              checked={paymentChecked.money}
              onClick={handleTogglePaymentType}
              rightIcon={<CircleDollarSign size={24} />}
            />
            <ButtonWithIcon
              label="Cartão"
              checked={paymentChecked.card}
              onClick={handleTogglePaymentType}
              rightIcon={<CreditCard size={24} />}
            />
          </div>
        </div>

        {paymentChecked.money && (
          <div>
            <p className="mb-2">Troco</p>
            <div>
              <CustomInput placeholder="Vai precisar de troco? Digite seu troco" />
            </div>
          </div>
        )}

        <div>
          <p className="mb-2">Cupom de desconto</p>
          <ButtonWithIcon
            label="BURGER10"
            rightIcon={<Ticket size={24} />}
            leftIcon={<Check size={24} />}
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="py-2">
        {cart.length} {cart.length === 1 ? "item" : "itens"}
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
