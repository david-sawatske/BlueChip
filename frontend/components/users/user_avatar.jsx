import React from 'react';

const UserAvatar = ({ userData }) => (
  <div className="avatar">
    <h1>{ userData.username }</h1>
  </div>
);

export default UserAvatar;
