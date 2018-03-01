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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate ornare elementum. Proin interdum libero eu ultricies gravida. Aenean eleifend malesuada ex, nec rhoncus diam aliquet sed. Cras cursus nunc tellus, sit amet fermentum turpis tempor nec. Aenean sodales dictum posuere. Nunc hendrerit orci in condimentum ultrices. Pellentesque sit amet cursus eros. Nulla facilisis ex ac tellus rhoncus vulputate. Vivamus congue velit eu leo gravida sagittis. Sed ultricies metus in arcu semper finibus. Aliquam imperdiet risus at sagittis condimentum. Morbi imperdiet porttitor sapien, ac laoreet tellus rutrum nec. Ut enim augue, tempus aliquet commodo eu, mollis in nibh. Sed vel ultrices libero. Suspendisse dui mi, blandit eu sapien ut, malesuada volutpat nisi. Proin sed cursus augue.Quisque ut ultricies lacus. Maecenas facilisis rhoncus ligula quis viverra. Praesent et blandit neque. Quisque malesuada imperdiet enim et semper. Proin tincidunt, nulla eu congue sagittis, ipsum diam finibus magna, eget accumsan magna elit sit amet dolor. Proin quis lacinia ante, non facilisis ligula. Maecenas ac lacinia ligula. Ut molestie purus quis blandit tincidunt. Quisque id gravida sapien. Quisque varius a leo a sagittis.Aenean sem sapien, pulvinar sed vulputate eget, vestibulum sit amet magna. Duis at tempor nisl. Donec feugiat eget purus sit amet feugiat. Fusce id placerat erat, eu tincidunt lacus. Aenean commodo risus quis massa cursus porta. Donec lectus mi, rhoncus eu dictum lacinia, eleifend a augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin porttitor posuere neque vitae lobortis. Mauris pulvinar rutrum sapien, non placerat justo sollicitudin sed. Aenean maximus purus risus, quis bibendum nulla lacinia quis. Etiam ligula lectus, feugiat molestie pretium nec, mattis vel mauris. Curabitur eros tortor, luctus vitae leo nec, sagittis elementum eros. Donec quis elit et lorem ornare efficitur. Mauris viverra ac lorem quis mollis.Maecenas tempor ut nulla at aliquam. Nullam vestibulum convallis porta. Vestibulum aliquet ligula ac condimentum euismod. In bibendum dictum quam et sollicitudin. Praesent ac arcu ac metus sollicitudin tincidunt. Nulla porttitor tempus nunc non fermentum. Duis pulvinar vitae velit a sollicitudin. Nulla quis consectetur elit, eu facilisis tellus. Integer eget sollicitudin dolor. Donec gravida velit quis tortor faucibus tincidunt. Nam rutrum est tellus, eu varius mi lacinia et. Aliquam nec lorem mollis, venenatis urna posuere, sagittis elit. Integer tempor turpis aliquet, scelerisque erat sit amet, fringilla augue. Nulla sagittis sed enim in blandit. Nam a pretium purus, id sollicitudin magna.Mauris luctus erat imperdiet nisi condimentum, eu dapibus urna interdum. Sed ac mattis massa. Integer dignissim libero arcu. Pellentesque et fringilla purus, non scelerisque ipsum. Nullam elementum libero vitae justo viverra ullamcorper. Suspendisse quis scelerisque augue. Duis finibus posuere nibh, sed aliquet lorem congue et. Praesent risus lacus, congue id commodo eget, aliquam non est. Proin placerat dolor vitae lorem bibendum, ac dictum mauris convallis. Mauris laoreet sed eros luctus sodales. Ut vulputate turpis ut velit accumsan pulvinar. Nunc sed sapien vel ex bibendum luctus id id ante. Donec gravida leo a vehicula pretium.Nullam auctor elit ac justo pellentesque ultricies. Sed dictum erat et luctus posuere. Suspendisse nisl enim, elementum sed tempus at, ullamcorper id felis. Nulla erat dui, ultrices pulvinar consectetur vel, tempor id sapien. Quisque molestie semper diam vitae placerat. Aliquam in molestie nibh, sed hendrerit est. Donec porta est eget facilisis tempus. Ut suscipit volutpat tellus, ac cursus nisi cursus vitae. Phasellus porta mattis tristique. Nulla facilisi. Nullam maximus dapibus turpis scelerisque tristique. Donec in euismod eros. Nulla porta venenatis est at tempus. Quisque consequat placerat ultrices. Aenean odio tellus, lobortis pharetra rhoncus nec, egestas mollis dui. Duis maximus mauris urna, et rutrum lorem hendrerit eu.Donec lectus velit, dignissim vel aliquam non, pulvinar nec nibh. Vestibulum vel viverra massa. Duis ultricies urna sit amet est semper viverra sit amet vel tellus. Curabitur lacus turpis, aliquet nec purus eget, interdum luctus ligula. Suspendisse at scelerisque diam. Nullam porta, dolor et rutrum sagittis, turpis leo fringilla eros, quis blandit tortor sapien a nibh. Morbi bibendum quam quis felis feugiat egestas.Sed at nibh laoreet, volutpat orci id, ornare justo. Suspendisse convallis neque vel vestibulum efficitur. Suspendisse rutrum metus odio, at pellentesque nunc pharetra nec. Sed pharetra eleifend justo, et varius nunc pellentesque vitae. Aliquam urna elit, tempor non vulputate vitae, varius a dolor. Sed egestas convallis turpis ut sodales. Nulla facilisi. Vestibulum ut porttitor neque. Donec cursus gravida nibh. Nullam congue tempor tortor vitae convallis.Ut efficitur mauris ante, eu gravida quam vestibulum vitae. Quisque neque magna, dapibus sed luctus et, elementum vel neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eget arcu sed dui ultrices molestie a a erat. Quisque vitae ligula est. Donec nulla augue, blandit quis luctus ac, sodales eget massa. Donec scelerisque cursus diam, eget ullamcorper nulla dignissim et. Integer cursus condimentum imperdiet. Phasellus ligula nulla, consectetur eget malesuada vel, tristique non purus. Vivamus maximus sapien ligula, id consequat purus elementum non. Nunc volutpat aliquet elit, pulvinar malesuada massa luctus sit amet. Integer at est scelerisque, suscipit tellus eget, tempor sem.Donec ullamcorper porttitor odio, vitae pellentesque libero eleifend malesuada. Mauris eget mattis erat. Aliquam erat volutpat. Nam eu tempor velit, a condimentum turpis. Mauris a auctor mi, eget imperdiet quam. Maecenas volutpat velit sem, eget varius turpis iaculis ut. Nulla enim lorem, feugiat eu odio vel, interdum aliquam sapien. Aliquam erat volutpat.</p>
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
