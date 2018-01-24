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
                            'Symbol': 'Stock' }

    const isDataCurrency = { 'purchaseDay': false,
                             'sharePrice': true,
                             'shareQuant': false,
                             'Symbol': false }

    const isDataDate = { 'purchaseDay': true,
                         'sharePrice': false,
                         'shareQuant': false,
                         'Symbol': false }

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(transactData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="transaction-data">
        <h1>Transaction History</h1>
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       tableHeadings={tableHeadings}
                       isDataCurrency={isDataCurrency}/>
      </div>
    )}
};

export default UserTransactions;
