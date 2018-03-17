import React from 'react';
import { Link } from 'react-router-dom';

import SortableTable from '../table/table';

import { filterObject } from '../../util/helper_functions'

class LeagueLeaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leagueUserData } = this.props;
    const tableHeadings = { 'username': 'Username',
                            'cashBalance': 'Cash Balance',
                            'cashInvested': 'Cash Invested',
                            'totalEquity': 'Total Equity' }

    const isDataSotable = { 'username': true,
                            'cashBalance': true,
                            'cashInvested': true,
                            'totalEquity': true }

    const isDataCurrency = { 'cashBalance': true,
                             'cashInvested': true,
                             'totalEquity': true }

    const isDataInteger = { };
    const isDataPercent = { };
    const isDataDate = { };
    const sideHeadings = { };

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(leagueUserData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="leaderboard">
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       sideHeadings={sideHeadings}
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataPercent={isDataPercent}
                       isDataInteger={isDataInteger}
                       isDataCurrency={isDataCurrency}
                       initialSort="totalEquity"
                       ranked={true} />
      </div>
    )}
  }

export default LeagueLeaderboard;
