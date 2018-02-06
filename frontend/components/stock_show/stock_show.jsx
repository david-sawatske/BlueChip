import React from 'react';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';
import StockNews from './stock_news_index';
import UserTransactions from './user_transaction_index';
import ModalRoot from  '../modal/modal_root_container';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, interval, showModal, hideModal,
            transactionData } = this.props;

    let TransactionComponent
    if (transactionData) {
      const transactArray = Object.values(transactionData);

      TransactionComponent = <UserTransactions transactData={transactArray} />
    }

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company,
              stats, news, currentUser } = remoteStockData;

      const { float, revenuePerEmployee, revenue } = stats;

      const employees = ( revenue / revenuePerEmployee )

      ShowComponent =
        <div className="stock-data">

          <StockHeader quote={quote}
                       logo={logo} />

          <div className="side-data">
            { TransactionComponent }

            <button className="transaction-button" onClick={ () =>
              showModal('transaction', { modalOpen: true }) }>
              Buy/Sell this stock
            </button>
          </div>

          <CompanyData company={company}
                       float={float}
                       employees={employees}/>
          <div className="mid-data">
            <StockSummary quote={quote} />

            <StockChart chart={chart}
                        interval={interval}
                        companyName={quote.companyName}/>
          </div>

          <StockNews news={news}
                     companyName={quote.companyName}/>

          <ModalRoot quote={quote}
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
