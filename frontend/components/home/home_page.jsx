import React from 'react';
import { Link } from 'react-router-dom';

import LeagueIndexItem from '../league/league_index_item'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestSampleLeague('random')
  }

  render()  {
    const { currentUser, leagueData, leagueIds } = this.props;
    const sampleLeagueId = leagueIds[Math.floor(Math.random() * leagueIds.length)];

    let leaderBoard = null;
    if (sampleLeagueId) {
      leaderBoard = <LeagueIndexItem league={leagueData[sampleLeagueId]}
                                     key={sampleLeagueId}/>
    } else {
      leaderBoard = <div>loading</div>
    }

    return (
      <div className="">
        <h1>Home</h1>
        <section id="">
          <div className="">
            <h3>Check leaderboars to see where you rank</h3>
            <div>
              {leaderBoard}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default HomePage;
