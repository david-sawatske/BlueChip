import React from 'react';

import UserLeagueIndex from './user_league_index';
import UserAvatar from './user_avatar';
import Loader from '../shared/loader';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestTargetUserData(this.props.match.params.userId)
  }

  componentWillUpdate(nextProps) {
    const currUserId = this.props.match.params.userId;
    const nextUserId = nextProps.match.params.userId;

    if ( currUserId !== nextUserId ) {
      this.props.requestTargetUserData(nextUserId);
    }
  }

  render() {
    const { userData, match  } = this.props;
    const targetUserId = match.params.userId;

    let ShowComponent
    if (userData[targetUserId]) {
      const targetUserData = userData[targetUserId];
      const sampleLeagueId = Object.keys(targetUserData.userLeagueData)[0]

      ShowComponent =
        <div className="user-show">
            <UserAvatar userData={{ id: targetUserData.id,
                                    username: targetUserData.username,
                                    img_url: targetUserData.img_url }} />

            <UserLeagueIndex sampleLeagueId={sampleLeagueId}
                             userLeagueData={targetUserData.userLeagueData} />
        </div>
    } else {
      ShowComponent = <Loader />
    }

    return (
      <div className="user-show-container">
        { ShowComponent }
      </div>
    )
  }
}

export default UserShow;
