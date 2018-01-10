export const numberToCurrency = number => (
  number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
)

export const stringToInt = string => (
  Number(string) ? Number(string) : string
)

export const numAbbr = number => {
  if (Math.abs(number / 1.0e+12) >= 1) {
    return (number / 1.0e+12).toLocaleString() + " T"
  } else if (Math.abs(number / 1.0e+9) >= 1) {
      return (number / 1.0e+9).toLocaleString() + " B"
  } else if (Math.abs(number / 1.0e+6) >= 1) {
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


export const arrSample = arr => {
  const randIdx = Math.floor(Math.random() * arr.length |0);

  return arr[randIdx]
}
