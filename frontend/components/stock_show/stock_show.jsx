import React from 'react';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';
import StockNews from './stock_news_index';
import UserTransactions from './user_transaction_index';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, interval, stockTransactionData } = this.props

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company, stats, news } = remoteStockData;

      ShowComponent =
        <div>
          <StockHeader quote={quote}
                       logo={logo} />
          <StockSummary quote={quote} />
          <StockChart chart={chart}
                      interval={interval} />
          <StockNews news={news} />

        </div>
    }

    let TransactionComponent
    if (stockTransactionData) {
      TransactionComponent = <UserTransactions transactData={stockTransactionData} />
    }

    return (
      <div>
        { ShowComponent }
        { TransactionComponent }
      </div>
    )
  }
}

export default StockShow;
