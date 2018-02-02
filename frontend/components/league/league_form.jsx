import React from 'react';
import { withRouter } from 'react-router-dom';

class LeagueForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      starting_balance: ""
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createLeague(this.state).then(leagueData => {
      const newLeagueObj = Object.values(leagueData.leagues.leaguesById)[0]
      const cashBalance = { balance: newLeagueObj.startingBalance,
                            user_id: this.props.currentUser.id,
                            league_id: newLeagueObj.id }

     this.props.createCashBalance(cashBalance).then(balanceData => {
       const newBalanceObj = Object.values(balanceData.targetBalance
                                                      .userLeagueBalances
                                                      .userLeagueBalancesById)[0]

       this.props.requestTargetUserData(newBalanceObj.user_id).then(userData => {
        this.props.history.push(`/users/${newBalanceObj.user_id}`);
       })
     })
    })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
  const currentUser = this.props.currentUser;
  let LeagueFormInput;

  if (currentUser) {
    LeagueFormInput =
      <form className="league-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.name}
          placeholder="League Name"
          onChange={this.update('name')}
          className="text-input"
        />
        <input
          type="number"
          value={this.state.starting_balance}
          placeholder="Starting Cash Balance"
          onChange={this.update('starting_balance')}
          className="number-input"
        />
        <input type="submit"
               value="Create League" />
    </form>
  } else {
    LeagueFormInput = <h2>Please Login or Sign Up to create a League</h2>
  }

    return (
      <div className="league-new-container">
        <div className="league-new">
          <h1>Create a New League</h1>
          { LeagueFormInput }
        </div>
      </div>
    );
  }
}

export default withRouter(LeagueForm);
