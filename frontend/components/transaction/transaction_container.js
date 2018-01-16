import { connect } from 'react-redux';

import { requestStockSearch } from '../../actions/remote_stock_actions';
import { postTransaction } from '../../actions/transaction_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { updateCashBalance } from '../../actions/cash_balance_actions';

import { getUserLeagueData } from '../../reducers/selectors'

import Transaction from './transaction';

const mapStateToProps = state => ({
  targetUserData: getUserLeagueData(state, state.session.currentUser.id)
});

const mapDispatchToProps = dispatch => ({
  updateCashBalance: stock => dispatch(updateCashBalance(stock)),
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  postTransaction: transaction => dispatch(postTransaction(transaction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
