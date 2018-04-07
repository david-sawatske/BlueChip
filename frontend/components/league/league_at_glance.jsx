import React, { Component } from 'react';

const LeagueAtGlance = ({ atGlanceData, leagueName, currencyStarting }) => (
  <div className='league-data'>
    <h1>{ leagueName }, at a Glance </h1>
    <table>
      <tr>
        <td>Starting Cash: </td>
        <td>{ currencyStarting }</td>
      </tr>

      <tr>
        <td>Number of Players: </td>
        <td>  { atGlanceData.numPlayers }</td>
      </tr>

      <tr>
        <td>Total Cash Invested: </td>
        <td>{ atGlanceData.totalCashInvested }</td>
      </tr>

      <tr>
        <td>Total Equity Invested: </td>
        <td>{ atGlanceData.totalEquity }</td>
      </tr>
    </table>
  </div>
);

export default LeagueAtGlance;
