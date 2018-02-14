import React from 'react';
import { merge } from 'lodash';

class EarningsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { earnings } = this.props;

    const sideHeadings = { actualEPS: "Actual EPS",
                           consensusEPS: "Consensus EPS",
                           EPSSurpriseDollar: "EPS Surprise (dollar)",
                           numberOfEstimates: "Number of Estimates " }

    const topHeadings = [];
    const earnData = {};

    earnings.map(earnObj => {
      topHeadings.unshift(earnObj['fiscalPeriod']);

      Object.keys(earnObj).map(earnKey => {
        if (sideHeadings.hasOwnProperty(earnKey)) {
          const sideHead = sideHeadings[earnKey];
          const datum = earnObj[earnKey];

          if (earnData[sideHead]) {
            earnData[sideHead].unshift(datum);
          } else {
            earnData[sideHead] = [];
            earnData[sideHead].unshift(datum);
          }
        }
      })
    })

    topHeadings.unshift('Earnings')

    return (
    <div className ="earnings-table">
      <table>
        <thead className="earn-head">
          <tr>
            { topHeadings.map((head, idx) => (
              <th key={idx}>{ head }</th>
            )) }
          </tr>
        </thead>

        <tbody className="earn-body">
          { Object.keys(earnData).map((earnKey, idx) => (
            <tr key={idx}>
              <td className="side-head">
                { earnKey }
              </td>
              { earnData[earnKey].map((datum, idx) => (
                <td key={idx}>{ datum }</td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
    )
  }
};

export default EarningsTable;
