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

const toEST = timestamp => (
  timestamp  - (7 * 60 * 60 * 1000)
);

export const dateConv = data => {
  const date = data.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

  return toEST(Date.parse(`${date}T${data.minute}`))
};



// 1514583600000
