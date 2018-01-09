import React from 'react';

import UserLeaguePortfolioHeader from './user_league_portfolio_header';
import StockIndex from '../stock_index/stock_index_container';

class UserLeaguePortfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  calcCashInvested(transactionData) {
    let cashInvested = 0;

    Object.values(transactionData).map(allTransact => {
      Object.values(allTransact).map( transaction => {
        cashInvested += (transaction.shareQuant * transaction.sharePrice)
      })
    })

    return cashInvested
  }

  render() {
    const { leagueData, currentUser } = this.props;
    const transactionData = leagueData.transactionData;
    const cashInvested = this.calcCashInvested(leagueData.transactionData);

    return (
      <div className="">
        <UserLeaguePortfolioHeader cashInvested={cashInvested}
                                   balance={leagueData.balance}
                                   leagueName={leagueData.name} />

        <StockIndex transactionData={transactionData} />
      </div>
    );
  }

}

export default UserLeaguePortfolio;
