import type { Tenant } from "@/types/tenant"

export const useApi = () => ({
  getTenant: (tenantSlug: string): Tenant | false => {
    switch (tenantSlug) {
      case "next-burger":
        return {
          name: "Next Burger",
          color: "35 100 49",
          slug: "next-burger",
        }
      case "next-pizza":
        return {
          name: "Next Pizza",
          color: "133 85 48",
          slug: "next-pizza",
        }
      default:
        return false
    }
  },
})
