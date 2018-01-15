import React from 'react';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "",
                   interval: "6m",
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
    const { isRemoteLoading, remoteStockData, currentUserData } = this.props;
    const intervals = ['5y', '2y','1y', 'YTD', '6m','3m', '1m', '1d'];

    let ShowComponent = null;

    if (isRemoteLoading) {
      ShowComponent = <Loader />
    } else if (this.state.searchInitiated && remoteStockData[searchedTicker]) {
      ShowComponent = <StockShow remoteStockData={remoteStockData[searchedTicker]}
                                 interval={this.state.interval} />

        this.state.prevSearchData = remoteStockData[searchedTicker]
    } else if (this.state.prevSearchData) {
      ShowComponent = <StockShow remoteStockData={this.state.prevSearchData}/>
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
          <input type="submit" value="Search" />
        </form>

        <br/>

        <form onSubmit={this.handleSubmit} className="">
          {intervals.map((interval, idx) =>
            <button className="button"
              key={idx}
              onClick={ () => this.setState({ interval: interval }) }>
              { interval }
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
