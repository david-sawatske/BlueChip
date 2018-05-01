import React from 'react';

const UserAvatar = ({ userData }) => (
  <div className="avatar">
    <img src={userData.img_url} alt='user'/>
    <h1>{ userData.username }</h1>
  </div>
);

export default UserAvatar;
