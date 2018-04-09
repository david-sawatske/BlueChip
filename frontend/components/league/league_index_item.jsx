import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LeagueAtGlance from './league_at_glance';

import { calcLeagueGlance, numberToCurrency } from '../../util/helper_functions'

const LeagueIndexItem = ({ leagueData, setLeagueData }) => {
  const { id, name, startingBalance, leagueUserData } = leagueData;

  const atGlanceData = calcLeagueGlance(leagueUserData);
  const currencyStarting = numberToCurrency(leagueData.startingBalance);

  return (
    <div className="grid-item"
         onClick={ (e) => setLeagueData(id, "league-show", e) } >
      <h1>{ name }</h1>
      <LeagueAtGlance atGlanceData={atGlanceData}
                      leagueName={leagueData.name}
                      currencyStarting={currencyStarting} />
    </div>
  )
}

export default LeagueIndexItem;
