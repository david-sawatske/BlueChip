import React from 'react';

class StockHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote, logo } = this.props;
    const change = quote.change;
    const percent = (quote.changePercent * 100).toFixed(2);

    const showSign = num => (
      (num > 0 ? '+' : '')
    )

    return (
      <div className="stock-header">
        <img className="logo" src={ logo.url } />
        <h2 className="name">{quote.companyName} ({quote.symbol})</h2>
        <div className="price">
          <h3>Latest Price</h3>
          {quote.latestPrice}
        </div>
        <div className="change">
          <h3>Day Change</h3>
          {showSign(change)}{change}
        </div>
        <div className="percent">
          <h3>Percent Change</h3>
          {showSign(percent)}{percent}%
         </div>
        <div className="time">{quote.latestSource} as of {quote.latestTime}</div>
      </div>
    )
  }
};

export default StockHeader;
