import React from 'react';
import { Link } from 'react-router-dom';

import FinancialsTable from '../stock_show/financials_table';
import MastheadButtons from '../masthead/masthead_buttons';
import LeagueIndexItem from '../league/league_index_item'
import StockSummary from '../stock_show/stock_summary';
import StockHeader from '../stock_show/stock_header';
import StockChart from '../stock_show/stock_chart';
import Loader from '../shared/loader';

import StockSearch from '../stock_search/stock_search';

import SampleComponent from './sample_component';

import { arrSample } from '../../util/helper_functions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeComponentIdx: 1,
                   containerClass: "landing-search",
                   techTicker: '',
                   timer: null }

    this.setTicker = this.setTicker.bind(this)
  }

  setTicker(ticker) {
    this.setState({ techTicker: ticker,
                    containerClass: 'home-show' })
  }

  returnStockData(sampleStock) {
    const { quote, logo } = sampleStock;

    return  <div className="show-sample">
              <StockHeader quote={quote}
                           logo={logo} />
              <SampleComponent sampleStock={sampleStock} />
              <StockSummary quote={quote} />
            </div>
  }

  render()  {
    const { currentUser, leagueIds, remoteStockData, logout, hideModal, currentPath,
            showModal, requestStockSearch, requestStockPeers, requestSymbols,
            tickerData } = this.props;
    const sampleStock = remoteStockData[this.state.techTicker];

    let StockDataComponent
    if (sampleStock) {
      StockDataComponent = this.returnStockData(sampleStock)
    }

    let SearchComponent
    if (!sampleStock) {
      SearchComponent = <StockSearch requestStockSearch={requestStockSearch}
                                     requestStockPeers={requestStockPeers}
                                     remoteStockData={remoteStockData}
                                     requestSymbols={requestSymbols}
                                     setTicker={this.setTicker}
                                     currentPath={currentPath}
                                     tickerData={tickerData} />
    }

    return (
      <div className={this.state.containerClass}>
        <div className="logo-headings">
          <img className="app-logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />
          <h1 className="home-h1">BlueChip</h1>
          <h2 className="home-h2">FANTASY STOCK TRADING LEAGUES</h2>
          <p>Enter the name or stock ticker for a publicy traded company to see an overview</p>
        </div>
        <MastheadButtons currentUser={currentUser}
                         hideModal={hideModal}
                         showModal={showModal}
                         logout={logout} />

        <div className="home-data">
          { SearchComponent }
          { StockDataComponent }
        </div>
      </div>
    )
  }
}

export default HomePage;
