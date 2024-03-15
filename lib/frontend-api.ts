import type { Tenant } from "@/types/tenant"

export const frontEndAPI = () => ({
  getTenant: (tenantSlug: string): Tenant | false => {
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
})
