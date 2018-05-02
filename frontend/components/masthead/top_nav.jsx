import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'

const TopNav = ({ currentUser }) => {
  let HomeLink
  if (currentUser) {
    const userLink = `/users/${currentUser.id}`;
    HomeLink = <NavLink className="nav-link" to={userLink}>
                 My Home
               </NavLink>
  } else {
    HomeLink = <NavLink className="nav-link" to="/">Home</NavLink>
  }

  return (
    <div className="top-nav">
      {HomeLink}
      <NavLink className="nav-link" to="/leagues/new">Create a League</NavLink>
      <NavLink className="nav-link" to="/leagues">Join a League</NavLink>
      <NavLink className="nav-link" to="/stocks/search">Live Stock Data</NavLink>
    </div>
  )
}
export default TopNav;
