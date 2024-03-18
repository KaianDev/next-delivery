import { Product } from "@/types/product"
import type { Tenant } from "@/types/tenant"

const TEMPORARYproduct: Product = {
  id: 1,
  imageUrl: "/temp/burger1.png",
  name: "Texas Burger",
  category: "Tradicional",
  price: 25.5,
  description:
    "2 Blends de carne de 150g, Queijo Cheddar,  Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal",
}

export const frontEndAPI = (tenantSlug: string) => ({
  getTenant: (): Tenant | false => {
    switch (tenantSlug) {
      case "next-burger":
        return {
          name: "Next Burger",
          primary: "#fb9400",
          secondary: "#f0c99c",
          slug: "next-burger",
        }
      case "next-pizza":
        return {
          name: "Next Pizza",
          primary: "#10b981",
          secondary: "#59ea78",
          slug: "next-pizza",
        }
      case "next-sushi":
        return {
          name: "Next Sushi",
          primary: "#fb0000",
          secondary: "#fa333a",
          slug: "next-sushi",
        }
      default:
        return false
    }
  },

  getAllProducts: () => {
    const products: Product[] = []

    for (let i = 0; i < 10; i++) {
      products.push(TEMPORARYproduct)
    }

    return products
  },

  getProduct: (id: string) => {
    return TEMPORARYproduct
  },
})
