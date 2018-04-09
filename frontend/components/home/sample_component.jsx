import React from 'react';

import FinancialsTable from '../stock_show/financials_table';
import StockChart from '../stock_show/stock_chart_container';
import LeagueIndex from '../league/league_index_container';
import MastheadButtons from '../masthead/masthead_buttons';
import EarningsTable from '../stock_show/earnings_table';
import StockNews from '../stock_show/stock_news_index';
import StockSummary from '../stock_show/stock_summary';
import CompanyData from '../stock_show/company_data';
import StockHeader from '../stock_show/stock_header';
import LeagueShow from '../league/league_show';
import UserShow from '../users/user_show';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeComponentIdx: 0, timer: null }

    this.initializeTimer = this.initializeTimer.bind(this);
    this.autoCount = this.autoCount.bind(this);
  }

  initializeTimer() {
    let timer = setInterval(this.autoCount, 3000);
    this.setState({ timer });
  }

  componentDidMount() {
    this.initializeTimer()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  autoCount() {
    const currIdx = this.state.activeComponentIdx

    if (currIdx < 6) {
      this.setState({
        activeComponentIdx: this.state.activeComponentIdx + 1
      });
    }
  }

  handleClick(direction, event) {
    event.preventDefault();

    const currentIdx = this.state.activeComponentIdx;
    const change = (direction == 'left') ? -1 : 1;
    const newIdx = currentIdx + change;

    if (newIdx === 6) {
      this.setState({ activeComponentIdx: 0 })
    } else if (newIdx == -1){
      this.setState({ activeComponentIdx: 5 })
    } else {
      this.setState({ activeComponentIdx: newIdx })
    }

    clearInterval(this.state.timer);
  }

  render() {
    const { activeComponentIdx } = this.state;

    const { sampleStock, sampleLeagueData, userId,
            userLeagueData, currentPath } = this.props;

    const { quote, financials, logo, news,
            earnings, peerData, stats, company } = sampleStock;
    const { companyName } = quote;

    let Sidebar =   <aside className="sidebar">
                      <button className="nav-btn" onClick={ (e) =>
                          this.handleClick('left', e) }>
                          ◀
                      </button>
                      <button className="nav-btn" onClick={ (e) =>
                          this.handleClick('right', e) }>
                          ▶
                      </button>
                    </aside>
    const stockHeadings =
        [ `Get a detailed look at ${companyName}'s Financials`,
          `Is ${companyName} in the news? You'll see it here!`,
          `Graphical Price and Volume Data using Highcharts`,
          `Estimate profitabliity with Earnings per Share Calculations`,
          `Get to know ${companyName} before investing`,
          'Check League Leaderboards to see where you rank' ]

    let Heading = <h1 className="component-heading">
                      { stockHeadings[activeComponentIdx] }
                    </h1>

    let componentClass = "stock-component";
    let StockHead = <StockHeader quote={quote}
                                 logo={logo} />
    let StockSumm = <StockSummary quote={quote} />


    let SampleComponent
    switch (activeComponentIdx) {
      case 0:
        SampleComponent = <FinancialsTable financials={financials.financials} />

        break;
      case 1:
        SampleComponent = <StockNews companyName={quote.companyName}
                                     news={news} />
        break;
      case 2:
        SampleComponent = <StockChart symbol={quote.symbol}
                                      companyName={quote.name} />

        break;
      case 3:
        SampleComponent =  <EarningsTable earnings={earnings.earnings} />

        break;
      case 4:
        SampleComponent = <CompanyData company={company}
                                       stats = {stats} />
        break;
      case 5:
        SampleComponent = <LeagueIndex currentPath={currentPath} />
        StockHead = null;
        StockSumm = null;
        componentClass = "league-component";

        break;
      default:
        StockHead = null;
        StockSumm = null;
        Heading = null;
        Sidebar = null;
        componentClass = "greeting-component";

        SampleComponent = <div className="logo-headings">
                            <h3>Welcome to </h3>
                            <img className="logo" src="http://res.cloudinary.com/sawatskeda10/image/upload/e_auto_contrast,q_100/v1516937726/cutmypic_1_pxnibw.png" />
                            <h1 className="title">BlueChip</h1>
                          </div>
    }

    return (
      <div className="sample-container">
        { StockHead }

        <div className={componentClass}>
          { Heading }
          { SampleComponent }
        </div>

        { StockSumm }

        { Sidebar }
      </div>
    );
  }
}

export default SampleComponent;
