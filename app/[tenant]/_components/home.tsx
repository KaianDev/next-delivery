/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type { User } from "@/types/user"
import type { Product } from "@/types/product"

// Components
import { Banner } from "./banner"
import { ProductGrid } from "./product-grid"
import { useEffect, useState } from "react"
import { SideMenu } from "./side-menu"
import { SearchInput } from "./search-input"
import { NoItems } from "./no-items"

// Utilities
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
  const [searchText, setSearchText] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const handleSearch = (value: string) => setSearchText(value)

  const { login } = useAuthContext()

  useEffect(() => {
    if (user) {
      login(user, token)
    }
  }, [])

  useEffect(() => {
    const filteredProducts: Product[] = []
    for (let product of products) {
      if (
        product.name
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase()) > -1
      ) {
        filteredProducts.push(product)
      }
    }
    setFilteredProducts(filteredProducts)
  }, [searchText])

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
          <SearchInput onSearch={handleSearch} />
        </div>
      </header>
      {!searchText && (
        <>
          <Banner />
          <ProductGrid data={products} tenantSlug={tenantSlug} />
        </>
      )}

      {searchText && (
        <>
          <div className="container my-5 text-muted-foreground">
            Pesquisando por: <strong>{searchText}</strong>
          </div>

          {filteredProducts.length > 0 && (
            <ProductGrid data={filteredProducts} tenantSlug={tenantSlug} />
          )}

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-20">
              <NoItems />
              <div className="text-center text-2xl text-muted-foreground/50">
                Ops! Não há itens <br />
                com este nome
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
