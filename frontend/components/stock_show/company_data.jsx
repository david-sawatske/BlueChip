import React from 'react';

import { camelToTitle } from '../../util/helper_functions'

class CompanyData extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRows(dataObj) {
    return Object.keys(dataObj).map((dataKey, idx) => (
      <tr key={dataKey}>
        <td className="side-head">{camelToTitle(dataKey)}</td>
        <td>{dataObj[dataKey]}</td>
      </tr> )
    )
  }

  render() {
    const { description, website, tableData } = this.props.companyData;

    return (
      <div className ="company-data">
        <h2>Company Data</h2>
        <p>{ description }</p>
        <table>
          <tbody>
            { this.renderRows(tableData) }
          </tbody>
        </table>

        <div>website: {<a href={website}>{ website }</a>}</div>
      </div>
    );
  }
}

export default CompanyData;
