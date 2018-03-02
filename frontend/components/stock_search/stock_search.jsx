import React from 'react';

import SearchSuggestions from './search_suggestions';
import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

import { merge } from 'lodash';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "",
                   interval: { ['1d']: "One Day" },
                   searchInitiated: false,
                   prevSearchData: null,
                   prevPeerData: null,
                   isSearchHovered: false };

    this.userTransactionData = this.userTransactionData.bind(this);
    this.handleStockSearch = this.handleStockSearch.bind(this);
    this.handlePeerSearch = this.handlePeerSearch.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.props.requestSymbols();

    if (this.props.currentUser) {
      this.props.requestTargetUserData(this.props.currentUser.id)
    }
  }

  setSearchInitiated() {
    this.setState({ searchInitiated: true })
  }

  handleStockSearch(event) {
    event.preventDefault();

    const additionalDataTypes = 'financials,earnings,relevant,';
    const intervalKey = Object.keys(this.state.interval)[0];
    const ticker = this.state.ticker;

    this.props.requestStockSearch(ticker, intervalKey, additionalDataTypes)
    this.props.setTicker(ticker)
  }

  handlePeerSearch(event) {
    event.preventDefault();

    const additionalDataTypes = 'financials,earnings,relevant,';
    const intervalKey = Object.keys(this.state.interval)[0];
    this.props.requestStockSearch(this.state.ticker, intervalKey, additionalDataTypes)
      .then(stockData => {
        const peerStr = this.props.remoteStockData[this.state.ticker]
                                                  ['relevant']
                                                  ['symbols']
                                                  .toString()
        this.props.requestStockPeers(peerStr);
      }).then(data => { this.setSearchInitiated() })
  }

  handleHover() {
    this.setState({
      isSearchHovered: !this.state.isSearchHovered
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value.toUpperCase(),
      isSearchHovered: true
    });
  }

  userTransactionData(currentUserTranData) {
    const transactData = {};

    Object.values(currentUserTranData).map(val => {
      const targTranData = val.transactionData[this.state.ticker];

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
            hideModal, tickerData, remoteStockData = {}, currentUserData = {} } = this.props;
    const { isSearchHovered } = this.state;
    const currIntValue = Object.values(this.state.interval);
    const currentUserTranData = currentUserData.userLeagueData;
    const peerData = [];

    let targetHandleSubmit = this.handlePeerSearch;

    let filteredTickers = []
    if (tickerData.length != 0) {
      filteredTickers = this.filterTickers(this.state.ticker, tickerData)
    }

    if (remoteStockData[this.state.ticker]) {
      const peerTkrArr = remoteStockData[this.state.ticker]
                                        ['relevant']
                                        ['symbols']

      peerTkrArr.map(tkr => {
        peerData.push(remoteStockData[tkr])
      })
    }

    const transactionData = (currentUserTranData) ?
                              this.userTransactionData(currentUserTranData)
                                :
                              { };

    const intervals = [ { ['5y']: "Five Years" },
                        { ['2y']:" Two Years" },
                        { ['1y']:" One Year" },
                        { ['YTD']: "Year to Date" },
                        { ['6m']: "Six Months" },
                        { ['3m']: "Three Months" },
                        { ['1m']: "One Month" },
                        { ['1d']: "One Day" } ];


    let ShowComponent;
    if (currentPath === '/') {
      targetHandleSubmit = this.handleStockSearch;
    } else if (isRemoteLoading || isRailsUserLoading || isPeerLoading) {
      ShowComponent = <Loader />
    } else if (this.state.searchInitiated && remoteStockData[searchedTicker]) {
      ShowComponent = <StockShow remoteStockData={remoteStockData[searchedTicker]}
                                 peerData={peerData}
                                 transactionData={transactionData}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />

        this.state.prevSearchData = remoteStockData[searchedTicker];
        this.state.prevPeerhData = peerData;
    } else if (this.state.prevSearchData) {
      ShowComponent = <StockShow remoteStockData={this.state.prevSearchData}
                                 peerData={this.state.prevPeerData}
                                 transactionData={transactData}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />
    }

    let SuggestedTickers
    if (searchedTicker.length > 0) {
      SuggestedTickers = <SearchSuggestions filteredTickers={filteredTickers} />
    } else if (searchedTicker.length === 0){
      SuggestedTickers = <h1>Please Enter a vaild ticker</h1>
    } else {
       SuggestedTickers = <h1>{searchedTicker.length}</h1>
    }

    let searchClass
    if (currentPath === "/") {
      searchClass = "home-search"
    } else if (!this.state.searchInitiated) {
      searchClass = "initial-search"
    } else if (isSearchHovered && this.state.searchInitiated) {
      searchClass = "side-search"
    } else {
      searchClass = "hide-search"
    }

    return (
      <div className="stock-search-container">
        <div className={searchClass}
             onMouseEnter={this.handleHover}
             onMouseLeave={this.handleHover}>

        <h1 className='initial'>Enter Ticker for Live Stock Data</h1>
        <h1 className='searched'>Stock Search</h1>

          <form onSubmit={targetHandleSubmit}
            className="search">
            <input
              type="text"
              value={this.state.ticker}
              onChange={this.update('ticker')}
              placeholder="Ticker"
            />

            <label className='submit-search'>
              <input type="submit" value={currIntValue} className="int-val"/>
              <input type="submit" value='Search' className="search-val"/>
            </label>
          </form>

          <form onSubmit={targetHandleSubmit}
                className="intervals">
            {intervals.map((interval, idx) => {
              const intVal = Object.values(interval)[0];
              if (intVal != currIntValue) {
                return <button
                        key={idx}
                        onClick={ () => this.setState({ interval: interval }) }>
                        { intVal }
                      </button>
              }
            })}
          </form>
        </div>

        { SuggestedTickers }

        <div className="search-show">{ ShowComponent }</div>
      </div>
    );
  }
}

export default StockSearch;
