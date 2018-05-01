import React from 'react';

import TransactionData from './transaction_data';
import LeagueSelection from './league_selection';
import StockHeader from '../stock_show/stock_header';
import StockSummary from '../stock_show/stock_summary';

import { stringToInt } from '../../util/helper_functions';

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    const quote = (this.props.quote) ? this.props.quote : {};

    this.state = { symbol: quote.symbol,
                   shareQuant: '',
                   sharePrice: quote.latestPrice,
                   purchaseDay: new Date(),
                   userId: this.props.currentUser.id,
                   leagueId: '',
                   cashBalance: '',
                   quantOwned: 0,
                   balanceId: '',
                   showLeagueData: false,
                   transactionType: 'buy',
                   leagueClicked: false,
                   leagueBtnVal: 'Select League ▾'
                  };

    this.setLeagueStateData = this.setLeagueStateData.bind(this);
    this.setLeagueClicked = this.setLeagueClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);

    this.toggleTransaction = this.toggleTransaction.bind(this);
  }

  transactionVerification() {
    const { shareQuant, sharePrice,
            quantOwned, transactionType, cashBalance  } = this.state;
    const netShareQuant = transactionType === 'buy' ? shareQuant
                                                      :
                                                      -Math.abs(shareQuant)
    const netBalance = (cashBalance - netShareQuant * sharePrice)

    let verifiedData = { netBalance: netBalance,
                         netShareQuant: netShareQuant }

    let alertString = 'Sale'
    switch (transactionType) {
      case 'buy':
        alertString = 'Purchase';
        if (netBalance < 0) {
          alert("Insuffecient funds available")
          return false
        } else {
          return verifiedData
        }
        break;
      case 'sell':
        if (quantOwned === 0) {
          alert(`You do not own ${'TKR'}`)
          return false
        } else if (quantOwned < shareQuant) {
          alert(`Only ${quantOwned} can be sold`)
          return false
        } else {
          return verifiedData
        }
        break;
      default:
        return false
    }
  }

  transactionProcessor(verifiedData) {
    const { symbol, purchaseDay, sharePrice,
            leagueId, userId, balanceId } = this.state;

    const { netBalance, netShareQuant } = verifiedData;

    const transactionData = { purchase_day: purchaseDay,
                              share_quant: netShareQuant,
                              share_price: sharePrice,
                              league_id: leagueId,
                              user_id: userId,
                              symbol: symbol }

    this.props.postTransaction(transactionData)
      .then(() => {
        this.props.updateCashBalance({ league_id: leagueId,
                                       user_id: userId,
                                       id: balanceId,
                                       balance: netBalance })
        .then(() => {
         this.props.requestTargetUserData(userId)
       })
    })
  }

  successAlert() {
    const { transactionType, shareQuant, symbol } = this.state;

    let alertString = 'Sale'
    if (transactionType === 'buy') {
      alertString = 'Purchase'
    }

    alert(`${alertString} of ${Math.abs(shareQuant)} shares of ${symbol} complete`)
    this.props.hideModal();
  }

  handleSubmit(event) {
    event.preventDefault();

    const { shareQuant, symbol } = this.state;
    const verifiedData = this.transactionVerification();

    if (verifiedData) {
      this.transactionProcessor(verifiedData)

      this.successAlert()
    }
  }

  setLeagueStateData(leagueData, event) {
    event.preventDefault();

    const leagueTargetStock = this.props.targetUserData
                                        .userLeagueData
                                        [leagueData.leagueId]
                                        ['transactionData']
                                        [this.state.symbol]

    let quantOwned = 0;
    if (leagueTargetStock) {
      Object.values(leagueTargetStock).map(transactObj => {
          quantOwned += transactObj.shareQuant;
      })
    }

    this.setState({ leagueId: leagueData['leagueId'],
                    cashBalance: leagueData['balance'],
                    balanceId: leagueData['balanceId'],
                    leagueBtnVal: leagueData.name,
                    quantOwned: quantOwned,
                    showLeagueData: true,
                    leagueClicked: false
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
    const quant = this.state.shareQuant;

    const newValues = ( this.state.transactionType === "buy" ) ?
    { transactionType: "sell" }
      :
    { transactionType: "buy"}

    this.setState(newValues)
  }

  render() {
    const { targetUserData, currentUser, quote, logo, transactionData } = this.props;
    const targetUserId = currentUser.id;

    const leagueChoices = Object.values(targetUserData.userLeagueData)

    let TransactonInfo;
    let TransactionForm;
    if (this.state.showLeagueData) {
      const leagueData = targetUserData['userLeagueData']
                                       [this.state.leagueId]
      const leagueStockData = leagueData[this.state.symbol]

      const currStockTransactions = (leagueStockData) ? Object.values(leagueStockData)
                                                         :
                                                       [];

      TransactonInfo = <TransactionData leagueName={leagueData.name}
                                        balance={leagueData.balance}
                                        quantOwned={this.state.quantOwned}
                                        quote={quote} />

      TransactionForm = <form onSubmit={this.handleSubmit}
                              className="transaction-form">
                          <input type="number"
                                 placeholder="Share Quantitiy"
                                 value={Math.abs(this.state.shareQuant)}
                                 onChange={this.update('shareQuant')} />
                         <label className="switch">
                           <input type="checkbox"
                                  onChange={this.toggleTransaction} />
                           <span className="slider"></span>
                         </label>

                        <input type="submit"
                               value={this.state.transactionType}
                               className="button" />
                      </form>
    }

    let StockData;
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
        { TransactionForm }
    </div>
  );
  }
}

export default Transaction;
