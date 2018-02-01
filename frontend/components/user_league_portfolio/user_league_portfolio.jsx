import React from 'react';

import PortfolioHeader from './user_league_portfolio_header';
import StockIndex from '../stock_index/stock_index_container';

import { calcCashInvested } from '../../util/helper_functions';

class UserLeaguePortfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leagueData } = this.props;
    const transactionData = leagueData.transactionData;
    const { investedByTicker,
            totalCashInvested } = calcCashInvested(transactionData);

    return (
      <div className="league-portfolio">
        <PortfolioHeader cashInvested={totalCashInvested}
                         balance={leagueData.balance}
                         leagueName={leagueData.name} />

        <StockIndex transactionData={transactionData}
                    investedByTicker={investedByTicker} />
      </div>
    );
  }

}

export default UserLeaguePortfolio;
