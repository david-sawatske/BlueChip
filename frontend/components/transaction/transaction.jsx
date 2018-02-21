import React from 'react';

import TransactionData from './transaction_data'
import LeagueSelection from './league_selection';
import StockHeader from '../stock_show/stock_header';
import StockSummary from '../stock_show/stock_summary';

import { stringToInt } from '../../util/helper_functions'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };

    this.setLeagueStateData = this.setLeagueStateData.bind(this);
    this.setLeagueClicked = this.setLeagueClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);


    this.toggleTransaction = this.toggleTransaction.bind(this);
  }

  componentWillMount() {
    const quote = (this.props.quote) ? this.props.quote : {};
    const newState = { symbol: quote.symbol,
                       share_quant: "",
                       share_price: quote.latestPrice,
                       purchase_day: new Date(),
                       user_id: this.props.currentUser.id,
                       league_id: '',
                       cashBalance: '',
                       balanceId: '',
                       showLeagueData: false,
                       transactionType: 'buy',
                       leagueClicked: false,
                       leagueBtnVal: "Select League"
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

  setLeagueStateData(leagueData, event) {
    event.preventDefault();

    this.setState({ league_id: leagueData['leagueId'],
                    cashBalance: leagueData['balance'],
                    balanceId: leagueData['balanceId'],
                    showLeagueData: true,
                    leagueClicked: false,
                    leagueBtnVal: leagueData.name
                   })
  }

  setLeagueClicked() {
    this.setState({ leagueClicked: true })
  }

  update(field) {
    return e => this.setState({
      [field]: stringToInt(e.currentTarget.value)
    });
  }

  toggleTransaction() {
    const newType = ( this.state.transactionType === "buy" ) ? "sell" : "buy"

    this.setState({ transactionType: newType })
  }

  render() {
    const { targetUserData, currentUser, quote, logo } = this.props;
    const targetUserId = currentUser.id;

    const leagueChoices = Object.values(targetUserData.userLeagueData)

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

    let LeagueButtons
    if (this.state.leagueClicked === true) {
      LeagueButtons = <LeagueSelection leagueChoices={leagueChoices}
                                       selectedLeague={this.state.leagueBtnVal}
                                       setLeagueStateData={this.setLeagueStateData} />
    } else {
      LeagueButtons = <div className="league-selector">
                        <button onClick={ this.setLeagueClicked }
                                className="selected-league">
                          { this.state.leagueBtnVal }
                        </button>
                      </div>
    }

    return (
      <div className="transaction">
        { StockData }
        { LeagueButtons }
        { TransactonInfo }

        <form onSubmit={this.handleSubmit} className="transaction-form">
          <input type="text"
                 placeholder="Share Quantitiy"
                 value={this.state.share_quant}
                 onChange={this.update('share_quant')} />
         <label className="switch">
           <input type="checkbox"
                  onChange={this.toggleTransaction} />
           <span className="slider"></span>
         </label>

        <input type="submit"
               value={this.state.transactionType}
               className="button" />
      </form>
    </div>
  );
  }
}

export default Transaction;
