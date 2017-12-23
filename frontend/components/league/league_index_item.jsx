import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LeagueIndexItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { leagueId, leaguesById } = this.props;

    return (
      <div className="">
        <h2>{leaguesById[leagueId].name}</h2>
      </div>
    )
  }
}

export default LeagueIndexItem;
