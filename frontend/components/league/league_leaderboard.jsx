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

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(leagueUserData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="leaderboard">
        <SortableTable ranked={true}
                       dataArr={tableData}
                       initialSort="totalEquity"
                       tableHeadings={tableHeadings}
                       isDataSotable={isDataSotable}
                       isDataCurrency={isDataCurrency} />
      </div>
    )}
  }

export default LeagueLeaderboard;
