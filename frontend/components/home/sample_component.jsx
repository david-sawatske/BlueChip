import React from 'react';

import FinancialsTable from '../stock_show/financials_table';
import StockSummary from '../stock_show/stock_summary';
import StockHeader from '../stock_show/stock_header';
import StockNewsIndex from '../stock_show/stock_news_index';
import StockChart from '../stock_show/stock_chart_container';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { techTicker: '', activeComponentIdx: 0, timer: null }

    this.initializeTimer = this.initializeTimer.bind(this);
    this.autoCount = this.autoCount.bind(this);
  }

  initializeTimer() {
    let timer = setInterval(this.autoCount, 5000);
    this.setState({ timer });
  }

  componentDidMount() {
    // this.initializeTimer()
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

  render() {
    const { sampleStock } = this.props;
    const { quote, financials, logo, news } = sampleStock;

    let SampleComponent
    switch (this.state.activeComponentIdx) {
      case 0:
        SampleComponent = <FinancialsTable financials={financials.financials} />

        break;
      case 1:
        SampleComponent = <StockNewsIndex companyName={quote.companyName}
                                          news={news} />
        break;
      case 2:
        SampleComponent = <StockChart symbol={quote.symbol}
                                      companyName={quote.name} />

        break;
      default:
        SampleComponent = <h1>Welcome to BlueChip</h1>
    }

    const Heading = <h1 className="component-heading">TEST HEADING</h1>

    return (
      <div className="sample-container">
        <StockHeader quote={quote}
                     logo={logo} />
        <div className="sample-component">
          { Heading }
          { SampleComponent }
        </div>

        <StockSummary quote={quote} />

        <aside className="sidebar">
          <button className="nav-btn" onClick={ (e) =>
              this.handleClick('left', e) }>
              ◀
          </button>
          <button className="nav-btn" onClick={ (e) =>
              this.handleClick('right', e) }>
              ▶
          </button>
        </aside>
      </div>
    );
  }

}

export default SampleComponent;
