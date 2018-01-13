import React from 'react';
import { Link } from 'react-router-dom';

import SortableTable from '../table/table_body';

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

    return (
      <div className="">
        <SortableTable dataArr={leagueUserData}
                       tableHeadings={tableHeadings}
                       isDataCurrency={isDataCurrency}/>
      </div>
    )}
  }

export default LeagueLeaderboard;
