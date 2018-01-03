import { connect } from 'react-redux'

import { createCashBalance } from '../../actions/cash_balance_actions';
import { requestTargetUserData } from '../../actions/user_actions';

import LeagueIndexItem from './league_index_item';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  createCashBalance: cash_balance => dispatch(createCashBalance(cash_balance)),
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndexItem)
