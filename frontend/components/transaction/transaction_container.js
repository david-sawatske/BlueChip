import { connect } from 'react-redux';

import { requestStockSearch } from '../../actions/remote_stock_actions';
import { postTransaction } from '../../actions/transaction_actions';
import { updateCashBalance } from '../../actions/cash_balance_actions';

import Transaction from './transaction';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateCashBalance: stock => dispatch(updateCashBalance(stock)),
  postTransaction: transaction => dispatch(postTransaction(transaction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
