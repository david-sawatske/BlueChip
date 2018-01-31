import React from 'react';

const UserAvatar = ({ userData }) => (
  <div className="avatar">
    <img src='https://picsum.photos/300?random' alt='user'/>
    <h1>{ userData.username }</h1>
  </div>
);

export default UserAvatar;
