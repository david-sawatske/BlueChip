import React from 'react';

import { camelToTitle } from '../../util/helper_functions'

class FinancialsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRows(dataObj) {
    return Object.keys(dataObj).map((earnKey, idx) => (
      <tr key={earnKey}>
        { dataObj[earnKey].map((datum, idx) => {
          const tdClass = (idx === 0) ? 'side-head' : null;

          return (<td className={tdClass}
                      key={earnKey + idx} >
                    { datum }
                  </td>
        )})}
      </tr> )
    )
  }

  render() {
    const { financials = [] } = this.props;
    const noDataWarn = (financials.length === 0) ? <h1>Data Not Available</h1>
                                                    :
                                                   null;
    const pushData = (dataType, currDataObj, dataKey) => {
      const sideHead = camelToTitle(dataKey);
      const datum = (currDataObj[dataKey]) ? currDataObj[dataKey] / 1000 : '-';

      if (dataType[dataKey].includes(sideHead)) {
        dataType[dataKey].push(datum);
      } else {
        dataType[dataKey].unshift(sideHead);
        dataType[dataKey].push(datum);
      }
    }

    const incomeData = { 'grossProfit': [],
                         'costOfRevenue': [],
                         'operatingRevenue': [],
                         'totalRevenue': [],
                         'operatingIncome': [],
                         'netIncome': [],
                         'researchAndDevelopment': [],
                         'operatingExpense': [] }

    const balanceData = { 'currentAssets': [],
                          'totalAssets': [],
                          'totalLiabilities': [],
                          'currentCash': [],
                          'currentDebt': [],
                          'totalCash': [],
                          'totalDebt': [],
                          'shareholderEquity': [] }

    const cashData = { 'cashChange': [],
                       'cashFlow': [],
                       'operatingGainsLosses': [] }


    const topHeadings = [];

    financials.map(dataObj => {
      topHeadings.unshift(dataObj['reportDate']);

      Object.keys(dataObj).map(dataKey => {
        if (incomeData.hasOwnProperty(dataKey)) {
          pushData(incomeData, dataObj, dataKey)
        } else if (balanceData.hasOwnProperty(dataKey)) {
          pushData(balanceData, dataObj, dataKey)
        } else if (cashData.hasOwnProperty(dataKey)) {
          pushData(cashData, dataObj, dataKey)
        }
      })

    })

   return (
    <div className ="financials-table">
      { noDataWarn }
      <table>
        <thead>
          <tr>
            <th>Financials</th>
            <td colSpan="4">(numbers in thousands)</td>
          </tr>
        </thead>

        <tbody className="financials-body">
          <tr className="sub-head">
            <td>
              Income Statement
            </td>
            { topHeadings.map((head, idx) => (
              <th key={idx}>{ head }</th>
            )) }
          </tr>
          { this.renderRows(incomeData) }
          <tr className="sub-head">
            <td colSpan="5">
              Balance Sheet
            </td>
          </tr>
          { this.renderRows(balanceData) }
          <tr className="sub-head">
            <td colSpan="5">
              Cash Flow
            </td>
          </tr>
          { this.renderRows(cashData) }
        </tbody>
      </table>
    </div>
    )
  }
};

export default FinancialsTable;
