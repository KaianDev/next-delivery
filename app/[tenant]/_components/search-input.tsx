"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Utilities
import { cn } from "@/lib/utils"

const searchSchema = z.object({
  search: z.string(),
})

type SearchForm = z.infer<typeof searchSchema>

export const SearchInput = () => {
  const [focused, setFocused] = useState(false)
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

  const handleSearchSubmit = ({ search }: SearchForm) => {
    if (search.trim() !== "") {
      console.log({ search })
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSearchSubmit)}
      className={cn(
        "flex items-center justify-center gap-3 rounded border bg-white p-1 px-2",
        focused && "border-tenant",
      )}
    >
      <button
        type="submit"
        className="flex aspect-square size-12 items-center justify-center rounded bg-[#fbfbf9]"
      >
        <Search strokeWidth="2.5" className="text-tenant" size={24} />
      </button>

      <input
        {...form.register("search")}
        type="search"
        className="w-full border-0 bg-white text-lg outline-none"
        placeholder="Digite o nome do seu produto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  )
}
