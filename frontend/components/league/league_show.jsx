import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LeagueAtGlance from './league_at_glance';
import LeagueLeaderboard from './league_leaderboard';
import MastheadButtons from '../masthead/masthead_buttons';

import { calcLeagueGlance, numberToCurrency } from '../../util/helper_functions'

class LeagueShow extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createCashBalance({ user_id: this.props.currentUser.id,
                                   league_id: this.props.leagueData.id,
                                   balance: this.props.leagueData.startingBalance })
              .then(data => (
                this.props.requestTargetUserData(this.props.currentUser.id))
              );

  }



  render() {
    const { currentUserLeagueIds, leagueData, currentUser, setLeagueData,
            hideModal, showModal, formType } = this.props;
    const currencyStarting = numberToCurrency(leagueData.startingBalance);
    const atGlanceData = calcLeagueGlance(leagueData.leagueUserData);

    let leagueShowButton = null;
    if (currentUserLeagueIds && currentUserLeagueIds.includes(leagueData.id)) {
        leagueShowButton =
          <Link className="button" to={`/users/${currentUser.id}`}>
            View Your Leagues
          </Link>
      } else if (currentUser) {
        leagueShowButton =
          <form onSubmit={this.handleSubmit}>
            <input type="submit"
                   value="Join League"
                   className="button" />
          </form>
      } else {
        leagueShowButton =
          <MastheadButtons hideModal={hideModal}
                           showModal={showModal}
                           formType={formType} />
      }

    return (
      <div className="league-container">
        <button onClick={(e) => setLeagueData(null, "index-only", e)}>
          ← Return to League Index Grid
        </button>
        <div className="league">
          <div className="league-title">
            <h1>{ leagueData.name }</h1>

            <div className="starting-balance">
              <h3>Starting Balance:</h3>
              <h2>{ currencyStarting }</h2>
            </div>
          </div>

          <div className="league-table-container">
            <h2>League Leaders</h2>
            <LeagueLeaderboard leagueUserData={ leagueData.leagueUserData } />
          </div>

          <div className="league-right">
            { leagueShowButton }

            <LeagueAtGlance atGlanceData={atGlanceData}
                            leagueName={leagueData.name}
                            currencyStarting={currencyStarting} />
          </div>
        </div>
      </div>
    )
  }
}

export default LeagueShow;
