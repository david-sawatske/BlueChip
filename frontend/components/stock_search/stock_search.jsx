import React from 'react';

import StockShow from '../stock_show/stock_show';
import Loader from '../shared/loader';

class StockSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ticker: "",
                   interval: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.requestStockSearch(this.state.ticker, this.state.interval);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    const { isRemoteLoading } = this.props;

    let ShowComponent = null;
    (isRemoteLoading) ? ShowComponent = <Loader /> : ShowComponent = <h2>loaded</h2>

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
