import React from 'react';

import PeerData from './peer_data';
import CompanyData from './company_data';
import StockHeader from './stock_header';
import StockSummary from './stock_summary';
import StockNews from './stock_news_index';
import EarningsTable from './earnings_table';
import FinancialsTable from './financials_table';
import StockChart from './stock_chart_container';
import UserTransactions from './user_transaction_index';
import ModalRoot from  '../modal/modal_root_container';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, showModal, hideModal, currentUser,
            transactionData, peerData } = this.props;
    const transactArray = (transactionData) ? Object.values(transactionData)
                                               :
                                              [];

    let TransactionButton
    if (currentUser) {
      TransactionButton = <button className="button" onClick={ () =>
                            showModal('transaction', { modalOpen: true }) }>
                            Buy/Sell
                          </button>
    }

    let TransactionComponent
    if (transactArray.length > 0) {
      TransactionComponent = <UserTransactions transactData={transactArray} />
    }

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company, stats, news,
              earnings, financials } = remoteStockData;

      ShowComponent =
        <div className="stock-data">
          <div className="header-container">
            <StockHeader quote={quote}
                         logo={logo} />

           { TransactionButton }
          </div>

          <div className="transaction-data">
            <h1>Transaction History</h1>

            { TransactionComponent }
          </div>

          <StockChart symbol={quote.symbol}
                      companyName={quote.companyName} />

          <StockSummary quote={quote} />

          <FinancialsTable financials={financials.financials} />

          <CompanyData company={company}
                       stats = {stats} />

          <div className="earnings-peer">
            <EarningsTable earnings={earnings.earnings} />
            <PeerData peerData={peerData} />
          </div>

          <StockNews news={news}
                     companyName={quote.companyName}/>

          <ModalRoot transactionData={transactionData}
                     quote={quote} 
                     logo={logo} />
        </div>
    }

    return (
      <div className="stock-show">
        { ShowComponent }
      </div>
    )
  }
}

export default StockShow;
