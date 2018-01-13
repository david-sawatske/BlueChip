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
        {Object.keys(dataObj).map((key, idx) => {
          if (this.props.isDataCurrency[key]) {
            return <th key={idx}>{numberToCurrency(dataObj[key])}</th>
          } else {
            return <th key={idx}>{dataObj[key]}</th>
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
              {Object.keys(dataArr[0]).map((attribute, idx) => {
                if (tableHeadings[attribute]) {
                  return <SortableHeader title={tableHeadings[attribute]}
                                         attribute={attribute}
                                         onClick={this.sortArray}
                                         key={idx} />
                }
              })}
            </tr>
          </thead>
          <tbody>
            {dataArr.map(this.renderRows)}
          </tbody>
      </table>
    );
  }
}

export default SortableTable;


{/* <tbody>
  {dataArr.map((dataObj, idx) => {
    const data = {}
    Object.keys(dataObj).map(key => {
      if (isDataCurrency[key]) {

        data[key] = numberToCurrency(dataObj[key])

      } else {
        data[key] = dataObj[key]
      }
    })
    console.log(data);

    return <TableRow data={data}/>
  })}
</tbody> */}
