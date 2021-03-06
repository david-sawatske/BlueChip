import React from 'react';
import moment from 'moment';

import SortableHeader from './table_header';

import { merge } from 'lodash';
import { numberToCurrency, numAbbr, numToPercent } from '../../util/helper_functions'

class SortableTable extends React.Component {
  constructor(props) {
    super(props);

    this.sortArray = this.sortArray.bind(this);
    this.renderRows = this.renderRows.bind(this);

    this.state = { sortedValue: "",
                   dataArr: this.props.dataArr };
  }

  compareValues(targetKey, isOrderASC) {
    return (a, b) => {
      const varA = (typeof a[targetKey] === 'string') ? a[targetKey].toUpperCase()
                                                          :
                                                        a[targetKey];
      const varB = (typeof b[targetKey] === 'string') ? b[targetKey].toUpperCase()
                                                          :
                                                        b[targetKey];

      let comparison;
      ( varA > varB ) ? comparison = 1 : comparison = -1

      return (isOrderASC) ?  comparison : (comparison * - 1)
    }
  }

  sortArray(targetKey, isOrderASC) {
    let { dataArr } = this.state;
    const newOrder = dataArr.sort(this.compareValues(targetKey, isOrderASC))

    this.setState({ dataArr: newOrder,
                    sortedValue: targetKey,
                    isOrderASC: isOrderASC })
  }

  componentWillMount() {
    const { initialSort } = this.props;

    if (initialSort) {
      this.sortArray(initialSort, false)
    }
  }

  renderRows(dataObj, index) {
    const { ranked,
            isDataDate = {},
            sideHeadings = {},
            isDataPercent = {},
            isDataInteger = {},
            isDataCurrency = {} } = this.props

    const rankings = (ranked) ? <td className="index">{ index + 1 }</td>
                                  :
                                null;

    return (
      <tr key={index}>
        { rankings }
        {Object.keys(dataObj).map((attribute, idx) => {
          if (isDataCurrency[attribute]) {
            return <td key={idx}>{numberToCurrency(dataObj[attribute])}</td>
          } else if (isDataDate[attribute]) {
            return <td key={idx}>{moment(dataObj[attribute]).format('L')}</td>
          } else if (isDataInteger[attribute]) {
            return <td key={idx}>{numAbbr(dataObj[attribute])}</td>
          } else if (isDataPercent[attribute]) {
            return <td key={idx}>{numToPercent(dataObj[attribute])}</td>
          } else if (sideHeadings[attribute]) {
            return <th key={idx}>{sideHeadings[attribute]}</th>
          } else {
            return <td key={idx}>{dataObj[attribute]}</td>
          }
        })}
      </tr>
    );
  }

  render () {
    const { tableHeadings, ranked, isDataSotable } = this.props;
    const { dataArr = [], isOrderASC, sortedValue } = this.state;
    const rankHeader = (ranked) ? <th><a className="ranking">Ranking</a></th>
                                     :
                                   null;

    const dataAttributes = dataArr[0] ? Object.keys(dataArr[0]) : []
    let arrow;

    return (
        <table>
          <thead>
            <tr>
              { rankHeader }

              { dataAttributes.map((attribute, idx) => {
                if (attribute === sortedValue) {
                  arrow = isOrderASC ? '⬆' : '⬇';
                } else if (isDataSotable[attribute]) {
                  arrow = '⬍'
                }

                return (
                  <SortableHeader title={tableHeadings[attribute]}
                                  onClick={this.sortArray}
                                  attribute={attribute}
                                  arrow={arrow}
                                  key={idx} />
                )

              })}
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
