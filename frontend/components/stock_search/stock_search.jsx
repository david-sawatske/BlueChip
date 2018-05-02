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
    this.setState({ searchInitiated: !this.state.searchInitiated,
                    prevTicker: this.state.ticker })
  }

  handleStockSearch(event) {
    event.preventDefault();

    const additionalDataTypes = 'financials,earnings,relevant,';
    const ticker = this.state.ticker;

    this.props.requestStockSearch(ticker, additionalDataTypes).then(() => {
      this.props.setTicker(ticker)
    })
  }

  handlePeerSearch(event) {
    event.preventDefault();

    this.setState({ searchInitiated: false })

    const additionalDataTypes = 'financials,earnings,relevant,';
    this.props.requestStockSearch(this.state.ticker, additionalDataTypes)
      .then(stockData => {
        const peerStr = this.props.remoteStockData[this.state.ticker]
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

  render() {
    const searchedTicker = this.state.ticker.toUpperCase();
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

    let ShowComponent;
    if (currentPath === '/') {
      targetHandleSubmit = this.handleStockSearch;
    } else if (isRemoteLoading || isRailsUserLoading || isPeerLoading) {
      ShowComponent = <Loader />
    } else if (remoteStockData[this.state.prevTicker]) {
      const targetRemoteData = remoteStockData[this.state.prevTicker];
      ShowComponent = <StockShow remoteStockData={targetRemoteData}
                                 transactionData={transactionData}
                                 currentUser={currentUser}
                                 peerData={peerData}
                                 showModal={showModal}
                                 hideModal={hideModal} />
    }

    let searchClass
    if (currentPath === "/") {
      searchClass = "home-search"
    } else if (!this.state.searchInitiated) {
      searchClass = "initial-search"
    } else if (this.state.searchInitiated) {
      searchClass = "side-search"
    }

    let SuggestedTickers
    if (searchedTicker.length > 0 && (searchClass === "initial-search" ||
                                      searchClass === "home-search") ) {

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

        <div className="search-show">{ ShowComponent }</div>
      </div>
    );
  }
}

export default StockSearch;
