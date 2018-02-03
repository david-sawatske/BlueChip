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

    const isDataCurrency = { 'username': false,
                             'cashBalance': true,
                             'cashInvested': true,
                             'totalEquity': true }

    const isDataDate = { 'username': false,
                         'cashBalance': false,
                         'cashInvested': false,
                         'totalEquity': false }

    const allowedKeys = Object.keys(tableHeadings)
    const tableData = Object.values(leagueUserData).map(dataObj => (
       filterObject(dataObj, allowedKeys))
    )

    return (
      <div className="leaderboard">
        <SortableTable dataArr={tableData}
                       isDataDate={isDataDate}
                       tableHeadings={tableHeadings}
                       isDataCurrency={isDataCurrency}
                       initialSort="totalEquity"
                       ranked={true} />
      </div>
    )}
  }

export default LeagueLeaderboard;
