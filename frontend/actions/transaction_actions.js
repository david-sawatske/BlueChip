import * as TransactionAPIUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

// sync action creators
export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction
});

// thunk async action creators
export const postTransaction = transaction => dispatch => (
  TransactionAPIUtil.postTransaction(transaction).then(transaction => {
    dispatch(receiveTransaction(transaction));
  })
);
