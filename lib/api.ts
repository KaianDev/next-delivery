interface IGetTenantResponse {
  name: string
  color: string
}

export const useApi = () => ({
  getTenant: (tenantSlug: string): IGetTenantResponse | false => {
    switch (tenantSlug) {
      case "next-burger":
        return {
          name: "Next Burger",
          color: "35 100 49",
        }
      case "next-pizza":
        return {
          name: "Next Pizza",
          color: "133 85 48",
        }
      default:
        return false
    }
  },
})
