const getLeagueUserIds = (userLeagueBalances, usersById, leagueId) => (
  Object.values(userLeagueBalances)
    .filter(joinObj => joinObj.leagueId === leagueId)
    .map(filteredObj => filteredObj.userId)
)

const getAssociatedData = (joinData, sourceData, userId, leagueId) => (
  Object.values(joinData)
  .filter(obj => obj.userId === userId &&
    (obj.leagueId === leagueId || leagueId === undefined))
  .map(obj2 => sourceData[obj2.id])
)

export const getLeagueUserData = state => {
  const leagueUserData = {};

  state.entities.leagues.allLeagueIds.map(leagueId => {
    const balAssocData = state.entities.userLeagueBalances.userLeagueBalancesById;
    const transAssocData = state.entities.userLeagueTransactions.transactionsById;
    const currLeague = state.entities.leagues.leaguesById[leagueId];
    const balancesById = state.entities.cashBalances.balancesById;
    const transactionsById = state.entities.transactions.transactionsById;
    const usersById = state.entities.users.usersById;

    const leagueUsers = getLeagueUserIds(balAssocData, usersById, leagueId)

    leagueUserData[leagueId] = currLeague

    const leagueBalance = leagueUsers.map(userId => {
      const bal = getAssociatedData(balAssocData, balancesById, userId, leagueId)[0].balance
      const trans = getAssociatedData(transAssocData, transactionsById, userId, leagueId)
      let cashInvested = 0

      trans.map(t => cashInvested += (t.sharePrice * t.shareQuant))

      return { username: usersById[userId].username,
               id: userId,
               cashBalance: bal,
               cashInvested: cashInvested }
    })

    leagueUserData[leagueId]['leagueUserData'] = leagueBalance
  })

  return leagueUserData
}
