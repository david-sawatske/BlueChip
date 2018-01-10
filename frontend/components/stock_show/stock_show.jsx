import React from 'react';

import StockSummary from './stock_summary';
import StockHeader from './stock_header';
import CompanyData from './company_data';
import StockChart from './stock_chart';
import StockNews from './stock_news_index';
import Loader from '../shared/loader';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { remoteStockData, interval } = this.props

    let ShowComponent
    if (remoteStockData) {
      const { quote, chart, logo, company, stats, news } = remoteStockData;
      const defaultInterval = '1d'

      ShowComponent =
        <div>
          <StockHeader quote={quote}
                       logo={logo} />
          <StockSummary quote={quote} />
          <StockChart chart={chart}
                      interval={defaultInterval}/>
          <StockNews news={news} />
        </div>
    } else {
      ShowComponent = <Loader />
    }

    return (
      <div>
        { ShowComponent }
      </div>
    )
  }
}

export default StockShow;
