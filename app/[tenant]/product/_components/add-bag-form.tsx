"use client"

import { useState } from "react"

// Components
import { CustomButton } from "@/components/custom-button"

// Utilities
import { formatMoney } from "@/helpers/formatMoney"
import { Quantity } from "../../_components/quantity"

interface AddBagFormProps {
  productPrice: number
}

export const AddBagForm = ({ productPrice }: AddBagFormProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToBagClick = () => {
    console.log({ value: productPrice * quantity })
  }

  return (
    <div>
      <p className="mb-3">Quantidade</p>
      <div className="mb-10 flex items-center justify-between">
        <Quantity initialValue={quantity} setQuantity={setQuantity} min={1} />
        <div className="text-3xl font-semibold text-tenant-primary sm:text-4xl">
          {formatMoney(productPrice * quantity)}
        </div>
      </div>
      <CustomButton onClick={handleAddToBagClick}>
        Adicionar à sacola
      </CustomButton>
    </div>
  )
}
