import React from 'react';

import SortableTable from '../table/table'

import { filterObject } from '../../util/helper_functions'
import { numberToCurrency } from '../../util/helper_functions';

class UserTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactData } = this.props;

    const tableHeadings = { 'purchaseDay': 'Date',
                            'sharePrice': 'Price',
                            'shareQuant': 'Quantitiy',
                            'symbol': 'Stock' }

    const isDataCurrency = { 'purchaseDay': false,
                             'sharePrice': true,
                             'shareQuant': false,
                             'symbol': false }

    const isDataDate = { 'purchaseDay': true,
                         'sharePrice': false,
                         'shareQuant': false,
                         'symbol': false }

    const isDataSotable = { 'purchaseDay': true,
                            'sharePrice': false,
                            'shareQuant': false,
                            'symbol': false }

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(transactData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="transaction-data">
        <h1>Transaction History</h1>
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       isDataSotable={isDataSotable}
                       tableHeadings={tableHeadings}
                       isDataCurrency={isDataCurrency}/>
      </div>
    )}
};

export default UserTransactions;
