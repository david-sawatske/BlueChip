import React from 'react';

import { numAbbr } from '../../util/helper_functions'

const CompanyData = ({ company, stats }) => (
  <div>
    <h3>{company.companyName}'s Company Data</h3>
    <p>{company.description}</p>
    <p>Exchange: {company.exchange}</p>
    <p>Number of Employees: ~{Math.floor(stats.revenue / stats.revenuePerEmployee)}</p>
    <p>Float: {numAbbr(stats.float)}</p>
    <p>Industry: {company.industry}</p>
    <p>Sector: {company.sector}</p>
    <p>Website: {<a href={company.website}>{company.website}</a>}</p>
  </div>
);

export default CompanyData;
