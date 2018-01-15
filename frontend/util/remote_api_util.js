const ROOT_URL = 'https://api.iextrading.com/1.0/stock/';

export const fetchStockSeries = (symbol,
                                 interval = '1m',
                                 dataTypes = 'logo,quote,news,chart,company,stats') => {
  return $.ajax({
    method: 'GET',
    url: `${ROOT_URL}market/batch?symbols=${symbol}&types=${dataTypes}&range=${interval}&last=5`,
  })
}
