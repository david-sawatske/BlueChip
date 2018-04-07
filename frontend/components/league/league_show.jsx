import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LeagueAtGlance from './league_at_glance';
import LeagueLeaderboard from './league_leaderboard';
import MastheadButtons from '../masthead/masthead_buttons';

import { numberToCurrency } from '../../util/helper_functions'

class LeagueShow extends Component {
  constructor(props) {
    super(props)

    this.calcLeagueGlance = this.calcLeagueGlance.bind(this);
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

  calcLeagueGlance(leagueUserData) {
    const glanceData = { numPlayers: 0,
                         totalEquity: 0,
                         totalCashInvested: 0 }

    leagueUserData.map(player => {
      glanceData['numPlayers'] += 1;
      glanceData['totalEquity'] += player.totalEquity;
      glanceData['totalCashInvested'] += player.cashInvested;
    })

    glanceData['totalEquity'] = numberToCurrency(glanceData['totalEquity'])
    glanceData['totalCashInvested'] = numberToCurrency(glanceData['totalCashInvested'])

    return glanceData
  }

  render() {
    const { currentUserLeagueIds, leagueData, currentUser, setLeagueData,
            hideModal, showModal, formType } = this.props;
    const currencyStarting = numberToCurrency(leagueData.startingBalance);
    const atGlanceData = this.calcLeagueGlance(leagueData.leagueUserData);

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
