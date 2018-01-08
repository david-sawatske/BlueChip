import React from 'react';
import { Route } from 'react-router-dom';

const UserLeagueIndex = ({ userLeagueData, currentUser }) => (
  <div className="">
    <ul>
      {Object.values(userLeagueData).map(league =>
        <h1>{ league.leagueId }</h1>
      )}
    </ul>
  </div>
);

export default UserLeagueIndex;
