import React from 'react';
import { Link } from 'react-router-dom';

import LeagueIndexItem from '../league/league_index_item'
import StockSummary from '../stock_show/stock_summary';
import StockHeader from '../stock_show/stock_header';
import StockChart from '../stock_show/stock_chart';
import Loader from '../shared/loader';

import { arrSample } from '../../util/helper_functions'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { techTicker: '', activeComponentIdx: 1, timer: null }

    // this.initializeTimer = this.initializeTimer.bind(this);
    // this.autoCount = this.autoCount.bind(this);
  }

  componentWillMount() {
    const sampleTicker = arrSample(['AAPL', 'AMZN', 'GOOG', 'TSLA', 'FB']);
    this.setState({ techTicker: sampleTicker })

    this.props.requestStockSearch(sampleTicker)

    if ( !this.props.leagueIds[0] ) {
      this.props.requestTargetLeague('stockData')
    }
  }

  // initializeTimer() {
  //   let timer = setInterval(this.autoCount, 5000);
  //   this.setState({ timer });
  // }
  //
  // componentDidMount() {
  //   this.initializeTimer()
  // }
  //
  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }
  //
  // autoCount() {
  //   const currIdx = this.state.activeComponentIdx
  //   if (currIdx < 3) {
  //     this.setState({
  //       activeComponentIdx: this.state.activeComponentIdx + 1
  //     });
  //   }
  // }

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

    let LeaderBoard = <Loader />;
    if (sampleLeagueId) {
      LeaderBoard = <LeagueIndexItem leagueData={leagueData[sampleLeagueId]}
                                     key={sampleLeagueId} />
    }

    let StockData = <Loader />;
    if (sampleStock) {
      const { quote, logo } = sampleStock;

      StockData = <div className="show-sample">
                    <StockHeader quote={quote}
                                 logo={logo} />

                    <StockSummary quote={quote} />

{/* ROTATING COMPONENTS */}

                    <div className="display-component">
                      <StockChart interval={{ ['1d']: "On e Day" }}
                                  chart={sampleStock.chart}
                                  companyName={sampleStock.quote.companyName} />
                    </div>
                  </div>
    }

    const listOne =
      <div className="list-one">
        <ul className="main-list-1">
          <li>Realtime equity data</li>
          <li>Historical equity data</li>
          <li>Technical data to make the best picks</li>
        </ul>
      </div>

    const listTwo =
      <div className="list-two">
        <ul className="main-list-2">
          <li>Create a league and play friends</li>
          <li>Join an existing league</li>
          <li>Win bragging rights</li>
        </ul>
      </div>

    let ActiveComponent
    switch (this.state.activeComponentIdx) {
      case 0:
        ActiveComponent = <div className="active-data">
                            <h2 className="data-head"> Realistic Stock Trading App </h2>
                          </div>
        break;
      case 1:
        ActiveComponent = <div className="active-data">
                            <h2 className="data-head"> Live Stock Data </h2>
                              { StockData }



                          </div>
        break;
      case 2:
        ActiveComponent = <div className="active-data">
                            <h2>Check leaderboards to see where you rank</h2>
                              { LeaderBoard }
                              { listTwo }
                          </div>
        break;
      default:
        ActiveComponent = <h1>Welcome to BlueChip</h1>
    }

    return (
      <div className="home">
        <h1 className="home-h1">FREE STOCK TRADING FANTASY LEAGUES</h1>
        <img className="logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />

        <div className="home-data">
          { ActiveComponent }
        </div>

        {/* <aside className="sidebar">
          <button className="nav-btn" onClick={ (e) =>
              this.handleClick('left', e) }>
              ◀
          </button>
          <button className="nav-btn" onClick={ (e) =>
              this.handleClick('right', e) }>
              ▶
          </button>
        </aside> */}
      </div>
    )
  }
}

export default HomePage;
