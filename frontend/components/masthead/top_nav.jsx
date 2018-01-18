import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'

const TopNav = ({ currentUser }) => {
  let myLeaguesLink
  if (currentUser) {
    myLeaguesLink = <NavLink className="nav-link" to={myLeaguesLink}> My Leagues</NavLink>
  }

  return (
    <div className="top-nav">
      <NavLink className="nav-link" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/leagues/new">Create a League</NavLink>
      <NavLink className="nav-link" to="/leagues">Join a League</NavLink>
      <NavLink className="nav-link" to="/stocks/search">Live Stock Data</NavLink>
    </div>
  )
}
export default TopNav;
