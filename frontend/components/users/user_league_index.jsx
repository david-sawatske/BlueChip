import React from 'react';
import { Route } from 'react-router-dom';

import UserLeaguePortfolio from '../user_league_portfolio/user_league_portfolio'

class UserLeagueIndex extends React.Component {
  constructor(props) {
    super(props);

    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { targetLeagueId: this.props.sampleLeagueId }
  }

  setShowLeague(e, leagueId) {
    e.preventDefault();

    this.setState({ targetLeagueId: leagueId })
  }

  render() {
    const { userLeagueData, currentUser } = this.props;
    const targetLeagueId = this.state.targetLeagueId;

    let ShowComponent
    if (userLeagueData[targetLeagueId]) {
      const targetLeague = userLeagueData[targetLeagueId];

      ShowComponent = <UserLeaguePortfolio key={targetLeague.leagueId}
                                           leagueData={targetLeague}
                                           currentUser={currentUser} />
    } else {
      ShowComponent = <h3>Select a League to View</h3>
    }

    return (
      <div className="">
        <ul>
          {Object.values(userLeagueData).map(league => (
              <button onClick={(e) => this.setShowLeague(e, league.leagueId)}
                      key={league.leagueId}>
                { league.name }
              </button>
            )
          )}
        </ul>

        { ShowComponent }
      </div>
    )
  }
};

export default UserLeagueIndex;
