import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueShow from './league_show_container';
import LeagueIndexItem from './league_index_item';
import Loader from '../shared/loader';

class LeagueIndex extends Component {
  constructor(props) {
    super(props)

    this.state = { activeLeagueId: 1,
                   containerClass: "league-show" };

    this.setLeagueData = this.setLeagueData.bind(this)
  }

  componentWillMount() {
    this.props.requestAllLeagues().then(data => {
      if (this.props.currentUser) {
        this.props.requestTargetUserData(this.props.currentUser.id)
      }
    })
  }

  setLeagueData(id, newClass, event) {
    event.preventDefault();

    this.setState({ activeLeagueId: id,
                    containerClass: newClass })
  }

  render() {
    const { isLeagueLoading, requestTargetUserData, isUserLoading,
            currentUserLeagueIds, leagueIds, allLeaguesData } = this.props;

    let LeagueDisplay
    let ActiveLeague
    if ( isLeagueLoading || isUserLoading ) {
      ActiveLeague = <Loader />
    } else if (this.state.activeLeagueId && allLeaguesData) {
      const id = this.state.activeLeagueId;
      LeagueDisplay = leagueIds.map( id  => (
        <LeagueIndexItem setLeagueData={this.setLeagueData}
                         leagueData={allLeaguesData[id]}
                         key={id} />
      ))

        ActiveLeague =
          <LeagueShow currentUserLeagueIds={currentUserLeagueIds}
                      setLeagueData={this.setLeagueData}
                      leagueData={allLeaguesData[id]}
                      key={id} />

          LeagueDisplay

    } else if (allLeaguesData) {
      LeagueDisplay = leagueIds.map( id  => (
        <LeagueIndexItem setLeagueData={this.setLeagueData}
                         leagueData={allLeaguesData[id]}
                         key={id} />
      ))
    }

    return (
      <div className={this.state.containerClass}>
        <h1 className="index-title">Leagues</h1>
        <ul className="league-index">
          { LeagueDisplay }
        </ul>

        { ActiveLeague }
      </div>
    );
  }
}

export default LeagueIndex;
