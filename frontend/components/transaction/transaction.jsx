import React from 'react';

import { stringToInt } from '../../util/helper_functions'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const newState = { symbol: "",
                       share_quant: "",
                       share_price: "",
                       purchase_day: "",
                       user_id: "",
                       league_id: "",
                       cashBalance: "",
                       balanceId: "",
                       user_id: "",
                       league_id: '',
                       cashBalance: '',
                       balanceId: '',
                     };

  this.setState(newState)
  }

  transactionVerification() {
    const transactionAmount = (this.state.share_price * this.state.share_quant);
    const netBalance = (this.state.cashBalance - transactionAmount);

    return (netBalance >= transactionAmount) ?
      { ['id']: this.state.balanceId, ['balance']: netBalance }
        :
      null  // Action to render Errors in future
  }

  transactionProcessor() {
    const updatedBalance = this.transactionVerification();

    if (updatedBalance) {
      this.props.postTransaction(this.state)
      this.props.updateCashBalance(updatedBalance)
    } else {
        alert('Insufficient Balance for that trade') // Future Error Action return
      }
    this.setState({
      share_quant: ""
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const share_quant = this.state.share_quant;
    const transactionType = this.state.transactionType;

    if (transactionType === 'sell') {
      this.setState(
        { 'share_quant': (this.state.share_quant * -1) }, () => (
          this.transactionProcessor()
        )
      )
    } else if (transactionType === 'buy') (
      this.transactionProcessor()
    )
  }

  update(field) {
    return e => this.setState({
      [field]: stringToInt(e.currentTarget.value)
    });
  }

  render() {
    const { targetUserData, quote } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="">
            <label>Share Quantity:
              <input type="number"
                value={this.state.share_quant}
                onChange={this.update('share_quant')}
                className=""
              />
            </label>
            <label>Transaction Type:
              <select onChange={this.update('transactionType')}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </label>
          <input type="submit" value="Submit Transacton" />
        </form>
      </div>
    );
  }
}

export default Transaction;
