const rootURL = 'https://api.iextrading.com/1.0/';
const baseURL = `${rootURL}stock/market/batch?symbols=`;

const defaultDataTypes = 'logo,quote,news,chart,company,stats';
export const fetchStockSeries = ( symbol,
                                  optionalParams,
                                  defaultTypes = defaultDataTypes ) => {

  const dataTypes = (optionalParams) ? (optionalParams + defaultTypes)
                                         :
                                       defaultTypes;

  return $.ajax({
    method: 'GET',
    url: `${baseURL}${symbol}&types=${dataTypes}&range='dynamic'&last=5`
  })
}

export const fetchPeers = tkrStr => (
  $.ajax({
    method: 'GET',
    url: `${baseURL}${tkrStr}&types=quote`
  })
)

export const fetchSymbols = () => {
  return $.ajax({
    method: 'GET',
    url: `${rootURL}ref-data/symbols`
  })
}
