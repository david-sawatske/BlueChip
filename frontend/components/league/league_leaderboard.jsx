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
        { sortedLeagueUserData.map((user, index) => {
          const rank = index + 1;

            if (user.id) {
              return (
              <div key={index}>
                <div>
                  <LeagueLeaderboardItem rank={rank}
                                         userData={user} />
                </div>
              </div>
            )
          }
        })}
      </div>
    )}
  }

export default LeagueLeaderboard;
