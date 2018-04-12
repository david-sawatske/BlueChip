import React from 'react';
import { Route } from 'react-router-dom';

import UserLeaguePortfolio from '../user_league_portfolio/user_league_portfolio';
import PortfolioHeader from '../user_league_portfolio/user_league_portfolio_header';

import { calcCashInvested } from '../../util/helper_functions';

class UserLeagueIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { targetLeagueId: this.props.sampleLeagueId }
  }

  setShowLeague(e, leagueId) {
    e.preventDefault();

    this.setState({ targetLeagueId: leagueId })
  }

  render() {
    const { userLeagueData } = this.props;
    const targetLeagueId = this.state.targetLeagueId;
    const targetLeague = userLeagueData[targetLeagueId];

    let ShowComponent
    if (!$.isEmptyObject(targetLeague['transactionData'])) {
      ShowComponent = <UserLeaguePortfolio key={targetLeague.leagueId}
                                           leagueData={targetLeague} />
    }

    return (
      <div className="user-league-index">
        <ul className="joined-leagues">
          {Object.values(userLeagueData).map(league => {
            const { transactionData, balance, name, leagueId } = league;
            const cashInvested = calcCashInvested(transactionData);

            const leagueClass = (leagueId == this.state.targetLeagueId)
                                  ? "league-data-active"
                                  : "league-data";

            return (
              <div onClick={(e) => this.setShowLeague(e, leagueId)}
                   key={leagueId} >

                <PortfolioHeader cashInvested={cashInvested.totalCashInvested}
                                 leagueClass={leagueClass}
                                 balance={balance}
                                 leagueName={name} />
              </div>
            )
          })}
        </ul>

        { ShowComponent }
      </div>
    )
  }
};

export default UserLeagueIndex;
