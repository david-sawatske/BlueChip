import { connect } from 'react-redux';

import LeagueForm from './league_form';

import { createCashBalance } from '../../actions/cash_balance_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { createLeague } from '../../actions/league_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createCashBalance: balance => dispatch(createCashBalance(balance)),
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  createLeague: league => dispatch(createLeague(league))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueForm);
