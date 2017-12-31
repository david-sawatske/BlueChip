import React, { Component } from 'react';

import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  SplineSeries, Navigator, Tooltip
} from 'react-jsx-highstock';

class StockChart extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { chart } = this.props;

    const dateConv = data => {
      const date = data.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
      return Date.parse(`${date}T${data.minute}`)
    };

    const chartData = []

    chart.map(obj => {
      if (obj.average > 0) {
        chartData.push([dateConv(obj), obj.average]);
      }
    })


    return (
      <div className="app">
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title></Title>

          <Legend>
            <Legend.Title>Key</Legend.Title>
          </Legend>

          <Tooltip />

          <XAxis>
            <XAxis.Title>Date</XAxis.Title>
          </XAxis>

          <YAxis id="price">
            <YAxis.Title>Price</YAxis.Title>
            <SplineSeries id="price" name="Price" data={chartData} />
          </YAxis>

          <Navigator>
            <Navigator.Series seriesId="price" />
          </Navigator>
        </HighchartsStockChart>

      </div>
    );
  }
}

export default withHighcharts(StockChart, Highcharts);
