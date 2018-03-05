import React from 'react';

import Highcharts from 'highcharts/highstock';
import { HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
         Subtitle, Legend, SplineSeries, AreaSplineSeries, Navigator, Tooltip
       } from 'react-jsx-highstock';

import '../../../app/assets/stylesheets/components/chart';

import { dateConv } from '../../util/helper_functions';

class StockChart extends React.Component {
  constructor (props) {
    super(props);

    this.state = { yType: "priceData",
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
      this.setState({ yType: "priceData", typeButton: "Volume Data" })
       :
      this.setState({ yType: "volumeData", typeButton: "Price Data" })
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
    const { intervalStr, intervalKey } = this.state;
    const priceData = [];
    const volumeData = [];
    const subtitle = companyName + ' - ' + this.state.intervalStr;
    const intervals =   { ['5y']: "Five Years",
                         ['2y']:" Two Years",
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

    const GraphTypeButton = <button className="button" onClick={ (e) =>
                              this.setYType(e) }>
                              { this.state.typeButton }
                            </button>

    let yAxis
    if (this.state.yType === "priceData" && priceData.length > 0) {
          yAxis = <div>
                    <YAxis id="price">
                      <YAxis.Title>Price</YAxis.Title>
                      <SplineSeries id="price"
                                    name="Price"
                                    data={priceData} />
                    </YAxis>
                  </div>
      } else if (this.state.yType === "volumeData") {
          yAxis = <YAxis id="volumeData">
                    <YAxis.Title>Price</YAxis.Title>
                    <AreaSplineSeries id="volumeData"
                                      name="Volume"
                                      data={volumeData} />
                  </YAxis>
      }

      const InvervalButtons = Object.keys(intervals).map(intKey => {
        return (
          <button onClick={(e) => this.changeInterval(intervals[intKey], intKey, e)}
                  key={intKey} >
            { intervals[intKey] }
          </button>
        )

      })


    return (
      <div className="chart-container">
        { GraphTypeButton }

        { InvervalButtons }

        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title> - </Title>
          <Subtitle>{ subtitle }</Subtitle>

          <Legend>
            <Legend.Title>Key</Legend.Title>
          </Legend>

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
