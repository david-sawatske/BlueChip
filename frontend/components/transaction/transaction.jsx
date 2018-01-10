import React from 'react';

import { stringToInt } from '../../util/helper_functions'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = { symbol: "TEST",
                   share_quant: "",
                   share_price: "",
                   purchase_day: "",
                   user_id: 6,
                   league_id: 1,
                   cashBalance: 100000000,
                   balanceId: 16,
                   // user_id: this.props.currentUser.id,
                   // league_id: Number(this.props.leagueId),
                   // cashBalance: this.props.cashBalance,
                   // balanceId: Number(this.props.balanceId),
                   transactionType: "buy",
                   targetUserId: this.props.match.params.userId
                 };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const quote  = {
  "symbol": "GTLS",
  "companyName": "Chart Industries Inc.",
  "latestPrice": 100,
  "latestSource": "IEX real time price",
  "latestTime": "9:52:28 AM",
  "latestVolume": 13994,
  "change": 0.23,
  "changePercent": 0.00442,
  "avgTotalVolume": 277278,
  "marketCap": 1608096327,
  "peRatio": 100.5,
  "week52High": 53.1,
  "week52Low": 32.04,
  "ytdChange": 0.07522215333746643
}

    this.setState({
      symbol: quote.symbol,
      share_price: quote.latestPrice,
      purchase_day: new Date()
    })
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
        alert('Insufficient Balance for that trade') // Future Error Action
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
    const { currentUser } = this.props;
    const { targetUser } = this.props;
    const { leagueId } = this.props;
    const { leagueBalance } = this.props;
  console.log(this.state);

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
