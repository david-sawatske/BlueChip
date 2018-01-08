import React from 'react';
import { Route } from 'react-router-dom';

import UserLeaguePortfolio from '../user_league_portfolio/user_league_portfolio'

const UserLeagueIndex = ({ userLeagueData, currentUser }) => (
  <div className="">
    <ul>
      {Object.values(userLeagueData).map(league =>
        <UserLeaguePortfolio
          key={league.leagueId}
          leagueData={league}
          currentUser={currentUser}/>
      )}
    </ul>
  </div>
);

export default UserLeagueIndex;
