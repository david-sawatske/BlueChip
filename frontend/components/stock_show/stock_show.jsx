import React from 'react';

import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';
import StockNews from './stock_news_index';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stockData, interval } = this.props
    const { quote, chart, logo, company, stats, news } = stockData;

    return (
      <div>
        <StockChart chart={chart}
                    interval={interval} />
        <StockHeader quote={quote}
                     logo={logo} />
        <StockSummary quote={quote} />
        <CompanyData company={company}
                     stats={stats} />
        <StockNews news={news}
                   companyName={quote.companyName} />
      </div>
    )
  }
}

export default StockShow;
