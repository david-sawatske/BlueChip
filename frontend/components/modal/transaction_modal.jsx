import React from 'react';
import Modal from 'react-modal';

import Transaction from '../transaction/transaction_container';

import { ModalStyle } from './modal_shared';

class TransactionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: null
    }
  }

  render() {
    const { modalOpen, hideModal, quote, logo,
            transactionData } = this.props;

    return (
      <div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={hideModal}
          style={ModalStyle}>

          <h1>Transaction</h1>

          <Transaction transactionData={transactionData}
                       quote={quote}
                       logo={logo} />
        </Modal>
      </div>
    );
  }
}

export default TransactionModal;
