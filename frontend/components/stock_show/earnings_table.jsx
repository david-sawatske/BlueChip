import React from 'react';
import { merge } from 'lodash';

import SortableTable from '../table/table'

import { filterObject } from '../../util/helper_functions';

class EarningsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { earnings } = this.props;

    const isDataCurrency = { };
    const isDataDate = { };
    const isDataSotable = { };

    const tableHeadings = {}
    earnings.map(qData => {
      const fiscalPeriod = qData.fiscalPeriod;
      tableHeadings[fiscalPeriod] = fiscalPeriod;
    })
    const sideHeadings = { ['actualEPS']: 'Actual EPS',
                           ['estimatedEPS']: 'Estimated EPS',
                           ['EPSSurpriseDollar']: 'EPS Surprise (dollar)',
                           ['numberOfEstimates']: 'Number of Estimates' };

    const sideKeys = Object.keys(sideHeadings)

    const tableData = Object.keys(sideHeadings).map(key => (
                        {[key]: sideHeadings[key]})
                      )

    Object.values(earnings).map((qObj, idx) => {
      if ( idx < tableData.length ){
        Object.keys(tableHeadings).map((key, idx2) => {
          const sideKey = sideKeys[idx]

          tableData[idx] = merge(tableData[idx], {[key]: earnings[idx2][sideKey]})
        })
      }
    })

    return (
    <div className ="earnings-table">
      <h1>Earnings</h1>
      <SortableTable dataArr={tableData}
                     isDataDate={isDataDate}
                     sideHeadings={sideHeadings}
                     tableHeadings={tableHeadings}
                     isDataSotable={isDataSotable}
                     isDataCurrency={isDataCurrency}
                     initialSort=""
                     ranked={false} />

      </div>
    )
  }
};

export default EarningsTable;
