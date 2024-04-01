"use client"

import { ComponentProps } from "react"

// Components
import { Button } from "./ui/button"

// Utilities
import { cn } from "@/lib/utils"

interface CustomButtonProps extends ComponentProps<"button"> {
  hollow?: boolean
}

export const CustomButton = ({
  children,
  className,
  hollow,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      className={cn(
        "h-14 w-full rounded border-2 border-tenant-primary bg-tenant-primary text-base font-semibold text-white duration-300 ease-linear hover:scale-105 disabled:opacity-40 disabled:hover:scale-100",
        hollow && "bg-transparent text-tenant-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
