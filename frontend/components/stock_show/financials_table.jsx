import React from 'react';

class FinancialsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(dataKey, dataArr, idx1) {
    return (
      <tr key={idx1}>
        <td>{ dataKey }</td>
        { dataArr.map((datum, idx2) => (
            <td key={idx2}>
              {datum}
            </td>
        ))}
      </tr>
    )
  }

  render() {
    const { financials } = this.props;

    const finData = {};

    financials.map(dataObj => {
      Object.keys(dataObj).map(dataKey => {
        const data = (dataObj[dataKey]) ? dataObj[dataKey] : '-';

        if (finData[dataKey]) {
          finData[dataKey].push(data)
        } else {
          finData[dataKey] = [];
          finData[dataKey].push(data)
        }
      })
    })

    const headings = []
    const rows = []

    Object.keys(finData).map((dataKey, idx) => {
      const dataArr = finData[dataKey];

      if (dataKey === "reportDate") {
        headings.push(<tr key={idx}>
                        <td className="sub-heading">Income Statement</td>
                        { dataArr.map((datum, idx2) => (
                          <th key={idx2}>
                            {datum}
                          </th>
                        ))}
                      </tr>)
      } else if (dataKey === "currentAssets") {
        rows.push(<tr key={idx}>
                    <td className="sub-heading">Balance Sheet</td>
                  </tr>)
        rows.push(this.renderRow(dataKey, dataArr))
      } else if (dataKey === "cashChange"){
        rows.push(<tr key={idx}>
                    <td className="sub-heading">Cash Flow</td>
                  </tr>)
        rows.push(this.renderRow(dataKey, dataArr, idx))
      } else {
        rows.push(this.renderRow(dataKey, dataArr, idx))
      }
    })

  return (
    <div className ="financials">
      <h1>Financials</h1>
      <table>
        <thead>
          { headings }
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
    )
  }
};

export default FinancialsTable;
