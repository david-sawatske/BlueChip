import { merge } from 'lodash';

// START: Generic, reuseable selectors //
const getAssociatedIds = (joinData, targetIdKey, associatedIdKey, associatedId) => (
    Object.values(joinData)
    .filter(joinObj => joinObj[associatedIdKey] === associatedId)
    .map(filteredObj => filteredObj[targetIdKey])
)

const getAssociatedData = (joinData, sourceData, userId, leagueId, sourceKey) => {
  const associatedData = Object.values(joinData)
                          .filter(obj => obj.userId === userId &&
                                         (obj.leagueId === leagueId ||
                                         leagueId === undefined)
                                  )
                          .map(obj2 => sourceData[obj2[sourceKey]])

  const valueKey = sourceKey.slice(0, -2)
  if (associatedData.length == 1) {
    return { [valueKey]: associatedData[0][valueKey] }
  } else {
      return associatedData
  }
}
// END: Generic, reuseable selectors //

export const getUserLeagueIds = (state, userId) => {
  let targetUserID;
  (state.session.currentUser) ? targetUserID = state.session.currentUser.id :
                                targetUserID = userId

  const balAssocData = state.entities.userLeagueBalances.userLeagueBalancesById;

  return  getAssociatedIds(balAssocData, 'leagueId', 'userId', targetUserID)
}

// START: Selectors to pass to LeagueIndex Components //
export const getLeagueUserData = state => {
  const transactJoinData = state.entities.userLeagueTransactions.transactionsById;
  const transactionsById = state.entities.transactions.transactionsById;

  const balJoinData = state.entities.userLeagueBalances.userLeagueBalancesById;
  const balancesById = state.entities.cashBalances.balancesById;

  const leaguesById = state.entities.leagues.leaguesById;
  const usersById = state.entities.users.usersById;

  let leagueUserData


  Object.keys(leaguesById).map(leagueId => {
    leagueUserData = merge(leagueUserData, { [leagueId]: leaguesById[leagueId] })
  })

  Object.values(balJoinData).map(joinObj => {
    const userId = joinObj.userId
    const leagueId = joinObj.leagueId
    const balanceId = joinObj.balanceId
    const username = usersById[userId]['username']
    const cashBalance = balancesById[balanceId]['balance']
    const cashInvested = 0

    const userData = { [userId]: { userId, username, cashBalance, cashInvested }}

    const dataToMerge = merge(leagueUserData[leagueId]['leagueUserData'],
                              userData)

    leagueUserData[leagueId]['leagueUserData'] = dataToMerge
  })


  Object.values(transactJoinData).map(joinObj => {
    const userId = joinObj.userId
    const leagueId = joinObj.leagueId
    const currTransact = transactionsById[joinObj['transactionId']]

    const currInvested = (currTransact.shareQuant * currTransact.sharePrice)

    leagueUserData[leagueId]['leagueUserData'][userId]['cashInvested'] += currInvested
  })


  Object.keys(leaguesById).map(leagueId => {
    const asArray = Object.values(leagueUserData[leagueId]['leagueUserData'])

    leagueUserData[leagueId]['leagueUserData'] = asArray
  })

  return leagueUserData
}
// END: Selectors to pass to LeagueIndex Components //
