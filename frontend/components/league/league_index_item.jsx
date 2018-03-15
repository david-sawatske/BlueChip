import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const LeagueIndexItem = ({ leagueData }) => (
  <div className="grid-item">
    <h1>{ leagueData.name }</h1>
    <h2>Starting Balance: {leagueData.startingBalance}</h2>
  </div>
)

export default LeagueIndexItem;
