import React from 'react';

import SortableHeader from './table_header';

import { merge } from 'lodash';
import { numberToCurrency } from '../../util/helper_functions'

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.sortArray = this.sortArray.bind(this);
    this.renderRows = this.renderRows.bind(this);

    this.state = { dataArr: this.props.dataArr };
  }

  sortArray(targetKey, isOrderASC) {
    let { dataArr } = merge({}, this.state);

    const newOrder = (isOrderASC) ? dataArr.sort((a, b) => a[targetKey] > b[targetKey]) :
                                    dataArr.sort((a, b) => b[targetKey] > a[targetKey])

    this.setState({ dataArr: newOrder })
  }

  renderRows(dataObj, index) {
    return (
      <tr key={index}>
        <th>{ index + 1 }</th>
        {Object.keys(dataObj).map((attribute, idx) => {
          if (this.props.isDataCurrency[attribute]) {
            return <th key={idx}>{numberToCurrency(dataObj[attribute])}</th>
          } else {
            return <th key={idx}>{dataObj[attribute]}</th>
          }
        })}
      </tr>
    );
  }

  render () {
    const { tableHeadings, isDataCurrency } = this.props;
    const { dataArr } = this.state;

    return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              {Object.keys(dataArr[0]).map((attribute, idx) => (
                <SortableHeader title={tableHeadings[attribute]}
                                attribute={attribute}
                                onClick={this.sortArray}
                                key={idx} />
              ))}
            </tr>
          </thead>
          <tbody>
            { dataArr.map(this.renderRows) }
          </tbody>
      </table>
    );
  }
}

export default SortableTable;
