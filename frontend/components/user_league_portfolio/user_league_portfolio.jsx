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
    const { transactionData } = leagueData;
    const { investedByTicker,
            totalCashInvested } = calcCashInvested(transactionData);

    return (
      <div className="league-portfolio">
        <PortfolioHeader balance={leagueData.balance}
                         leagueName={leagueData.name}
                         leagueClass="user-stock-header"
                         cashInvested={totalCashInvested} />

        <StockIndex transactionData={transactionData}
                    investedByTicker={investedByTicker} />
      </div>
    );
  }
}

export default UserLeaguePortfolio;
