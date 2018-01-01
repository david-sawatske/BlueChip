import React from 'react';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "",
                   interval: "",
                   searchInitiated: false,
                   prevSearchData: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);


        this.props.requestStockSearch('aapl', '6m')
          .then( data => {
                this.toggleSearchInitiated();
          })

          this.state.ticker = "aapl"
  }

  toggleSearchInitiated() {
    this.setState({ searchInitiated: true })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.requestStockSearch(this.state.ticker, this.state.interval)
      .then( data => {
        this.toggleSearchInitiated();
      })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    const searchedTicker = this.state.ticker.toUpperCase();
    const { isRemoteLoading, remoteStockData } = this.props;

    let ShowComponent = null;

    if (isRemoteLoading) {
      ShowComponent = <Loader />
    } else if (this.state.searchInitiated && remoteStockData[searchedTicker]) {
      ShowComponent = <StockShow
        stockData={remoteStockData[searchedTicker]}
        interval={this.state.interval} />

        this.state.prevSearchData = remoteStockData[searchedTicker]
    } else if (this.state.prevSearchData) {
      ShowComponent = <StockShow
        stockData={this.state.prevSearchData}/>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="">
            <br/>
            <label>Ticker:
              <input type="text"
                value={this.state.ticker}
                onChange={this.update('ticker')}
                className=""
              />
            </label>

            <label>Interval:
              <select onChange={this.update('interval')}>
                <option value="">Choose an Interval</option>
                <option value="1d">Intraday</option>
                <option value="1m">One Month</option>
                <option value="3m">Three Months</option>
                <option value="6m">Six Months</option>
                <option value="ytd">Year To Date</option>
                <option value="1y">One Year</option>
                <option value="5y">Five Years</option>
              </select>
            </label>
          <input type="submit" value="Search" />
        </form>

        <br/>
          { ShowComponent }
      </div>
    );
  }
}

export default StockSearch;
