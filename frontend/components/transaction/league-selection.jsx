import React, { Component } from 'react';

class LeagueSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setLeagueStateData, leagueChoices } = this.props;

    return (
      <div>
        { leagueChoices.map(leagueData => (
          <button className="tran-league-button"
                  onClick={ (e) => setLeagueStateData(leagueData, e) }
                  key={leagueData.leagueId}>

              { leagueData.name }
          </button>
        )) }
      </div>
    );
  }

}

export default LeagueSelection;
