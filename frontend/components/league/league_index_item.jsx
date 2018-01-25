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
            <input type="submit" value="Join League" />
          </form>
      } else {
        leagueIndexButton =
          <MastheadButtons hideModal={hideModal}
                           showModal={showModal}
                           formType={formType} />
      }

    return (
      <div className="league">
        <div className="league-title">
          <h1>{ leagueData.name }</h1>
          <h2>Starting Balance: {leagueData.startingBalance}</h2>
        </div>

        <div className="league-table">
          <h3>League Leaders</h3>
          <LeagueLeaderboard leagueUserData={ leagueData.leagueUserData } />
        </div>

        <div className="league-right">
          { leagueIndexButton }
        </div>
      </div>
    )
  }
}

export default LeagueIndexItem;
