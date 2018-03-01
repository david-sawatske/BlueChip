import React from 'react';
import { Link } from 'react-router-dom';

import FinancialsTable from '../stock_show/financials_table';
import MastheadButtons from '../masthead/masthead_buttons';
import LeagueIndexItem from '../league/league_index_item'
import StockSummary from '../stock_show/stock_summary';
import StockHeader from '../stock_show/stock_header';
import StockChart from '../stock_show/stock_chart';
import Loader from '../shared/loader';


import SampleComponent from './sample_component'

import { arrSample } from '../../util/helper_functions'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { techTicker: '', activeComponentIdx: 1, timer: null }
  }

  componentWillMount() {
    const sampleTicker = arrSample(['AAPL', 'AMZN', 'GOOG', 'TSLA', 'FB']);
    const additionalDataTypes = 'financials,earnings,relevant,';

    this.setState({ techTicker: sampleTicker })

    this.props.requestStockSearch(sampleTicker, '1d', additionalDataTypes)

    if ( !this.props.leagueIds[0] ) {
      this.props.requestTargetLeague('stockData')
    }
  }

  returnStockData(sampleStock) {
    const { quote, logo } = sampleStock;

    return  <div className="show-sample">
              <StockHeader quote={quote}
                           logo={logo} />
              <SampleComponent sampleStock={sampleStock} />
              <StockSummary quote={quote} />
            </div>
  }

  render()  {
    const { currentUser, leagueIds, remoteStockData, logout,
            hideModal, showModal } = this.props;
    const sampleStock = remoteStockData[this.state.techTicker];
console.log(showModal);
    let StockData = <Loader />;
    if (sampleStock) {
      StockData = this.returnStockData(sampleStock)
    }

    return (
      <div className="home">
        <h1 className="home-h1">BlueChip</h1>
        <h2 className="home-h2">FANTASY STOCK TRADING LEAGUES</h2>
        <img className="app-logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />
        <MastheadButtons currentUser={currentUser}
                         hideModal={hideModal}
                         showModal={showModal}
                         logout={logout} />

        <div className="home-data">
          { StockData }
        </div>
      </div>
    )
  }
}

export default HomePage;
