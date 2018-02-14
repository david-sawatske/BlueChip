import React from 'react';

import SortableTable from '../table/table';

import { filterObject } from '../../util/helper_functions'

class PeerData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { peerData } = this.props;

    const tableHeadings = { 'symbol': 'Symbol',
                            'change': 'Change',
                            'changePercent': 'Change Percent',
                            'latestPrice': 'Last',
                            'latestVolume': 'Volume',
                            'marketCap': 'Market Cap' }

    const isDataCurrency = { 'symbol': false,
                             'change': false,
                             'changePercent': false,
                             'latestPrice': true,
                             'latestVolume': false,
                             'marketCap': false }

    const isDataDate = { 'symbol': false,
                         'change': false,
                         'changePercent': false,
                         'latestPrice': false,
                         'latestVolume': false,
                         'marketCap': false }

    const isDataSotable = { 'symbol': true,
                            'change': true,
                            'changePercent': true,
                            'latestPrice': true,
                            'latestVolume': true,
                            'marketCap': true }

  const sideHeadings = { }

  const allowedKeys = Object.keys(tableHeadings)
  const tableData = Object.values(peerData).map(dataObj => (
     filterObject(dataObj.quote, allowedKeys))
  )
console.log(tableData);
    return (
      <div className="peer-data">
        <h1>TEST</h1>

        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       sideHeadings={sideHeadings}
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataCurrency={isDataCurrency}
                       initialSort="symbol"
                       ranked={false} />

      </div>
    );
  }

}

export default PeerData;
