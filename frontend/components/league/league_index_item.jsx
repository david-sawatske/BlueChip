import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LeagueLeaderboard from './league_leaderboard';
import MastheadButtons from '../masthead/masthead_buttons';

class LeagueIndexItem extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createCashBalance({ user_id: this.props.currentUser.id,
                                   league_id: this.props.league.id,
                                   balance: this.props.league.startingBalance })
  }


  render() {
    const { league, currentUserLeagueIds, currentUser } = this.props;
    const leagueUserData = league.leagueUserData;

    let leagueIndexButton = null;
    if (currentUserLeagueIds && currentUserLeagueIds.includes(league.id)) {
        leagueIndexButton =
          <Link className="league-join-button" to={`/users/${currentUser.id}`}>
            View Your Leagues
          </Link>
      } else if (currentUser) {
        leagueIndexButton =
          <form onSubmit={this.handleSubmit}>
            <input className="league-join-button" type="submit" value="Join League" />
          </form>
      } else {
        leagueIndexButton =
          <MastheadButtons />
      }

    return (
      <div className="">
        <h2>{league.name}</h2>
        <h4>Starting Balance: {league.startingBalance}</h4>
        <h4>League Leaders</h4>
        <LeagueLeaderboard leagueUserData={leagueUserData}/>
        { leagueIndexButton }
      </div>
    )
  }
}

export default LeagueIndexItem;
