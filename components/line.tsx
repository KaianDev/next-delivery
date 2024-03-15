import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

interface LineProps extends ComponentProps<"div"> {}

export const Line = ({ className, ...rest }: LineProps) => {
  return (
    <div
      className={cn("-mt-[1px] w-full border-t border-zinc-300", className)}
      {...rest}
    />
  )
}
