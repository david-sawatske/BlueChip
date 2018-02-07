const ROOT_URL = 'https://api.iextrading.com/1.0/stock/';

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
    url: `${ROOT_URL}market/batch?symbols=${symbol}&types=${dataTypes}&range=${interval}&last=5`
  })
}
