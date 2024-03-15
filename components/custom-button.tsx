"use client"

import { ComponentProps } from "react"

// Components
import { Button } from "./ui/button"

// Utilities
import { cn } from "@/lib/utils"

interface CustomButtonProps extends ComponentProps<"button"> {
  inverter?: boolean
}

export const CustomButton = ({
  children,
  className,
  inverter,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      className={cn(
        "h-14 w-full rounded border-2 border-tenant bg-tenant text-base font-semibold text-white ease-out hover:bg-tenant/80",
        inverter && "bg-transparent text-tenant hover:bg-transparent",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
