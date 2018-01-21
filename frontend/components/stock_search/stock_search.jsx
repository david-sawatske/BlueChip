import React from 'react';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "",
                   interval: { ['1d']: "One Day" },
                   searchInitiated: false,
                   prevSearchData: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.requestTargetUserData(this.props.currentUser.id)
    }
  }

  toggleSearchInitiated() {
    this.setState({ searchInitiated: !this.state.searchInitiated })
  }

  handleSubmit(event) {
    event.preventDefault();
    const intervalKey = Object.keys(this.state.interval)[0];
    this.props.requestStockSearch(this.state.ticker, intervalKey)
      .then( data => {
        this.toggleSearchInitiated();
      })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value.toUpperCase()
    });
  }

  render() {
    const searchedTicker = this.state.ticker.toUpperCase();
    const { isRemoteLoading, remoteStockData,
            currentUserData, showModal, hideModal } = this.props;
    const intervals = [ { ['5y']: "Five Years" },
                        { ['2y']:" Two Years" },
                        { ['1y']:" One Year" },
                        { ['YTD']: "Year to Date" },
                        { ['6m']: "Six Months" },
                        { ['3m']: "Three Months" },
                        { ['1m']: "One Month" },
                        { ['1d']: "One Day" } ];

    let ShowComponent = null;
    if (isRemoteLoading) {
      ShowComponent = <Loader />
    } else if (this.state.searchInitiated && remoteStockData[searchedTicker]) {
      ShowComponent = <StockShow remoteStockData={remoteStockData[searchedTicker]}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />

        this.state.prevSearchData = remoteStockData[searchedTicker]
    } else if (this.state.prevSearchData) {
      ShowComponent = <StockShow remoteStockData={this.state.prevSearchData}
                                 showModal={showModal}
                                 hideModal={hideModal}
                                 interval={this.state.interval} />
    }

    return (
      <div className="stock-search-container">
        <form onSubmit={this.handleSubmit} className="stock-search">
            <br/>
            <label>Enter Ticker:</label>
              <input
                type="text"
                value={this.state.ticker}
                onChange={this.update('ticker')}
                className="ticker-input"
                placeholder="Enter Ticker"
              />
          <input type="submit" value="Search" />
        </form>

        <br/>

        <form onSubmit={this.handleSubmit} className="intervals">
          {intervals.map((interval, idx) =>
            <button
              key={idx}
              onClick={ () => this.setState({ interval: interval }) }>
              { interval[idx] }
            </button>
          )}
        </form>

        <br/>

        { ShowComponent }
      </div>
    );
  }
}

export default StockSearch;
