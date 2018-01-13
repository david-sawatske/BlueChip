import React from 'react';
import { Link } from 'react-router-dom';

import SortableTable from '../table/table_body';

class LeagueLeaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leagueUserData } = this.props;

    return (
      <div className="">
        <SortableTable dataArr={leagueUserData}/>
      </div>
    )}
  }

export default LeagueLeaderboard;
