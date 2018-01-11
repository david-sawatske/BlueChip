import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';

import UserTransactionItem from './user_transaction_item'

import { numberToCurrency } from '../../util/helper_functions';

const UserTransactions = ({ transactData }) => {
  return (
    <div>
      <h3>Transactions</h3>
      <table>
        <tbody>
          {Object.values(transactData).map(transact => (
            <UserTransactionItem transact={transact}
                                 key={transact.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default UserTransactions;
