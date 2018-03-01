import React from 'react';

import FinancialsTable from '../stock_show/financials_table';
import StockChart from '../stock_show/stock_chart';

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

  render() {
    const { sampleStock } = this.props;
    const { chart, quote, financials } = sampleStock;

    let SampleComponent
    switch (this.state.activeComponentIdx) {
      case 0:
        SampleComponent = <div className="display-component">
                            <StockChart interval={{ ['1d']: "One Day" }}
                                        chart={chart}
                                        companyName={quote.companyName} />
                          </div>
        break;
      case 1:
        SampleComponent = <div className="display-component">
                              <FinancialsTable financials={financials.financials} />
                          </div>
        break;
      case 2:
        SampleComponent = <div className="display-component">
                            <h1>Check leaderboards to see where you rank</h1>
                          </div>
        break;
      case 3:
        SampleComponent = <div className="display-component">
                            <h1>Future Component</h1>
                          </div>
        break;
      default:
        SampleComponent = <h1>Welcome to BlueChip</h1>
    }
    return (
      <div className="sample-component">
          { SampleComponent }
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
