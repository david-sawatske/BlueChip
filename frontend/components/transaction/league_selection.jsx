import React, { Component } from 'react';

class LeagueSelection extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { setLeagueStateData, leagueChoices, selectedLeague } = this.props;

    return (
      <div>
        { leagueChoices.map(leagueData => {
          if ( leagueData.name != selectedLeague ) {
            return (
              <button className="select-league-button"
                      onClick={ (e) => setLeagueStateData(leagueData, e) }
                      key={leagueData.leagueId}>

                  { leagueData.name }
              </button>
            )
          }
        }) }
      </div>
    );
  }

}

export default LeagueSelection;
