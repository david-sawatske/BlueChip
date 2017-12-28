import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueIndexItem from './league_index_item'

class LeagueIndex extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestAllLeagues().then(data => {
      if (this.props.currentUser) {
        this.props.requestTargetUserData(this.props.currentUser.id)
      }
    })
  }

  render() {
    const { leagueIds, leagueData, currentUser, createCashBalance,
            currentUserLeagueIds } = this.props;

    return (
      <div className="">
        <h1 className="">All Leagues</h1>
        <ul className="">
          {Object.keys(leagueData).map(leagueId => (
            <LeagueIndexItem currentUserLeagueIds={currentUserLeagueIds}
                             createCashBalance={createCashBalance}
                             league={leagueData[leagueId]}
                             currentUser={currentUser}
                             key={leagueId}/>
          ))}
        </ul>
      </div>
    );
  }
}

export default LeagueIndex;
