import React from 'react';
import moment from 'moment';

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

  componentWillMount() {
    const { initialSort } = this.props;

    if (initialSort) {
      this.sortArray(initialSort, false)
    }
  }

  renderRows(dataObj, index) {
    return (
      <tr key={index}>
        <td className="index">{ index + 1 }</td>
        {Object.keys(dataObj).map((attribute, idx) => {
          if (this.props.isDataCurrency[attribute]) {
            return <td key={idx}>{numberToCurrency(dataObj[attribute])}</td>
          } else if (this.props.isDataDate[attribute]) {
            return <td key={idx}>{moment(dataObj[attribute]).calendar()}</td>
          } else {
            return <td key={idx}>{dataObj[attribute]}</td>
          }
        })}
      </tr>
    );
  }

  render () {
    const { tableHeadings, isDataDate } = this.props;
    const { dataArr } = this.state;

    return (
        <table>
          <thead>
            <tr>
              <th><a className="ranking">Ranking</a></th>
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
