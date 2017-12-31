import React from 'react';

const StockSummary = ({ quote }) => (
  <div>
    <h3>Stock Summary</h3>
    <table>
      <tbody>
        <tr>
          <td>Avg Total Volume</td>
          <td>{quote.avgTotalVolume}</td>
        </tr>
        <tr>
          <td>Latest Volume</td>
          <td>{quote.latestVolume}</td>
        </tr>
        <tr>
          <td>P/E Ratio</td>
          <td>{quote.peRatio}</td>
        </tr>
        <tr>
          <td>Market Cap</td>
          <td>{(quote.marketCap / 1000000000).toFixed(3).toString()}</td>
        </tr>
        <tr>
          <td>52 Week High</td>
          <td>{quote.week52High}</td>
        </tr>
        <tr>
          <td>52 Week Low</td>
          <td>{quote.week52Low}</td>
        </tr>
        <tr>
          <td>YTD Change</td>
          <td>{(quote.ytdChange * 100).toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default StockSummary;
