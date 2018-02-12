import React from 'react';

class Financials extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { financials } = this.props;

    const finData = {};

    financials.map((dataObj, idx) => {
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

    Object.keys(finData).map(dataKey => {
      const dataArr = finData[dataKey];

      if (dataKey === "reportDate") {
        headings.push(<tr>
                        <td className="sub-heading">Income Statement</td>
                        { dataArr.map(datum => <th>{datum}</th> )}
                      </tr>)
      } else if (dataKey === "currentAssets") {
        rows.push(<tr>
                    <td className="sub-heading">Balance Sheet</td>
                  </tr>)
        rows.push(<tr>
                    <td>{ dataKey }</td>
                    { dataArr.map(datum => <td>{datum}</td> )}
                  </tr>)
      } else if (dataKey === "cashChange"){
        rows.push(<tr>
                    <td className="sub-heading">Cash Flow</td>
                  </tr>)
        rows.push(<tr>
                    <td>{ dataKey }</td>
                    { dataArr.map(datum => <td>{datum}</td> )}
                  </tr>)
      } else {
        rows.push(<tr>
                    <td>{ dataKey }</td>
                    { dataArr.map(datum => <td>{datum}</td> )}
                  </tr>)
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

export default Financials;
