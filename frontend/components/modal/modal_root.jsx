import React  from 'react';

import TransactionModal from './transaction_modal';
import SessionModal from './session_modal';

const MODAL_COMPONENTS = {
  'transaction': TransactionModal,
  'session': SessionModal
}

class ModalRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalType, modalProps, hideModal, currentUser,
            quote, logo, transactionData } = this.props;

    if (!modalType) return null;

    const TargetModal = MODAL_COMPONENTS[modalType]

    return <TargetModal modalOpen={modalProps.modalOpen}
                        formType={modalProps.formType}
                        transactionData={transactionData}
                        currentUser={currentUser}
                        quote={quote}
                        logo={logo}
                        hideModal={hideModal} />
  }

}

export default ModalRoot;
