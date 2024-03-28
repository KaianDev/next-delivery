"use client"

import { useState } from "react"
import { Search } from "lucide-react"

// Utilities
import { cn } from "@/lib/utils"

interface SearchInputProps {
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded border bg-white p-1 px-2",
        focused && "border-tenant-primary",
      )}
    >
      <button
        type="button"
        className="flex aspect-square size-12 items-center justify-center rounded bg-[#fbfbf9]"
      >
        <Search strokeWidth="2.5" className="text-tenant-primary" size={24} />
      </button>

      <input
        type="search"
        className="w-full border-0 bg-white text-lg outline-none"
        placeholder="Digite o nome do seu produto"
        onChange={(e) => onSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}
