import React from 'react';

import Highcharts from 'highcharts/highstock';
import { HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
         SplineSeries, AreaSplineSeries, Navigator, Tooltip
       } from 'react-jsx-highstock';

import { dateConv } from '../../util/helper_functions';

class StockChart extends React.Component {
  constructor (props) {
    super(props);

    this.state = { yType: "priceData",
                   typeString: "Price",
                   typeButton: "Volume Data",
                   intervalStr: "One Day",
                   intervalKey: "1d",
                   fetching: true }

    this.changeInterval = this.changeInterval.bind(this);
    this.setYType = this.setYType.bind(this);
  }

  componentWillMount() {
    this.props.requestChartUpdate(this.props.symbol, '1d').then(() => {
      this.setState({ fetching: false })
    })
  }

  setYType() {
    (this.state.yType === "volumeData") ?
      this.setState({ yType: "priceData",
                      typeString: "Price",
                      typeButton: "Volume Data" })
       :
      this.setState({ yType: "volumeData",
                      typeString: "Volume",
                      typeButton: "Price Data" })
  }

  changeInterval(intervalStr, intervalKey, event) {
    event.preventDefault();

    this.setState({ intervalStr: intervalStr,
                    intervalKey: intervalKey,
                    fetching: true })

    this.props.requestChartUpdate(this.props.symbol, intervalKey).then(() => {
      this.setState({ fetching: false })
    })
  }

  render() {
    const { companyName, symbol, chartData = {} } = this.props;
    const { intervalStr, intervalKey, yType, typeString } = this.state;
    const priceData = [];
    const volumeData = [];

    const intervals =   { ['5y']: "Five Years",
                         ['1y']:" One Year",
                         ['YTD']: "Year to Date",
                         ['6m']: "Six Months",
                         ['3m']: "Three Months",
                         ['1m']: "One Month",
                         ['1d']: "One Day" } ;

    if (!this.state.fetching) {
      chartData[intervalKey].map(obj => {
        const date = (intervalKey === '1d') ? dateConv(obj) : Date.parse(obj.date);
        const price = (intervalKey === '1d') ? obj.average : obj.close;

        if (price > 0) {
          priceData.push([date, price]);
          volumeData.push([date, obj.volume]);
        }
      })
    }

    const GraphTypeButton = <button className="graph-type-button" onClick={ (e) =>
                              this.setYType(e) }>
                              { this.state.typeButton }
                            </button>

    let yAxis
    if (yType === "priceData" && priceData.length > 0) {
          yAxis = <div>
                    <YAxis id="price">
                      <YAxis.Title>Price</YAxis.Title>
                      <SplineSeries id="price"
                                    name="Price"
                                    data={priceData} />
                    </YAxis>
                  </div>
      } else if (yType === "volumeData") {
          yAxis = <YAxis id="volumeData">
                    <YAxis.Title>Price</YAxis.Title>
                    <AreaSplineSeries id="volumeData"
                                      name="Volume"
                                      data={volumeData} />
                  </YAxis>
      }

      const InvervalButtons = Object.keys(intervals).map(intKey => {
        const isDisabled = (intKey === this.state.intervalKey) ? true : false;

        return (
          <button onClick={(e) => this.changeInterval(intervals[intKey], intKey, e)}
                  className="int-button"
                  disabled={isDisabled}
                  key={intKey} >
            { intKey }
          </button>
        )
      })

    return (
      <div className="chart-container">
        <div className="chart-title">
          <h2>{ typeString }</h2>
          <h3>{'  (' + this.state.intervalStr +')'}</h3>
        </div>
        { GraphTypeButton }

        <div className="interval-buttons">
          Intervals: { InvervalButtons }
        </div>

        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title> - </Title>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Date</XAxis.Title>
          </XAxis>

          { yAxis }

          <Navigator>
            <Navigator.Series seriesId="price" />
          </Navigator>
        </HighchartsStockChart>
      </div>
    )
  }
}

export default withHighcharts(StockChart, Highcharts);
