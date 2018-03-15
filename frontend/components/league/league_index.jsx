import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueShow from './league_show_container';
import LeagueIndexItem from './league_index_item';
import Loader from '../shared/loader';

class LeagueIndex extends Component {
  constructor(props) {
    super(props)

    this.state = { activeLeagueId: null };

    this.setLeagueId = this.setLeagueId.bind(this)
  }

  componentWillMount() {
    this.props.requestAllLeagues().then(data => {
      if (this.props.currentUser) {
        this.props.requestTargetUserData(this.props.currentUser.id)
      }
    })
  }

  setLeagueId(id, event) {
    event.preventDefault();

    this.setState({ activeLeagueId: id })
  }

  render() {
    const { isLeagueLoading, requestTargetUserData, isUserLoading,
            currentUserLeagueIds, leagueIds, allLeaguesData } = this.props;

    let ShowComponent
    if ( isLeagueLoading || isUserLoading ) {
      ShowComponent = <Loader />
    } else if (this.state.activeLeagueId) {
      const id = this.state.activeLeagueId;
        ShowComponent =
          <LeagueShow currentUserLeagueIds={currentUserLeagueIds}
                      setLeagueId={this.setLeagueId}
                      leagueData={allLeaguesData[id]}
                      key={id} />
    } else {
      ShowComponent = leagueIds.map( id  => (
        <LeagueIndexItem leagueData={allLeaguesData[id]}
                         setLeagueId={this.setLeagueId}
                         key={id} />
      ))
    }

    return (
      <div className="index-page">
        <h1> {this.state.activeLeagueId}</h1>
        <h1 className="index-title">League Leaderboards</h1>
        <ul className="league-index">
          { ShowComponent }
        </ul>
      </div>
    );
  }
}

export default LeagueIndex;
