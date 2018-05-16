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
                            'changePercent': 'Change %',
                            'latestPrice': 'Last',
                            'latestVolume': 'Volume',
                            'marketCap': 'Market Cap' }

    const isDataSotable = { 'symbol': true,
                            'change': true,
                            'changePercent': true,
                            'latestPrice': true,
                            'latestVolume': true,
                            'marketCap': true }

    const isDataInteger = { 'latestVolume': true,
                            'marketCap': true }

    const isDataCurrency = { latestPrice: true };
    const isDataPercent = { 'changePercent': true };

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(peerData).map(dataObj => (
                              filterObject(dataObj.quote, allowedKeys)))
                            .slice(0, 4)

    return (
      <div className="peer-data">
        <h2>Peer Data</h2>
        <SortableTable ranked={false}
                       dataArr={tableData}
                       initialSort="symbol"
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataPercent={isDataPercent}
                       isDataInteger={isDataInteger}
                       isDataCurrency={isDataCurrency} />

      </div>
    );
  }
}

export default PeerData;
