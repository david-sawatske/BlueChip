import React from 'react';

import Highcharts from 'highcharts/highstock';
import { HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title,
         Legend, SplineSeries, AreaSplineSeries, Navigator, Tooltip
       } from 'react-jsx-highstock';

import { dateConv } from '../../util/helper_functions';

class StockChart extends React.Component {
  constructor (props) {
    super(props);

    this.state = { yType: "priceData",
                   typeButton: "Volume Data" }

    this.setYType = this.setYType.bind(this);
  }

  setYType() {
    if (this.state.yType === "volumeData") {
      this.setState({ yType: "priceData", typeButton: "Volume Data" })
    } else {
        this.setState({ yType: "volumeData", typeButton: "Price Data" })
      }
  }

  render() {
    const { chart, week52High, week52Low } = this.props;
    const priceData = [];
    const volumeData = [];

    chart.map(obj => {
      if (obj.average > 0) {
        priceData.push([dateConv(obj), obj.average]);
        volumeData.push([dateConv(obj), obj.volume]);
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

    return (
      <div className="app">
        { graphTypeButton }

        <HighchartsStockChart>
          <Chart zoomType="x" />

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
