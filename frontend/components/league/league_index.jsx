import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueShow from './league_show_container';
import LeagueIndexItem from './league_index_item';
import Loader from '../shared/loader';

import { arrSample } from '../../util/helper_functions'

class LeagueIndex extends Component {
  constructor(props) {
    super(props)

    this.state = { containerClass: "index-only",
                   activeLeagueId: null };

    this.setLeagueData = this.setLeagueData.bind(this)
  }

  componentWillMount() {
    const { requestAllLeagues, requestTargetUserData,
            currentUser, currentPath, leagueIds } = this.props;
    const randomLeagueId = arrSample(leagueIds);

    requestAllLeagues().then(data => {
      if (currentUser) {
        requestTargetUserData(currentUser.id)
      }
    })

    if (currentPath) {
        this.setState({ activeLeagueId: randomLeagueId,
                        containerClass: "league-show" })
    }
  }

  setLeagueData(id, newClass, event) {
    event.preventDefault();

    this.props.requestTargetLeague(id).then(() => {
      this.setState({ containerClass: newClass,
                      activeLeagueId: id })
    })
  }

  render() {
    const { isLeagueLoading, requestTargetUserData, isUserLoading,
            currentUserLeagueIds, leagueIds, allLeaguesData } = this.props;

    let LeagueDisplay
    let ActiveLeague
    if ( isLeagueLoading || isUserLoading ) {
      LeagueDisplay = <Loader />
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
