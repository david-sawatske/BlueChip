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

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(transactData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="transaction-table">
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       initialSort="purchaseDay"
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataCurrency={isDataCurrency} />
      </div>
    )}
};

export default UserTransactions;
