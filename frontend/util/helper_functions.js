export const numberToCurrency = number => (
  number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
)
