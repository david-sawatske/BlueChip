import React from 'react';

import UserTransactions from '../stock_show/user_transaction_index';

import { numberToCurrency } from '../../util/helper_functions'

const TransactionData = ({ ...props }) => (
  <div className="transaction-data">
    <div className="transaction-header">
      <h1>Available Balance: { numberToCurrency(props.balance) }</h1>
    </div>

    <UserTransactions transactData={ props.transactData } />
  </div>
);

export default TransactionData;
