import React from 'react';

import SortableTable from '../table/table';

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
                            'league': 'League' }

    const isDataSotable = { 'purchaseDay': true,
                            'sharePrice': true,
                            'shareQuant': true,
                            'league': true }

    const isDataCurrency = { 'sharePrice': true };
    const isDataDate = { 'purchaseDay': true };

    const isDataPercent = { };
    const isDataInteger = { };
    const sideHeadings = { };

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(transactData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="transaction-data">
        <h1>Transaction History</h1>
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       sideHeadings={sideHeadings}
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataPercent={isDataPercent}
                       isDataInteger={isDataInteger}
                       isDataCurrency={isDataCurrency}
                       initialSort="purchaseDay" />
      </div>
    )}
};

export default UserTransactions;
