import React from 'react';

import { numberToCurrency } from '../../util/helper_functions'

const PortfolioHeader = ({ balance, cashInvested, leagueName, leagueClass }) => (
  <div className={leagueClass}>
    <h1>{leagueName}</h1>
    <h4>Currently Owned Stocks</h4>
    <h3>Cash Available:</h3> <h2>{numberToCurrency(balance)}</h2>
    <br/>
    <h3>Cash Invested:</h3> <h2>{numberToCurrency(cashInvested)}</h2>
  </div>
);

export default PortfolioHeader;
