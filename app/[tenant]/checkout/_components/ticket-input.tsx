"use client"

import { cn } from "@/lib/utils"
import { Check, Ticket } from "lucide-react"
import { ComponentProps, useState } from "react"

interface TicketInputPros extends ComponentProps<"input"> {}

export const TicketInput = ({}: TicketInputPros) => {
  const [focus, setFocus] = useState(false)

  return (
    <div
      className={cn(
        "flex h-14 items-center gap-4 rounded-[4px] bg-zinc-300/40 p-2",
        focus && "bg-white ring-2 ring-tenant-primary",
      )}
    >
      <Ticket className="text-tenant-primary" />
      <input
        type="text"
        className="flex-1 bg-transparent text-sm outline-none"
        placeholder="Digite seu cupom"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className="rounded-full bg-green-500 p-[2px] text-white">
        <Check size={16} />
      </div>
    </div>
  )
}
