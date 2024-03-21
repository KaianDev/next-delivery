"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"

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
    if (initialValue !== max) setQuantity(initialValue + 1)
  }

  const handleDecreaseQuantity = () => {
    if (initialValue !== min) setQuantity(initialValue - 1)
  }

  const formattedInitialValue = () => {
    if (initialValue < 10) {
      return `0${initialValue}`
    }
    return initialValue
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
        {formattedInitialValue()}
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
