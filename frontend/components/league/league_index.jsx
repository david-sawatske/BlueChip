import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueIndexItem from './league_index_item_container'
import Loader from '../shared/loader';

class LeagueIndex extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestAllLeagues().then(data => {
      if (this.props.currentUser) {
        this.props.requestTargetUserData(this.props.currentUser.id)
      }
    })
  }

  render() {
    const { isLeagueLoading, requestTargetUserData, isUserLoading,
            currentUserLeagueIds, leagueIds, allLeaguesData } = this.props;

    let ShowComponent
    if ( isLeagueLoading || isUserLoading ) {
      ShowComponent = <Loader />
    } else {
        ShowComponent = leagueIds.map( id  => (
          <LeagueIndexItem currentUserLeagueIds={currentUserLeagueIds}
                           leagueData={allLeaguesData[id]}
                           key={id} />
        ))
    }

    return (
      <div className="index-page">
        <h1 className="index-title">League Leaderboards</h1>
        <ul className="league-index">
          { ShowComponent }
        </ul>
      </div>
    );
  }
}

export default LeagueIndex;
