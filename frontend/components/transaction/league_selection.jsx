import React, { Component } from 'react';

class LeagueSelection extends Component {
  constructor(props) {
    super(props);
  }

  returnButton(leagueData, className) {
    return (
      <button className={className}
              onClick={ (e) => this.props.setLeagueStateData(leagueData, e) }
              key={leagueData.leagueId}>

          { leagueData.name }
      </button>
);
  }

  render() {
    const { setLeagueStateData, leagueChoices, selectedLeague } = this.props;

    const leagueArr = []
    leagueChoices.map(leagueData => {
      if ( leagueData.name === selectedLeague ) {
        leagueArr.unshift(this.returnButton(leagueData, 'selected-league'))
      } else {
        leagueArr.push(this.returnButton(leagueData, 'league-option'))
      }
    })

    return (
      <div className="league-selector">
        { leagueArr }
      </div>
    );
  }

}

export default LeagueSelection;
