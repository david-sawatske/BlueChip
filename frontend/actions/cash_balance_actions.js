import * as BalanceAPIUtil from '../util/balance_api_util';

export const RECEIVE_TARGET_BALANCE = 'RECEIVE_TARGET_BALANCE';

// sync action creators
export const receiveTargetBalance = balance => ({
  type: RECEIVE_TARGET_BALANCE,
  targetBalance: balance
});

// thunk async action creators
export const createCashBalance = cash_balance => dispatch => (
  BalanceAPIUtil.createCashBalance(cash_balance)
    .then(balance => dispatch(receiveTargetBalance(balance)))
);

export const updateCashBalance = cash_balance => dispatch => (
  BalanceAPIUtil.updateBalance(cash_balance).then(balance =>
    dispatch(receiveTargetBalance(balance)))
);
