import React  from 'react';

import SessionModal from './session_modal';

const MODAL_COMPONENTS = {
  'session': SessionModal
}

class ModalRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalType, modalProps, hideModal, currentUser } = this.props;

    if (!modalType) return null;

    const TargetModal = MODAL_COMPONENTS[modalType]

    return <TargetModal modalOpen={modalProps.modalOpen}
                        formType={modalProps.formType}
                        currentUser={currentUser}
                        hideModal={hideModal} />
  }

}

export default ModalRoot;
