import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LeagueIndexItem = ({ leagueData, setLeagueData }) => {
  const { id, name, startingBalance } = leagueData;

  return (
    <div className="grid-item"
         onClick={ (e) => setLeagueData(id, "league-show", e) } >
      <h1>{ name }</h1>
      <h2>Starting Balance: { startingBalance }</h2>
    </div>
  )
}

export default LeagueIndexItem;
