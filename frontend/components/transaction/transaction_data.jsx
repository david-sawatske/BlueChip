import React from 'react';

import StockSummary from '../stock_show/stock_summary';
import UserTransactions from '../stock_show/user_transaction_index';

const TransactionData = ({ ...props }) => {
console.log(props.transactData);
  return (
  <div>
    <h1>Selected League: {props.leagueName}</h1>
    <h1>Available Balance: {props.balance}</h1>

    <h1>Previous Transactons</h1>
    <UserTransactions transactData={props.transactData} />
    <StockSummary quote={props.quote} />
  </div>
)};

export default TransactionData;
