import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueIndexItem from './league_index_item'

class LeagueIndex extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestAllLeagues()

    if (this.props.currentUser) {
      this.props.requestTargetUserData(this.props.currentUser.id)
    }
  }

  render() {
    const { leagueIds, leaguesById } = this.props;

    return (
      <div className="">
      {leagueIds.map(leagueId => (
        <LeagueIndexItem leagueId={leagueId}
                         leaguesById={leaguesById}
                         key={leagueId}/>
      ))}
      </div>
    );
  }
}

export default LeagueIndex;
