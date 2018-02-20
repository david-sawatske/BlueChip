import React from 'react';

import { numAbbr, numberToCurrency, camelToTitle,
         numToPercent } from '../../util/helper_functions'

class StockSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const quote = this.props.quote;
    const tableData = { ["Ave Total Volume"]: numAbbr(quote.avgTotalVolume),
                        ["Latest Volume"]: numAbbr(quote.latestVolume),
                        ["P/E Ratio"]: quote.peRatio,
                        ["Market Cap"]: numAbbr(quote.marketCap),
                        ["52 Week High"]: numberToCurrency(quote.week52High),
                        ["52 Week Low"]: numberToCurrency(quote.week52Low),
                        ["YTD Change"]: numToPercent(quote.ytdChange) }

    return (
      <div className="stock-summary">
        <h2>Stock Summary</h2>
        <table>
          <tbody>
            { Object.keys(tableData).map((sideHead, idx) => (
              <tr key={idx}>
                <td className="side-head">{sideHead}</td>
                <td>{ tableData[sideHead] }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StockSummary;
