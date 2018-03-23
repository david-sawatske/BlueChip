import React from 'react';

import { numberToCurrency } from '../../util/helper_functions'

const TransactionData = ({ ...props }) => (
  <div className="transaction-data">
    <div className="transaction-header">
      <h3>Available Balance:</h3>
      <h2>{ numberToCurrency(props.balance) }</h2>
      <h3>Shares Owned:</h3>
      <h2>{ props.quantOwned } </h2>
    </div>
  </div>
);

export default TransactionData;
