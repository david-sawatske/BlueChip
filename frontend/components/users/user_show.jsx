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
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserData(nextProps.match.params.userId)
    }
  }

  render() {
    const { currentUser, isRailsUserLoading, userData } = this.props;
    const targetUserId = this.props.match.params.userId;

    let ShowComponent
    if (isRailsUserLoading) {
      ShowComponent = <Loader />
    } else if (userData[targetUserId]) {
        const targetUserData = userData[targetUserId];

        ShowComponent =
          <div>
              <UserAvatar userData={{ id: targetUserData.id,
                                      username: targetUserData.username }} />

              <UserLeagueIndex userLeagueData={targetUserData.userLeagueData}
                               currentUser={currentUser} />
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
