import React from 'react';
import { Link } from 'react-router-dom';
import LeagueLeaderboardItem from './league_leaderboard_item';

class LeagueLeaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leagueUserData } = this.props;

    const sortedLeagueUserData = leagueUserData.sort((a, b) => {
      const totalAssetsA = a.cashInvested + a.cashBalance;
      const totalAssetsB = b.cashInvested + b.cashBalance;

      return (
        totalAssetsB - totalAssetsA
      )
    });

    return (
      <div className="">
        { sortedLeagueUserData.map((userObj, index) => {
          const rank = index + 1;

          return (
            <div key={index}>
              <div>
                <LeagueLeaderboardItem rank={rank}
                                       user={userObj} />
              </div>
            </div>
          )
        })}
      </div>
    )}
  }

export default LeagueLeaderboard;
