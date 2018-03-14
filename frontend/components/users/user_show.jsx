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
    if (!this.props.userId) {
      this.fetchUserData(this.props.match.params.userId)
    }

    if (this.props.currentUser) {
      this.fetchUserData(this.props.currentUser.id)
    }
  }

  componentWillUpdate(nextProps) {
    if ( !this.props.userId && nextProps.match.params.userId !==
                               this.props.match.params.userId )
      {
        this.fetchUserData(nextProps.match.params.userId)
      }
  }

  render() {
    const { isRailsUserLoading, userData, userId } = this.props;
    const targetUserId = userId || this.props.match.params.userId;

    let ShowComponent
    if (isRailsUserLoading) {
      ShowComponent = <Loader />
    } else if (userData[targetUserId]) {
        const targetUserData = userData[targetUserId];
        const sampleLeagueId = Object.keys(targetUserData.userLeagueData)[0]

        ShowComponent =
          <div className="user-show">
              <UserAvatar userData={{ id: targetUserData.id,
                                      username: targetUserData.username }} />

              <UserLeagueIndex userLeagueData={targetUserData.userLeagueData}
                               sampleLeagueId={sampleLeagueId} />
          </div>
    }

    return (
      <div className="user-show-container">
        { ShowComponent }
      </div>
    )
  }
}

export default UserShow;
