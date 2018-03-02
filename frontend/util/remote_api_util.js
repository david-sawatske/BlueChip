const ROOT_URL = 'https://api.iextrading.com/1.0/stock/market/batch?symbols=';

const defaultDataTypes = 'logo,quote,news,chart,company,stats';
export const fetchStockSeries = ( symbol,
                                  interval = '1d',
                                  optionalParams,
                                  defaultTypes = defaultDataTypes ) => {

  const dataTypes = (optionalParams) ? (optionalParams + defaultTypes)
                                         :
                                       defaultTypes;

  return $.ajax({
    method: 'GET',
    url: `${ROOT_URL}${symbol}&types=${dataTypes}&range=${interval}&last=5`
  })
}

export const fetchPeers = tkrStr => (
  $.ajax({
    method: 'GET',
    url: `${ROOT_URL}${tkrStr}&types=quote`
  })
)

export const fetchSymbols = () => {
  return $.ajax({
    method: 'GET',
    url: 'https://api.iextrading.com/1.0/ref-data/symbols'
  })
}
