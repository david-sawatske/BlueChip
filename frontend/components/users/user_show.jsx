import React from 'react';

import UserLeagueIndex from './user_league_index';
import UserAvatar from './user_avatar';
import Loader from '../shared/loader';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  fetchUserData(userId) {
    this.props.requestTargetUserData(userId);
  }

  componentWillMount() {
    this.fetchUserData(this.props.match.params.userId)

    if (this.props.currentUserId) {
      this.fetchUserData(this.props.currentUserId)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserData(nextProps.match.params.userId)
    }
  }

  render() {
    const { isRailsUserLoading, userData } = this.props;
    const targetUserId = this.props.match.params.userId;

    let ShowComponent
    if (isRailsUserLoading) {
      ShowComponent = <Loader />
    } else if (userData[targetUserId]) {
        const targetUserData = userData[targetUserId];
        const sampleLeagueId = Object.keys(targetUserData.userLeagueData)[0]

        ShowComponent =
          <div>
              <UserAvatar userData={{ id: targetUserData.id,
                                      username: targetUserData.username }} />

              <UserLeagueIndex userLeagueData={targetUserData.userLeagueData}
                               sampleLeagueId={sampleLeagueId} />
          </div>
    }

    return (
      <div className="">
        <h1>{ ShowComponent }</h1>
      </div>
    )
  }
}

export default UserShow;
