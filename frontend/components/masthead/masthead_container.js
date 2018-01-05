import { connect } from 'react-redux';

import Masthead from './masthead';

import { hideModal, showModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  formType: state.ui.modal.modalProps.formType
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Masthead)
