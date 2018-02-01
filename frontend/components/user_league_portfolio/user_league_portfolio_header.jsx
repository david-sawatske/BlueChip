import React from 'react';

import { numberToCurrency } from '../../util/helper_functions'

const PortfolioHeader = ({ balance, cashInvested, leagueName, leagueClass }) => (
  <div className={leagueClass}>
    <h1>{leagueName}</h1>
    <h3>Cash Available: {numberToCurrency(balance)}</h3>
    <h3>Cash Invested: {numberToCurrency(cashInvested)}</h3>
  </div>
);

export default PortfolioHeader;
