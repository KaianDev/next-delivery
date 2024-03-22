"use client"

// Components
import { SearchInput } from "./search-input"
import { SideMenu } from "./side-menu"

interface HeaderProps {
  tenantSlug: string
}

export const Header = ({ tenantSlug }: HeaderProps) => {
  return (
    <header className="py-7">
      <div className="container space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">Seja Bem Vindo(a) 👋</h1>
            <p className="mt-2 text-muted-foreground">O que deseja pra hoje?</p>
          </div>
          <SideMenu tenantSlug={tenantSlug} />
        </div>
        <SearchInput />
      </div>
    </header>
  )
}
