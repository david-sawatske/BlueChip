import React from 'react';

import PeerData from './peer_data';
import StockChart from './stock_chart';
import CompanyData from './company_data';
import StockHeader from './stock_header';
import StockSummary from './stock_summary';
import StockNews from './stock_news_index';
import EarningsTable from './earnings_table';
import FinancialsTable from './financials_table';
import UserTransactions from './user_transaction_index';
import ModalRoot from  '../modal/modal_root_container';

import { numAbbr } from '../../util/helper_functions'

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, interval, showModal, hideModal,
            transactionData, peerData } = this.props;
    const transactArray = (transactionData) ? Object.values(transactionData)
                                               :
                                              [];

    let TransactionComponent
    if (transactArray.length > 0) {
      TransactionComponent = <UserTransactions transactData={transactArray} />
    }

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company, stats, news,
              earnings, financials } = remoteStockData;
      const { float, revenuePerEmployee, revenue } = stats;

      const companyData = {
              description: company.description,
              website: company.website,
              tableData: { float: numAbbr(float),
                           exchange: company.exchange,
                           sector: company.sector,
                           industry: company.industry,
                           sharesOutstanding: numAbbr(stats.sharesOutstanding),
                           numberOfEmployees: ( numAbbr(revenue / revenuePerEmployee) )}
            }

      ShowComponent =
        <div className="stock-data">
          <StockHeader quote={quote}
                       logo={logo} />

          <CompanyData companyData={companyData} />

          <PeerData peerData={peerData} />

          <div className="summary-transaction">
            <StockSummary quote={quote} />

            <div className="transaction-data">
              { TransactionComponent }

              <button className="transaction-button" onClick={ () =>
                showModal('transaction', { modalOpen: true }) }>
                Buy/Sell this stock
              </button>
            </div>
          </div>

          <div className="chart-earnings">
            <StockChart chart={chart}
                        interval={interval}
                        companyName={quote.companyName}/>

            <EarningsTable earnings={earnings.earnings} />
          </div>

          <StockNews news={news}
                     companyName={quote.companyName}/>

          <FinancialsTable financials={financials.financials} />

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
