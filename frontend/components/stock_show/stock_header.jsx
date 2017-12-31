import React from 'react';

class StockHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote } = this.props;
    const change = quote.change;
    const percent = (quote.changePercent * 100).toFixed(2);

    const showSign = num => (
      (num > 0 ? '+' : '')
    )

    return (
      <div>
        <h3>{quote.companyName} ({quote.symbol})</h3>
        <h2>{quote.latestPrice}</h2>
        <h3>Change: {showSign(change)}{change}</h3>
        <h3>Percent Change: ({showSign(percent)}{percent}%)</h3>
        <h5>{quote.latestSource} as of {quote.latestTime}</h5>
      </div>
    )
  }
};

export default StockHeader;
