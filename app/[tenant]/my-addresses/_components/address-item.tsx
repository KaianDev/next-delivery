"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Address } from "@/types/address"
import { EllipsisVertical, MapPin, PenLine, Trash } from "lucide-react"
import Link from "next/link"

interface AddressItemProps {
  address: Address
  hrefEdit: string
  onDelete: (id: number) => void
  onSelect: (address: Address) => void
}

export const AddressItem = ({
  address,
  hrefEdit,
  onDelete,
  onSelect,
}: AddressItemProps) => {
  const addressString = `${address.street}, ${address.number}, ${address.district} - ${address.city}`

  return (
    <div className="flex border-b-2 py-8 pl-2">
      <div
        className="flex flex-1 overflow-hidden"
        onClick={() => onSelect(address)}
      >
        <div className="text-tenant-primary">
          <MapPin />
        </div>
        <div className="ml-2 flex-1 truncate">{addressString}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-[8px]">
          <DropdownMenuItem asChild>
            <Link href={hrefEdit}>
              <button className="flex w-full items-center gap-2">
                <PenLine size={24} className="text-zinc-500" />
                <div>Editar</div>
              </button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-300/50" />
          <DropdownMenuItem asChild>
            <button
              onClick={() => onDelete(address.id)}
              className="flex w-full items-center gap-2"
            >
              <Trash size={24} className="text-zinc-500" />
              <div>Apagar</div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
