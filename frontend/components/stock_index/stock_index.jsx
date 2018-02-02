import React from 'react';
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

  handleClick(dataObj, event) {
    event.preventDefault();

    this.setState({ clickedTicker: dataObj.quote.symbol,
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
    } else if (Object.keys(remoteStockData) != 0 && this.state.showTable) {

      const tableHeadings = { 'companyName': 'Company',
                              'symbol': 'Symbol',
                              'latestPrice': 'Current Price',
                              'invested': 'Total Invested',
                              'sharesOwned': 'Shares Owned',
                              'searchLink': 'Click Logo for More Data' }

      const isDataCurrency = { 'companyName': false,
                               'symbol': false,
                               'latestPrice': true,
                               'invested': true,
                               'sharesOwned': false,
                               'searchLink': false }

      const isDataDate = { 'companyName': false,
                           'symbol': false,
                           'latestPrice': false,
                           'invested': false,
                           'sharesOwned': false,
                           'searchLink': false }

      const allowedKeys = Object.keys(tableHeadings)

      const tableData = Object.values(remoteStockData).map(dataObj => {
        const quote = dataObj.quote;
        const searchLink = { searchLink: <img className="logo"
                                              src={dataObj.logo.url}
                                              onClick={ (e) =>
                                                this.handleClick(dataObj, e) }
                                         />};

        const toFilter = merge( {}, searchLink, quote,
                                investedByTicker[quote.symbol] );

        return (
         filterObject(toFilter, allowedKeys)
        )

      })

      TableComponent = <SortableTable dataArr={tableData}
                                      isDataDate={isDataDate}
                                      tableHeadings={tableHeadings}
                                      isDataCurrency={isDataCurrency}
                                      initialSort="symbol" />

    }

    let StockShowComponent
    if (this.state.clickedTicker) {
      const tkr = this.state.clickedTicker;
      StockShowComponent = <div>
                             <button className=""
                                     onClick={ (e) => this.closeStockShow(e) }>
                               Return to Transactions
                             </button>
                             <StockShow remoteStockData={remoteStockData[tkr]}
                                        showModal={showModal}
                                        hideModal={hideModal} />
                           </div>
    }

    return (
      <div className="">
        { StockShowComponent }
        { TableComponent }
      </div>
    )
  }
}

export default StockIndex;
