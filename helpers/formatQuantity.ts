export const formatQuantity = (quantity: number, minDigits: number) => {
  const size = quantity.toString().length
  if (size > minDigits) return quantity.toString()
  const remain = minDigits - size
  return `${"0".repeat(remain)}${quantity}`
}
