import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LeagueLeaderboard from './league_leaderboard';

class LeagueIndexItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { league } = this.props;
    const leagueUserData = league.leagueUserData;
    
    return (
      <div className="">
        <h2>{league.name}</h2>
        <h4>Starting Balance: {league.startingBalance}</h4>
        <h4>League Leaders</h4>
        <LeagueLeaderboard leagueUserData={leagueUserData}/>
      </div>
    )
  }
}

export default LeagueIndexItem;
