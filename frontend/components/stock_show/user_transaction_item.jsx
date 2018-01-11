import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';

import { numberToCurrency } from '../../util/helper_functions';

const UserTransactionItem = ({ transact }) => (
  <div>
    <tr>
      <td>Purchase Day:  </td>
      <td>{ moment(transact.purchaseDay).calendar() }</td>
    </tr>
    <tr>
      <td>Share Price:  </td>
      <td>{ numberToCurrency(transact.sharePrice) }</td>
    </tr>
    <tr>
      <td>Share Quanitiy:  </td>
      <td>{ transact.shareQuant }</td>
    </tr>
    <br/>
  </div>
)

export default UserTransactionItem;
