const getLeagueUserIds = (userLeagueBalances, usersById, leagueId) => (
  Object.values(userLeagueBalances)
    .filter(joinObj => joinObj.leagueId === leagueId)
    .map(filteredObj => filteredObj.userId)
)

const getAssociatedData = (joinData, sourceData, userId, leagueId, sourceKey) => {
  const associatedData = Object.values(joinData)
                          .filter(obj => obj.userId === userId &&
                                         (obj.leagueId === leagueId ||
                                         leagueId === undefined)
                                  )
                          .map(obj2 => sourceData[obj2.id])

  return (associatedData.length === 1) ? associatedData[0][sourceKey] : associatedData;
}

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
      const bal = getAssociatedData(balAssocData, balancesById, userId, leagueId, 'balance')
      const transactions = getAssociatedData(transAssocData, transactionsById,
                                             userId, leagueId)
      let cashInvested = 0

      transactions.map(trasnaction => (
        cashInvested += ( trasnaction.sharePrice * trasnaction.shareQuant))
      )

      return { username: usersById[userId].username,
               id: userId,
               cashBalance: bal,
               cashInvested: cashInvested }
    })

    leagueUserData[leagueId]['leagueUserData'] = leagueBalance
  })

  return leagueUserData
}

export const getUserLeagueIds = ( state, userId ) => {
  let targetUserID;
  (state.session.currentUser) ? targetUserID = state.session.currentUser.id :
                                targetUserID = userId

  const userLeagueJoin = state.entities.userLeagueBalances.userLeagueBalancesById;

  return Object.values(userLeagueJoin)
    .filter(obj => obj.userId === targetUserID)
    .map(selectObj => selectObj.leagueId)
}
