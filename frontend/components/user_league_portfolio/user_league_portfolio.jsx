import React from 'react';

import UserLeaguePortfolioHeader from './user_league_portfolio_header';

class UserLeaguePortfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  calcCashInvested(remoteStockData) {
    let cashInvested = 0;

    Object.values(remoteStockData).map(allTransact => {
      Object.values(allTransact).map( transaction => {
        cashInvested += (transaction.shareQuant * transaction.sharePrice)
      })
    })

    return cashInvested
  }

  render() {
    const { leagueData } = this.props;
    const remoteStockData = leagueData.remoteStockData;

    const cashInvested = this.calcCashInvested(leagueData.remoteStockData);

    return (
      <div className="">
        <UserLeaguePortfolioHeader cashInvested={cashInvested}
                                   balance={leagueData.balance}
                                   leagueName={leagueData.name} />
      </div>
    );
  }

}

export default UserLeaguePortfolio;
