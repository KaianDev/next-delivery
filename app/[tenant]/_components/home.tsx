/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type { User } from "@/types/user"
import { Banner } from "./banner"
import { ProductGrid } from "./product-grid"
import { useEffect, useState } from "react"
import { Product } from "@/types/product"
import { SideMenu } from "./side-menu"
import { SearchInput } from "./search-input"
import { useAuthContext } from "@/contexts/auth"

interface HomeProps {
  user: User | null
  token: string
  products: Product[]
  tenantSlug: string
}

export const Home = ({
  products: data,
  tenantSlug,
  user,
  token,
}: HomeProps) => {
  const [products, setProducts] = useState<Product[]>(data)
  const { login } = useAuthContext()
  console.log({ token, user })

  useEffect(() => {
    if (user) {
      login(user, token)
    }
  }, [])

  return (
    <>
      <header className="py-7">
        <div className="container space-y-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-medium">Seja Bem Vindo(a) 👋</h1>
              <p className="mt-2 text-muted-foreground">
                O que deseja pra hoje?
              </p>
            </div>
            <SideMenu tenantSlug={tenantSlug} />
          </div>
          <SearchInput />
        </div>
      </header>
      <Banner />
      <ProductGrid data={products} tenantSlug={tenantSlug} />
    </>
  )
}
