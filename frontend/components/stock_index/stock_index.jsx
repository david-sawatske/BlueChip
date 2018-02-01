import React from 'react';
import { merge } from 'lodash';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

import SortableTable from '../table/table';

import { filterObject } from '../../util/helper_functions';


class StockIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { ownedTickers } = this.props;

    if (ownedTickers) {
      this.props.requestStockSearch(ownedTickers)
    }
  }

  render() {
    const { remoteStockData, transactionData, showModal, hideModal,
            isRemoteStockLoading, currentUser, investedByTicker } = this.props;

    let ShowComponent
    if ( isRemoteStockLoading ) {
      ShowComponent = <Loader />
    } else if (Object.keys(remoteStockData) != 0) {

      const tableHeadings = { 'companyName': 'Company',
                              'symbol': 'Symbol',
                              'latestPrice': 'Current Price',
                              'invested': 'Total Invested',
                              'sharesOwned': 'Shares Owned' }

      const isDataCurrency = { 'companyName': false,
                               'symbol': false,
                               'latestPrice': true,
                               'invested': true,
                               'sharesOwned': false }

      const isDataDate = { 'companyName': false,
                           'symbol': false,
                           'latestPrice': false,
                           'invested': false,
                           'sharesOwned': false }

      const allowedKeys = Object.keys(tableHeadings)

      const tableData = Object.values(remoteStockData).map(dataObj => {
        const quote = dataObj.quote;
        const toFilter = merge({}, quote, investedByTicker[quote.symbol]);

        return (
         filterObject(toFilter, allowedKeys)
        )
      })

  /// send in an <a> tag with `onClick` to show modal of StockShow

    
    ShowComponent = <SortableTable dataArr={tableData}
                                   isDataDate={isDataDate}
                                   tableHeadings={tableHeadings}
                                   isDataCurrency={isDataCurrency}
                                   initialSort="symbol" />

    }

    return (
      <div className="">
        { ShowComponent }
      </div>
    )
  }
}

export default StockIndex;
