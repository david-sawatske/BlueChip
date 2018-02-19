import React from 'react';

import UserTransactions from '../stock_show/user_transaction_index';

const TransactionData = ({ ...props }) => (
  <div>
    <h1>Selected League: {props.leagueName}</h1>
    <h1>Available Balance: {props.balance}</h1>

    <h1>Previous Transactons</h1>
    <UserTransactions transactData={props.transactData} />
  </div>
);

export default TransactionData;
