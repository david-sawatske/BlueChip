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
                   intervalStr: "One Month",
                   intervalKey: "1m" }

    this.setYType = this.setYType.bind(this);
  }

  componentWillMount() {
    const interval = this.props.interval;
    let intervalKey;
    if (interval) {
      intervalKey = Object.keys(interval)[0];
      this.setState({ intervalStr: interval.intervalKey,
                      intervalKey: intervalKey });
    }
  }

  setYType() {
    if (this.state.yType === "volumeData") {
      this.setState({ yType: "priceData", typeButton: "Volume Data" })
    } else {
        this.setState({ yType: "volumeData", typeButton: "Price Data" })
      }
  }

  render() {
    const { chart, companyName, interval = '1d' } = this.props;
    const { intervalStr, intervalKey } = this.state;
    const priceData = [];
    const volumeData = [];

    chart.map(obj => {
      const date = (intervalKey === '1d') ? dateConv(obj) : Date.parse(obj.date);
      const price = (intervalKey === '1d') ? obj.average : obj.close;

      if (price > 0) {
        priceData.push([date, price]);
        volumeData.push([date, obj.volume]);
      }
    })

    const graphTypeButton = <button className="button" onClick={ (e) =>
                              this.setYType(e) }>
                              { this.state.typeButton }
                            </button>

    let yAxis
    if (this.state.yType === "priceData") {
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

    const subtitle = companyName + ' - ' + interval[intervalKey];

    return (
      <div className="chart">
        { graphTypeButton }

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
