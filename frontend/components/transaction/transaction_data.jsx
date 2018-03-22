import React from 'react';

import { numberToCurrency } from '../../util/helper_functions'

const TransactionData = ({ ...props }) => (
  <div className="transaction-data">
    <div className="transaction-header">
      <h1>Available Balance: { numberToCurrency(props.balance) }</h1>
      <h1>Shares Owned: { props.quantOwned }</h1>
    </div>
  </div>
);

export default TransactionData;
