import React from 'react';

import { numAbbr } from '../../util/helper_functions'

const CompanyData = ({ company, float, employees }) => (
  <div>
    <h3>{ company.companyName }'s Company Data</h3>
    <p>{ company.description }</p>
    <p>Exchange: { company.exchange }</p>
    <p>Number of Employees: ~{ Math.floor(employees) }</p>
    <p>Float: { numAbbr(float) }</p>
    <p>Industry: { company.industry }</p>
    <p>Sector: { company.sector }</p>
    <p>Website: { <a href={company.website }>{ company.website }</a>}</p>
  </div>
);

export default CompanyData;
