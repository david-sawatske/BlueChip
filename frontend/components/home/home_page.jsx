import React from 'react';
import { Link } from 'react-router-dom';

import LeagueIndexItem from '../league/league_index_item'
import StockHeader from '../stock_show/stock_header';
import StockChart from '../stock_show/stock_chart';
import Loader from '../shared/loader';

import { arrSample } from '../../util/helper_functions'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { techTicker: '', activeComponentIdx: 0, timer: null }

    this.initializeTimer = this.initializeTimer.bind(this);
    this.autoCount = this.autoCount.bind(this);
  }

  componentWillMount() {
    const sampleTicker = arrSample(['AAPL', 'AMZN', 'GOOG', 'TSLA', 'FB']);
    this.setState({ techTicker: sampleTicker })

    this.props.requestStockSearch(sampleTicker)

    if ( !this.props.leagueIds[0] ) {
      this.props.requestTargetLeague('stockData')
    }
  }

  initializeTimer() {
    let timer = setInterval(this.autoCount, 5000);
    this.setState({ timer });
  }

  componentDidMount() {
    this.initializeTimer()
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  autoCount() {
    const currIdx = this.state.activeComponentIdx
    if (currIdx < 3) {
      this.setState({
        activeComponentIdx: this.state.activeComponentIdx + 1
      });
    }
  }

  handleClick(direction, event) {
    event.preventDefault();

    const currentIdx = this.state.activeComponentIdx;
    const change = (direction == 'left') ? -1 : 1
    const newIdx = currentIdx + change

    if (newIdx === 3) {
      this.setState({ activeComponentIdx: 0 })
    } else if (newIdx == -1){
      this.setState({ activeComponentIdx: 2 })
    } else {
      this.setState({ activeComponentIdx: newIdx })
    }
  }

  render()  {
    const { currentUser, leagueData, leagueIds, remoteStockData } = this.props;
    const sampleStock = remoteStockData[this.state.techTicker];
    const sampleLeagueId = arrSample(leagueIds);

    let LeaderBoard = null;
    if (sampleLeagueId) {
      LeaderBoard = <LeagueIndexItem leagueData={leagueData[sampleLeagueId]}
                                     key={sampleLeagueId} />
    } else {
      LeaderBoard = <Loader />
    }

    let StockData = null;
    if (sampleStock) {
      StockData = <div>
                    <StockHeader quote={sampleStock.quote}
                                 logo={sampleStock.logo} />
                    <StockChart interval={'1d'}
                                chart={sampleStock.chart} />
                  </div>
    } else {
        StockData = <Loader />
    }

    const AppData =
      <div>
        <h3 id="home-h3">JUST LIKE TRADING IN THE REAL MARKET</h3>
        <ul id="main-list-1">
          <li>Realtime equity data</li>
          <li>Historical equity data</li>
          <li>Technical indicators to make the best picks</li>
        </ul>
        <ul id="main-list-2">
          <li>Create a league and invite friends</li>
          <li>Join an existing league</li>
          <li>Win bragging rights</li>
        </ul>
      </div>

    let ActiveComponent
    switch (this.state.activeComponentIdx) {
      case 0:
        ActiveComponent = AppData
        break;
      case 1:
        ActiveComponent = <div>
                            <h2>Live Stock Data</h2>
                            <div id="home-stock-data">
                              { StockData }
                            </div>
                          </div>
        break;
      case 2:
        ActiveComponent = <div>
                            <h2>Check leaderboards to see where you rank</h2>
                            <div id="home-leaderboard">
                              { LeaderBoard }
                            </div>
                          </div>
        break;
      default:
        ActiveComponent = <h1>Welcome to BlueChip</h1>
    }

    return (
      <div className="home">
        <h1 id="home-h1">FREE STOCK TRADING FANTASY LEAGUES</h1>
        <button className="button" onClick={ (e) =>
            this.handleClick('left', e) }>
            Left
        </button>
        <div id="home-data">
{ this.state.activeComponentIdx }
          { ActiveComponent }
        </div>
        <button className="button" onClick={ (e) =>
            this.handleClick('right', e) }>
            Right
        </button>
      </div>
    )
  }
}

export default HomePage;
