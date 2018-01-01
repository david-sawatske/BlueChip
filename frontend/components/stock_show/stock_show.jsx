import React from 'react';

import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote, chart, logo, company, stats } = this.props.stockData;

    return (
      <div>
        <StockHeader quote={quote}
                     logo={logo} />
        <StockChart chart={chart} />
        <StockSummary quote={quote} />
        <CompanyData company={company}
                     stats={stats} />
      </div>
    )
  }
}

export default StockShow;
