export const numberToCurrency = number => (
  number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
)

export const numAbbr = number => {
  if (number >= 1.0e+12) {
    return (number / 1.0e+12).toLocaleString() + " T"
  } else if (number / 1.0e+9) {
      return (number / 1.0e+9).toLocaleString() + " B"
  } else if (number / 1.0e+6) {
      return (number / 1.0e+6).toLocaleString() + " M"
  } else {
    return "Data not available"
  }
}
