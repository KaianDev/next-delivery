export const formatMoney = (value: number) => {
  return value.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  })
}
