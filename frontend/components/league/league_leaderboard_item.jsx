import React from 'react';

import { numberToCurrency } from '../../util/helper_functions';

const LeagueLeaderboardItem = ({ user, rank }) => {
  const netCashInvested = numberToCurrency( user.cashInvested +
                                            user.cashBalance );
  return (
    <div className='user-data'>
      <h3>{rank}.</h3>
      <h3>{user.username} </h3>
      <h3>{netCashInvested}</h3>
      <div id='stats'>
        Cash Invested: { numberToCurrency(user.cashInvested) } <br/>
        Available Cash: { numberToCurrency(user.cashBalance) }
      </div>
    </div>
  )};

export default LeagueLeaderboardItem;
