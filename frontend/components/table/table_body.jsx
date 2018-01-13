import React from 'react';

import SortableHeader from './table_header';

import { merge } from 'lodash';
import { numberToCurrency } from '../../util/helper_functions'

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.sortArray = this.sortArray.bind(this);

    this.state = { dataArr: this.props.dataArr };
  }


  sortArray(targetKey, isOrderASC) {
    let { dataArr } = merge({}, this.state);

    const newOrder = (isOrderASC) ? dataArr.sort((a, b) => a[targetKey] > b[targetKey]) :
                                    dataArr.sort((a, b) => b[targetKey] > a[targetKey])

    this.setState({ dataArr: newOrder })
  }

  render () {
    let { dataArr } = this.state;

    return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <SortableHeader title="Username" attribute="username" onClick={this.sortArray} />
              <SortableHeader title="Cash Balance" attribute="cashBalance" onClick={this.sortArray} />
              <SortableHeader title="Cash Invested" attribute="cashInvested" onClick={this.sortArray} />
              <SortableHeader title="Total Equity" attribute="totalEquity" onClick={this.sortArray} />
            </tr>
          </thead>
          <tbody>
            { dataArr.map(this.renderRow) }
          </tbody>
      </table>
    );
  }

  renderRow(dataObj, index) {
    return (
      <tr key={index}>
        <th>{ index + 1 }</th>
        <th>{ dataObj.username }</th>
        <th>{ numberToCurrency(dataObj.cashBalance) }</th>
        <th>{ numberToCurrency(dataObj.cashInvested) }</th>
        <th>{ numberToCurrency(dataObj.totalEquity) }</th>
      </tr>
    );
  }
}

export default SortableTable;
