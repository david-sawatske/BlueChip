import React, { Component } from 'react';

const LeagueAtGlance = ({ atGlanceData, leagueName, currencyStarting }) => (
  <div className='league-data'>
    <h1>At a Glance</h1>
    <table>
      <tbody>
        <tr>
          <td>Starting Balance: </td>
          <td>{ currencyStarting }</td>
        </tr>

        <tr>
          <td>Number of Players: </td>
          <td>{ atGlanceData.numPlayers }</td>
        </tr>

        <tr>
          <td>Total Cash Available: </td>
          <td>{ atGlanceData.totalCashInvested }</td>
        </tr>

        <tr>
          <td>Total Equity Invested: </td>
          <td>{ atGlanceData.totalEquity }</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default LeagueAtGlance;
