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

    let ShowComponent
    if (userLeagueData[targetLeagueId]) {
      const targetLeague = userLeagueData[targetLeagueId];

      ShowComponent = <UserLeaguePortfolio key={targetLeague.leagueId}
                                           leagueData={targetLeague} />
    } else {
      ShowComponent = <h3>Select a League to View</h3>
    }

    return (
      <div className="user-league-index">
        <ul className="joined-leagues">
          {Object.values(userLeagueData).map(league => {
            const cashInvested = calcCashInvested(league.transactionData);

            return (
              <div onClick={(e) => this.setShowLeague(e, league.leagueId)}
                   key={league.leagueId} >

                <PortfolioHeader cashInvested={cashInvested}
                                 balance={league.balance}
                                 leagueName={league.name} />
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
