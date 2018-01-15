import React from 'react';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';
import StockNews from './stock_news_index';
import UserTransactions from './user_transaction_index';
import ModalRoot from  '../modal/modal_root_container'

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, interval, showModal, hideModal,
            stockTransactionData } = this.props

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company, stats, news } = remoteStockData;

      ShowComponent =
        <div>
          <button className="button" onClick={ () =>
            showModal('transaction', { modalOpen: true }) }>
            Buy/Sell this stock
          </button>
          <StockHeader quote={quote}
                       logo={logo} />
          <StockSummary quote={quote} />
          <StockChart chart={chart}
                      interval={interval} />
          <StockNews news={news} />


          <ModalRoot quote={quote}/>
        </div>
    }

    let TransactionComponent
    if (stockTransactionData) {
      const transactArray = Object.values(stockTransactionData);

      TransactionComponent = <UserTransactions transactData={transactArray} />
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
