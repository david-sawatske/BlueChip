import { connect } from 'react-redux'

import { createCashBalance } from '../../actions/cash_balance_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { requestAllLeagues } from '../../actions/league_actions';
import { getLeagueUserData } from '../../reducers/selectors';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  currentUser: state.session.currentUser,
  leagueData: getLeagueUserData(state),
  currentUserLeagueIds: getUserLeagueIds(state)
})

const mapDispatchToProps = dispatch => ({
  createCashBalance: cash_balance => dispatch(createCashBalance(cash_balance)),
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  requestAllLeagues: () => dispatch(requestAllLeagues()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)

const getUserLeagueIds = state => {
  const currentUser = state.session.currentUser;
  const userLeagueJoin = state.entities.userLeagueBalances.userLeagueBalancesById;
  const currentUserLeagueIds = []

  if (currentUser) {
    const currentUserId = currentUser.id
    if (currentUser.id) {
      return Object.values(userLeagueJoin)
      .filter(obj => obj.userId === currentUserId.toString())
      .map(selectObj => selectObj.leagueId)
    }
  }
}
