import React from 'react';

import TransactionData from './transaction_data'

import { stringToInt } from '../../util/helper_functions'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };

    this.setLeagueStateData = this.setLeagueStateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const quote = (this.props.quote) ? this.props.quote : {};
    const targetUserData = this.props.targetUserData;
    const targetUserId = Object.keys(targetUserData)[0]
    const newState = { symbol: quote.symbol,
                       share_quant: "",
                       share_price: quote.latestPrice,
                       purchase_day: new Date(),
                       user_id: targetUserId,
                       league_id: '',
                       cashBalance: '',
                       balanceId: '',
                       showLeagueData: false
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

  setLeagueStateData(leagueData, event) {
    event.preventDefault();

    this.setState({ league_id: leagueData['leagueId'],
                    cashBalance: leagueData['balance'],
                    balanceId: leagueData['balanceId'],
                    showLeagueData: true })
  }

  update(field) {
    return e => this.setState({
      [field]: stringToInt(e.currentTarget.value)
    });
  }

  render() {
    const { targetUserData, quote } = this.props;
    const targetUserId = Object.keys(targetUserData)[0];

    const LeagueChoices = [];

    Object.values(targetUserData).map( data => {
      Object.values(data.userLeagueData).map( leagueData => {
        LeagueChoices.push(
          <button className="button"
                  onClick={ (e) => this.setLeagueStateData(leagueData, e) }
                  key={leagueData.leagueId}>

              { leagueData.name }
          </button>
        )
      })
    })

    let TransactonInfo
    if (this.state.showLeagueData) {
      const leagueData = targetUserData[targetUserId]
                                       ['userLeagueData']
                                       [this.state.league_id]
      const currStockTransactions = Object.values(leagueData['transactionData']
                                                            [this.state.symbol])

      TransactonInfo = <TransactionData leagueName={leagueData.name}
                                        balance={leagueData.balance}
                                        transactData={currStockTransactions}
                                        quote={quote} />
    }

    return (
      <div>
        { LeagueChoices }
        { TransactonInfo }

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
