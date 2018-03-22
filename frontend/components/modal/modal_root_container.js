import { connect } from 'react-redux';

import { showModal, hideModal } from '../../actions/modal_actions';

import ModalRoot from './modal_root';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  modalType: state.ui.modal.modalType,
  modalProps: state.ui.modal.modalProps,
  transactionData: ownProps.transactionData
})

const mapDispatchToProps = dispatch => ({
  showModal: (modalType, modalProps) => (
    dispatch(showModal(modalType, modalProps))
  ),

  hideModal: () => dispatch(hideModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRoot);
