/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Menu } from "lucide-react"

// Components
import { Button } from "@/components/ui/button"
import { SearchInput } from "./search-input"

export const Header = () => {
  return (
    <header className="border-b bg-black/10 py-7 shadow">
      <div className="container space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">Seja Bem Vindo(a) 👋</h1>
            <p className="mt-2 text-muted-foreground">O que deseja pra hoje?</p>
          </div>
          <Button size="icon" variant="outline">
            <Menu className="text-tenant" size={24} />
          </Button>
        </div>
        <SearchInput />
      </div>
    </header>
  )
}
