import { connect } from 'react-redux'

import { createCashBalance } from '../../actions/cash_balance_actions';
import { requestTargetUserData } from '../../actions/user_actions';
import { hideModal, showModal } from '../../actions/modal_actions';

import LeagueShow from './league_show';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  formType: state.ui.modal.modalProps.formType,
  setLeagueId: ownProps.setLeagueId
})

const mapDispatchToProps = dispatch => ({
  createCashBalance: cash_balance => dispatch(createCashBalance(cash_balance)),
  requestTargetUserData: id => dispatch(requestTargetUserData(id)),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueShow)
