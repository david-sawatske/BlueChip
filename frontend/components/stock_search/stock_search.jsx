import React from 'react';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

import { merge } from 'lodash';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "AAPL",
                   interval: { ['1d']: "One Day" },
                   searchInitiated: true,
                   prevSearchData: null,
                   isSearchHovered: false };

    this.userTransactionData = this.userTransactionData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const additionalDataTypes = 'financials,earnings,';

    if (this.props.currentUser) {
      this.props.requestTargetUserData(this.props.currentUser.id)
    }

    this.props.requestStockSearch(this.state.ticker,'1d', additionalDataTypes)
  }

  setSearchInitiated() {
    this.setState({ searchInitiated: true })
  }

  handleSubmit(event) {
    event.preventDefault();
    const intervalKey = Object.keys(this.state.interval)[0];
    this.props.requestStockSearch(this.state.ticker, intervalKey)
      .then(data => {
        this.setSearchInitiated();
      })
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

  render() {
    const searchedTicker = this.state.ticker.toUpperCase();
    const { isRemoteLoading, remoteStockData, isRailsUserLoading,
            currentUserData, showModal, hideModal } = this.props;
    const { isSearchHovered } = this.state;
    const currIntValue = Object.values(this.state.interval);

    const currentUserTranData = currentUserData.userLeagueData;

    let transactionData
    (currentUserTranData) ? this.userTransactionData(currentUserTranData)
                              :
                            null;

    const intervals = [ { ['5y']: "Five Years" },
                        { ['2y']:" Two Years" },
                        { ['1y']:" One Year" },
                        { ['YTD']: "Year to Date" },
                        { ['6m']: "Six Months" },
                        { ['3m']: "Three Months" },
                        { ['1m']: "One Month" },
                        { ['1d']: "One Day" } ];


    let ShowComponent = null;
    if (isRemoteLoading || isRailsUserLoading) {
      ShowComponent = <Loader />
    } else if (this.state.searchInitiated && remoteStockData[searchedTicker]) {
      ShowComponent = <StockShow remoteStockData={remoteStockData[searchedTicker]}
                                 transactionData={transactionData}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />

        this.state.prevSearchData = remoteStockData[searchedTicker]
    } else if (this.state.prevSearchData) {
      ShowComponent = <StockShow remoteStockData={this.state.prevSearchData}
                                 transactData={transactData}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />
    }

    let searchClass
    if (!this.state.searchInitiated) {
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

          <form onSubmit={this.handleSubmit}
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

          <form onSubmit={this.handleSubmit}
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

        <div className={searchClass}>{ ShowComponent } </div>
      </div>
    );
  }
}

export default StockSearch;
