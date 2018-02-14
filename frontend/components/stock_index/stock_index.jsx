import React from 'react';
import { NavLink } from 'react-router-dom';
import { merge } from 'lodash';

import StockShow from '../stock_show/stock_show';
import SortableTable from '../table/table';
import Loader from '../shared/loader';

import { filterObject } from '../../util/helper_functions';

class StockIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showTable: true,
                   clickedTicker: '' }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { ownedTickers } = this.props;

    if (ownedTickers) {
      this.props.requestStockSearch(ownedTickers)
    }
  }

  handleClick(quote, event) {
    event.preventDefault();

    this.setState({ clickedTicker: quote.symbol,
                    showTable: false })
  }

  closeStockShow(event) {
    event.preventDefault();

    this.setState({ clickedTicker: '',
                    showTable: true })
  }

  render() {
    const { remoteStockData, transactionData, showModal, hideModal,
            isRemoteStockLoading, currentUser, investedByTicker } = this.props;

    let TableComponent
    if ( isRemoteStockLoading ) {
      TableComponent = <Loader />
    } else if ( Object.keys(investedByTicker ) == 0) {
      TableComponent = <div className="no-transacitons">
                         <div className="overlay-data">
                           <h1>No Transactions</h1>
                           <NavLink className="button"
                                    to="/stocks/search">
                             Search Stocks to Trade
                           </NavLink>
                         </div>

                         <img src='http://res.cloudinary.com/sawatskeda10/image/upload/v1517851894/no_transactions_gabgil.jpg'
                         alt='no-transacitons'/>
                       </div>

    } else if (Object.keys(remoteStockData) != 0 && this.state.showTable) {
      const tableHeadings = { 'companyName': 'Company',
                              'symbol': 'Symbol',
                              'latestPrice': 'Current Price',
                              'invested': 'Total Invested',
                              'sharesOwned': 'Shares Owned',
                              'searchLink': 'Click Logo for More Data' }



      const isDataSotable = { 'companyName': true,
                              'symbol': true,
                              'latestPrice': true,
                              'invested': true,
                              'sharesOwned': true }

      const isDataCurrency = { 'invested': true };
      const isDataInteger = { 'sharesOwned': true };
      const isDataPercent = { };
      const isDataDate = { };
      const sideHeadings = { };

      const allowedKeys = Object.keys(tableHeadings);

      const tableData = Object.keys(investedByTicker).map(ticker => {
        const remoteData = remoteStockData[ticker];
        const quote = remoteData.quote;

        const searchLink = { searchLink: <img className="logo"
                                              src={remoteData.logo.url}
                                              onClick={ (e) =>
                                                this.handleClick(quote, e) }
                                         />
                           };
        const toFilter = merge( {}, searchLink, quote,
                                investedByTicker[quote.symbol] );

        return (
         filterObject(toFilter, allowedKeys)
        )
      })

      TableComponent = <SortableTable dataArr={tableData}
                                      isDataDate={isDataDate}
                                      sideHeadings={sideHeadings}
                                      tableHeadings={tableHeadings}
                                      isDataSotable={isDataSotable}
                                      isDataPercent={isDataPercent}
                                      isDataInteger={isDataInteger}
                                      isDataCurrency={isDataCurrency}
                                      initialSort="symbol" />

    }

    let StockShowComponent
    if (this.state.clickedTicker) {
      const tkr = this.state.clickedTicker;
      StockShowComponent = <div>
                             <button onClick={ (e) => this.closeStockShow(e) }>
                               Return to Transactions
                             </button>
                             <StockShow remoteStockData={remoteStockData[tkr]}
                                        transactionData={transactionData[tkr]}
                                        showModal={showModal}
                                        hideModal={hideModal} />
                           </div>
    }

    return (
      <div className="stock-index-table">
        { StockShowComponent }
        { TableComponent }
      </div>
    )
  }
}

export default StockIndex;
