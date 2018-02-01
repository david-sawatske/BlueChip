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
                              'sharesOwned': 'Shares Owned',
                              'searchLink': 'Get Stock Details' }

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
        const searchLink = { searchLink: <img className="logo" src={dataObj.logo.url} />};

        const toFilter = merge({}, searchLink, quote, investedByTicker[quote.symbol]);

        return (
         filterObject(toFilter, allowedKeys)
        )

      })

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
