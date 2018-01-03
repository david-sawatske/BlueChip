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

    this.state = { techTicker: '' }
  }

  componentWillMount() {
    const sampleTicker = arrSample(['AAPL', 'AMZN', 'GOOG', 'TSLA', 'FB']);
    this.setState({ techTicker: sampleTicker })

    this.props.requestStockSearch(sampleTicker)

    if ( !this.props.leagueIds[0] ) {
      this.props.requestTargetLeague('random')
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

    return (
      <div className="">
        <h1>Home</h1>
        <section id="">
          <div className="">
            <h3>Check leaderboars to see where you rank</h3>
            <div>
              { LeaderBoard }
              { StockData }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default HomePage;
