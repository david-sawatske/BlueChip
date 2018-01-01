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
    const { stockData, interval } = this.props
    const { quote, chart, logo, company, stats } = stockData;

    return (
      <div>
        <StockChart chart={chart}
                    interval={interval} />
        <StockHeader quote={quote}
                     logo={logo} />
        <StockSummary quote={quote} />
        <CompanyData company={company}
                     stats={stats} />
      </div>
    )
  }
}

export default StockShow;
