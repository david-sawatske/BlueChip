import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LeagueIndexItem from './league_index_item'
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
    const { isLeagueLoading, requestTargetUserData, currentUserLeagueIds,
            isUserLoading, leagueData, createCashBalance,
            currentUser } = this.props;

    let ShowComponent
    if ( isLeagueLoading || isUserLoading ) {
      ShowComponent = <Loader />
    } else {
        ShowComponent = Object.keys(leagueData).map(leagueId => (
          <LeagueIndexItem requestTargetUserData={requestTargetUserData}
                           currentUserLeagueIds={currentUserLeagueIds}
                           createCashBalance={createCashBalance}
                           league={leagueData[leagueId]}
                           currentUser={currentUser}
                           key={leagueId}/>
      ))




      ///// LeagueIndexItemContainer ???? ///

    }

    return (
      <div className="">
        <h1 className="">All Leagues</h1>
        <ul className="">
          { ShowComponent }
        </ul>
      </div>
    );
  }
}

export default LeagueIndex;
