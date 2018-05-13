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

    this.state = { dataArr: this.props.dataArr,
                   sortedValue: "" };
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
    let { dataArr } = merge({}, this.state);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataArr != this.props.dataArr) {
      this.setState({ sortedValue: '',
                      dataArr: nextProps.dataArr })
    }
  }

  renderRows(dataObj, index) {
    const { isDataDate, sideHeadings, isDataPercent, isDataInteger,
            isDataCurrency, ranked } = this.props

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
                if (!isDataSotable[attribute]) {
                  arrow = null;
                } else if (attribute === sortedValue) {
                  arrow = isOrderASC ? '⬆' : '⬇';
                } else {
                  arrow = '⬍'
                }

                return (
                  <SortableHeader title={tableHeadings[attribute]}
                                  attribute={attribute}
                                  onClick={this.sortArray}
                                  key={idx}
                                  arrow={arrow}/>
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
