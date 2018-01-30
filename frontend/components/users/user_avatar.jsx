import React from 'react';

const UserAvatar = ({ userData }) => (
  <div className="avatar">
    <h1>{ userData.username }</h1>

    <img src='https://picsum.photos/300?random' alt='user'/>
  </div>
);

export default UserAvatar;
