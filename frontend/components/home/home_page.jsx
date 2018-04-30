import React from 'react';
import { Link } from 'react-router-dom';

import FinancialsTable from '../stock_show/financials_table';
import MastheadButtons from '../masthead/masthead_buttons';
import StockSummary from '../stock_show/stock_summary';
import StockHeader from '../stock_show/stock_header';
import StockChart from '../stock_show/stock_chart';
import Loader from '../shared/loader';

import StockSearch from '../stock_search/stock_search';
import SampleComponent from './sample_component';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: '',
                   containerClass: 'landing-search',
                   randomUserId: null,
                   timer: null }

    this.setTicker = this.setTicker.bind(this)
  }

  componentWillMount() {
    this.props.requestTargetUserData().then(() => {
      this.setState({ randomUserId: this.props.userId })
    })
  }

  setTicker(ticker) {
    this.setState({ ticker: ticker,
                    containerClass: 'home-show' })
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if (nextProps.currentUser) {
      alert(`Welcome ${nextProps.currentUser.username}`)
      history.push(`/users/${nextProps.currentUser.id}`);
    }
  }

  render()  {
    const { currentUser, remoteStockData, logout, hideModal, requestSymbols,
            showModal, requestStockSearch, requestStockPeers, currentPath,
            tickerData, leagueUserData, userLeagueData, requestTargetUserData,
            login } = this.props;

    const { ticker, randomUserId } = this.state;
    const sampleStock = remoteStockData[ticker];

    let StockDataComponent
    if (sampleStock && leagueUserData && userLeagueData && randomUserId) {
      StockDataComponent =
        <SampleComponent userLeagueData={userLeagueData}
                         currentPath={currentPath}
                         sampleStock={sampleStock}
                         userId={randomUserId} />
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
          <img className="logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />
          <h1 className="title">BlueChip</h1>
          <h2 className="home-h2">FANTASY STOCK TRADING LEAGUES</h2>
          <p>Enter the name or stock ticker for a publicy traded company to see an overview</p>
        </div>
        <MastheadButtons currentUser={currentUser}
                         hideModal={hideModal}
                         showModal={showModal}
                         logout={logout}
                         login={login} />

        <div className="home-data">
          { SearchComponent }
          { StockDataComponent }
        </div>
      </div>
    )
  }
}

export default HomePage;
