import React from 'react';

import SearchSuggestions from './search_suggestions';
import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

import { merge } from 'lodash';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: '',
                   prevTicker: '',
                   searchInitiated: false };

    this.userTransactionData = this.userTransactionData.bind(this);
    this.handleStockSearch = this.handleStockSearch.bind(this);
    this.clickUpdateTicker = this.clickUpdateTicker.bind(this);
    this.handlePeerSearch = this.handlePeerSearch.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.props.requestSymbols();

    if (this.props.currentUser) {
      this.props.requestTargetUserData(this.props.currentUser.id)
    }
  }

  initiateSearch() {
    const { searchInitiated, ticker } = this.state;
    this.setState({ searchInitiated: !searchInitiated,
                    prevTicker: ticker })
  }

  handleStockSearch(event) {
    event.preventDefault();

    const ticker = this.state.ticker;
    const additionalDataTypes = 'financials,earnings,relevant,';

    this.props.requestStockSearch(ticker, additionalDataTypes).then(() => {
      this.props.setTicker(ticker)
    })
  }

  handlePeerSearch(event) {
    event.preventDefault();

    const { ticker } = this.state
    this.setState({ searchInitiated: false })

    const additionalDataTypes = 'financials,earnings,relevant,';
    this.props.requestStockSearch(ticker, additionalDataTypes)
      .then(stockData => {
        const peerStr = this.props.remoteStockData[ticker]
                                                  ['relevant']
                                                  ['symbols']
                                                  .toString()

        this.props.requestStockPeers(peerStr);
      }).then(data => { this.initiateSearch() })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value.toUpperCase()
    });
  }

  clickUpdateTicker(newTicker) {
    this.setState({ ['ticker']: newTicker })
  }

  userTransactionData(currentUserTranData) {
    const transactData = {};

    Object.values(currentUserTranData).map(val => {
      const targTranData = val.transactionData[this.state.prevTicker];

      if (targTranData) {
        Object.values(targTranData).map(transaction => {
          transactData[transaction.id] = merge({ ['league']: val.name }, transaction );
        });
      }
    })

    return transactData;
  }

  filterTickers(str, tickers) {
    const filteredTickers = []

    tickers.map(tkr => {
      if (tkr.symbol.toLowerCase().startsWith(str.toLowerCase())) {
        filteredTickers.push(tkr)
      } else if ((tkr.name.toLowerCase().startsWith(str.toLowerCase()))) {
        filteredTickers.push(tkr)
      }
    })

    return filteredTickers
  }

  searchReset() {
    this.setState({ searchInitiated: false, ticker: '' })
  }

  render() {
    const { searchInitiated, ticker, prevTicker } = this.state;
    const searchedTicker = ticker.toUpperCase();
    const { isRemoteLoading, isPeerLoading, isRailsUserLoading, showModal, currentPath,
            hideModal, tickerData, remoteStockData = {}, currentUserData = {}, currentUser} = this.props;

    const currentUserTranData = currentUserData.userLeagueData;
    const peerData = [];

    let targetHandleSubmit = this.handlePeerSearch;

    let filteredTickers = []
    if (tickerData.length != 0) {
      filteredTickers = this.filterTickers(searchedTicker, tickerData)
    }

    if (remoteStockData[searchedTicker]) {
      const peerTkrArr = remoteStockData[searchedTicker]
                                        ['relevant']
                                        ['symbols']

      peerTkrArr.map(tkr => {
        if (remoteStockData[tkr]) {
          peerData.push(remoteStockData[tkr])
        }
      })
    }

    const transactionData = (currentUserTranData) ?
                              this.userTransactionData(currentUserTranData)
                                :
                              { };

    let ResetButton;
    let ShowComponent;
    if (currentPath === '/') {
      targetHandleSubmit = this.handleStockSearch;
    } else if (isRemoteLoading || isRailsUserLoading || isPeerLoading) {
      ShowComponent = <Loader />
    } else if (remoteStockData[prevTicker] && searchInitiated) {
      const targetRemoteData = remoteStockData[prevTicker];
      ShowComponent = <StockShow remoteStockData={targetRemoteData}
                                 transactionData={transactionData}
                                 currentUser={currentUser}
                                 peerData={peerData}
                                 showModal={showModal}
                                 hideModal={hideModal} />;
      ResetButton = <button onClick={ () =>  this.searchReset() }
                            className="search-reset">
                     ⤺
                   </button>
    }

    let searchClass
    if (currentPath === "/") {
      searchClass = "home-search"
    } else if (!searchInitiated) {
      searchClass = "initial-search"
    } else if (searchInitiated) {
      searchClass = "side-search"
    }

    let SuggestedTickers
    const tickerOptions = { ['Tesla']: 'TSLA', ['Apple']: 'AAPL', ['AMD']: 'AMD' }
    if (searchedTicker.length === 0 || filteredTickers.length == 0) {
      SuggestedTickers =
        <div className='search-help'>
          <h3>Please enter a valid ticker symbol</h3>
          <h3>~or~</h3>
          <ul>
            <h3>Pick from a few samples: </h3>
            {Object.keys(tickerOptions).map(optKey => (
              <h3 onClick={ () => this.clickUpdateTicker(tickerOptions[optKey])}>
                { optKey }
              </h3>
            ))}
          </ul>
        </div>
    } else if (searchedTicker.length > 0 &&
              (searchClass === "initial-search" ||
               searchClass === "home-search")) {

      SuggestedTickers = <SearchSuggestions filteredTickers={filteredTickers}
                                            updateTicker={this.clickUpdateTicker} />
    }

    return (
      <div className="stock-search-container">
        <div className={searchClass} >
        <h1 className='initial'>Search for Live Stock Data</h1>
        <h2 className='initial-sub'>Enter Company Name or Ticker</h2>

        <h1 className='searched'>Stock Search</h1>

          <form onSubmit={targetHandleSubmit}
                className="search">
            <input
              type="text"
              value={searchedTicker}
              onChange={this.update('ticker')}
              placeholder="Begin Typing..."
            />

            <label className='submit-search'>
              <input type="submit" value='Search' className="search-val"/>
            </label>
          </form>
        </div>

        { SuggestedTickers }
        { ResetButton }
        <div className="search-show">{ ShowComponent }</div>
      </div>
    );
  }
}

export default StockSearch;
