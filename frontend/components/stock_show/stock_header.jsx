import React from 'react';

import { numberToCurrency } from '../../util/helper_functions';

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
        <div className="top">
          <img className="logo" src={logo.url} />
          <h2 className="name">{quote.companyName} ({quote.symbol})</h2>
        </div>

        <div className="data">
          <div className="price">
            <h3>Latest Price</h3>
            <div>{ numberToCurrency(quote.latestPrice) }</div>
          </div>

          <div className="total">
            <h3>Day Change</h3>
            <div>{showSign(change)}{change}</div>
          </div>

          <div className="percent">
            <h3>Percent Change</h3>
            <div>{showSign(percent)}{percent}%</div>
         </div>
       </div>

       <div className="time">{quote.latestSource} as of {quote.latestTime}</div>
      </div>
    )
  }
};

export default StockHeader;
