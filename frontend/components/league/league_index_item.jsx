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
                                   league_id: this.props.leagueData.id,
                                   balance: this.props.leagueData.startingBalance })
      .then(data => this.props.requestTargetUserData(this.props.currentUser.id));

  }

  render() {
    const { currentUserLeagueIds, leagueData, currentUser,
            hideModal, showModal, formType } = this.props;

    let leagueIndexButton = null;
    if (currentUserLeagueIds && currentUserLeagueIds.includes(leagueData.id)) {
        leagueIndexButton =
          <Link className="" to={`/users/${currentUser.id}`}>
            View Your Leagues
          </Link>
      } else if (currentUser) {
        leagueIndexButton =
          <form onSubmit={this.handleSubmit}>
            <input className="league-join-button" type="submit" value="Join League" />
          </form>
      } else {
        leagueIndexButton =
          <MastheadButtons hideModal={hideModal}
                           showModal={showModal}
                           formType={formType} />
      }

    return (
      <div className="">
        <h2>{leagueData.name}</h2>
        <h4>Starting Balance: {leagueData.startingBalance}</h4>
        <h4>League Leaders</h4>
        <LeagueLeaderboard leagueUserData={ leagueData.leagueUserData } />
        { leagueIndexButton }
      </div>
    )
  }
}

export default LeagueIndexItem;
