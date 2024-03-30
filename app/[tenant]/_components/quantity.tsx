"use client"

import { Minus, Plus } from "lucide-react"

// Components
import { Button } from "@/components/ui/button"

// Utilities
import { formatQuantity } from "@/helpers/formatQuantity"
import { cn } from "@/lib/utils"

interface QuantityProps {
  initialValue: number
  variant?: "small" | "default"
  min?: number
  max?: number
  setQuantity: (quantity: number) => void
}

export const Quantity = ({
  initialValue,
  variant = "default",
  min,
  max,
  setQuantity,
}: QuantityProps) => {
  const handleIncreaseQuantity = () => {
    console.log(initialValue)
    if (initialValue !== max) setQuantity(initialValue + 1)
  }

  const handleDecreaseQuantity = () => {
    if (initialValue !== min) setQuantity(initialValue - 1)
  }

  return (
    <div
      className={cn(
        "bor grid w-[140px] grid-cols-3 overflow-hidden rounded",
        variant === "small" && "w-[123px]",
      )}
    >
      <Button
        disabled={initialValue === min}
        onClick={handleDecreaseQuantity}
        size="icon"
        className="aspect-square h-full w-full bg-tenant-primary hover:bg-tenant-primary disabled:bg-transparent disabled:text-muted-foreground"
      >
        <Minus />
      </Button>
      <div className="flex items-center justify-center text-lg font-bold text-tenant-primary">
        {formatQuantity(initialValue, 2)}
      </div>
      <Button
        disabled={initialValue === max}
        onClick={handleIncreaseQuantity}
        size="icon"
        className="aspect-square h-full w-full bg-tenant-primary hover:bg-tenant-primary disabled:bg-transparent disabled:text-muted-foreground"
      >
        <Plus />
      </Button>
    </div>
  )
}
