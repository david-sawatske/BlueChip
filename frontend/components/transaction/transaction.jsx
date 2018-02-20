import React from 'react';

import StockHeader from '../stock_show/stock_header';
import TransactionData from './transaction_data'
import StockSummary from '../stock_show/stock_summary';

import { stringToInt } from '../../util/helper_functions'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = { targetUserId: this.props.currentUser.id };

    this.setLeagueStateData = this.setLeagueStateData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    const quote = (this.props.quote) ? this.props.quote : {};
    const newState = { symbol: quote.symbol,
                       share_quant: "",
                       share_price: quote.latestPrice,
                       purchase_day: new Date(),
                       user_id: this.state.targetUserId,
                       league_id: '',
                       cashBalance: '',
                       balanceId: '',
                       showLeagueData: false,
                       transactionType: 'buy'
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

    this.props.requestTargetUserData(this.state.user_id)
  }

  setLeagueStateData(event) {
    event.preventDefault();
    const { userLeagueData } = this.props.targetUserData;
    const leagueData = Object.values(userLeagueData)[event.target.value];

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
    const { targetUserData, currentUser, quote, logo } = this.props;
    const targetUserId = currentUser.id;

    const LeagueChoices = [<option>Select League</option>];
    Object.values(targetUserData.userLeagueData).map((leagueData, idx) => {
      LeagueChoices.push(
        <option value={ idx } key={ idx }>
          { leagueData.name }
        </option>
      )
    })

    let TransactonInfo
    if (this.state.showLeagueData) {
      const leagueData = targetUserData['userLeagueData']
                                       [this.state.league_id]
      const currStockTransactions = Object.values(leagueData['transactionData']
                                                            [this.state.symbol])

      TransactonInfo = <TransactionData leagueName={leagueData.name}
                                        balance={leagueData.balance}
                                        transactData={currStockTransactions}
                                        quote={quote} />
    }

    let StockData
    if (quote && logo) {
       StockData = <StockHeader quote={quote}
                                logo={logo} />
    }

    return (
      <div className="transaction">
        { StockData }
        { TransactonInfo }

        <select onChange={ (e) => this.setLeagueStateData(e) }
                className="league-selector">
          { LeagueChoices }
        </select>

        <form onSubmit={this.handleSubmit} className="transaction-form">
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
