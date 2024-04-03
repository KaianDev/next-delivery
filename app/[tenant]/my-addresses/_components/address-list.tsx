"use client"

import { Address } from "@/types/address"
import { AddressItem } from "./address-item"

interface AddressListProps {
  addresses: Address[]
  tenantSlug: string
}

export const AddressList = ({ addresses, tenantSlug }: AddressListProps) => {
  const handleDeleteAddress = (id: number) => {
    console.log({ id })
  }
  const handleSelectAddress = (address: Address) => {
    console.log({ address })
  }

  return (
    <div className="flex-1 border-t-2">
      {addresses.map((address) => (
        <AddressItem
          key={address.id}
          address={address}
          onDelete={handleDeleteAddress}
          onSelect={handleSelectAddress}
          hrefEdit={`/${tenantSlug}/address/${address.id}`}
        />
      ))}
    </div>
  )
}
