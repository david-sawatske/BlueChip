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

export const filterObject = (sourceObj, allowedKeys) => (
  Object.keys(sourceObj)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = sourceObj[key];
      return obj;
    }, {})
)

const calcTransaction = transaction => (
  transaction.shareQuant * transaction.sharePrice
)

const calcByTickerTransaction = transaction => (
  transaction.shareQuant * transaction.sharePrice
)

export const calcCashInvested = transactionData => {
  let totalCashInvested = 0;
  const investedByTicker = {}

  Object.values(transactionData).map(allTransact => {
    Object.values(allTransact).map(transaction => {
      const currCashInvested = calcTransaction(transaction);
      const sharesTransacted = transaction.shareQuant;
      const symbol = transaction.symbol;

      totalCashInvested += currCashInvested;

      if (investedByTicker[symbol]) {
        investedByTicker[symbol]['invested'] += currCashInvested;
        investedByTicker[symbol]['sharesOwned'] += sharesTransacted;
      } else {
        investedByTicker[symbol] = { invested: currCashInvested,
                                     sharesOwned: sharesTransacted }
      }
    })
  })

  return { totalCashInvested: totalCashInvested,
           investedByTicker: investedByTicker }
}

export const camelToTitle = camel => {
  const firstLettLow = camel.replace(/([a-z])([A-Z])/g, '$1 $2')

  return (
    firstLettLow.charAt(0).toUpperCase() +  firstLettLow.slice(1)
  )
}
