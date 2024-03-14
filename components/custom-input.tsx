"use client"
import { ComponentProps, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

// Components
import { Input } from "./ui/input"

interface CustomInputProps extends ComponentProps<"input"> {}

export const CustomInput = ({ type = "text", ...rest }: CustomInputProps) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input
        type={show ? "text" : type}
        className="h-14 rounded border-transparent bg-zinc-200/50 outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-tenant"
        {...rest}
      />
      {type === "password" && (
        <button
          className="absolute right-0 top-0 flex h-14 items-center justify-center pr-3"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? (
            <EyeOff size={24} className="text-muted-foreground" />
          ) : (
            <Eye size={24} className="text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  )
}
