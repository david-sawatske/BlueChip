import React from 'react';

import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import StockChart from './stock_chart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote, chart } = this.props.stockData;

    return (
      <div>
        <StockHeader quote={quote} />
        <StockChart chart={chart} />
        <StockSummary quote={quote} />
      </div>
    )
  }
}

export default StockShow;
