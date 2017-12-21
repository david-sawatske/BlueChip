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
    this.props.createLeague(this.state)
      .then(data => this.props.history.push(`/`));
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="league-new">
        <h2>Create a New League</h2>
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
          <button id="new-league">Create League</button>
        </form>
      </div>
    );
  }
}

export default withRouter(LeagueForm);
