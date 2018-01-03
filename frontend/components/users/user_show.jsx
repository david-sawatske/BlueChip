import React from 'react';

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
    const { currentUser, usersById, isRailsUserLoading } = this.props;
    const targetUserId = this.props.match.params.userId;

    let ShowComponent
    if (isRailsUserLoading) {
      ShowComponent = <Loader />
    } else if (usersById[targetUserId]) {
        ShowComponent = <UserAvatar userData={usersById[targetUserId]} />
    }

    return (
      <div className="">
        <h1>{ ShowComponent }</h1>
      </div>
    )
  }
}

export default UserShow;
