import { merge } from 'lodash';

// START: Generic, reuseable selectors //
const getAssociatedIds = (joinData, targetIdKey, associatedIdKey, associatedId) => (
    Object.values(joinData)
    .filter(joinObj => joinObj[associatedIdKey] == associatedId)
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
  let targetUserId;
  (state.session.currentUser) ? targetUserId = state.session.currentUser.id :
                                targetUserId = userId

  const balAssocData = state.entities.userLeagueBalances.userLeagueBalancesById;

  return  getAssociatedIds(balAssocData, 'leagueId', 'userId', targetUserId)
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
    const totalEquity = cashBalance
    const cashInvested = 0

    const userData = { [userId]: { userId, username, cashBalance, cashInvested, totalEquity }}

    const dataToMerge = merge(leagueUserData[leagueId]['leagueUserData'],
                              userData)

    leagueUserData[leagueId]['leagueUserData'] = dataToMerge
  })


  Object.values(transactJoinData).map(joinObj => {
    const userId = joinObj.userId
    const leagueId = joinObj.leagueId
    const totalEquity = leagueUserData[leagueId]['totalEquity']
    const currTransact = transactionsById[joinObj['transactionId']]

    const currInvested = (currTransact.shareQuant * currTransact.sharePrice)

    leagueUserData[leagueId]['leagueUserData'][userId]['cashInvested'] += currInvested
    leagueUserData[leagueId]['leagueUserData'][userId]['totalEquity'] += currInvested
  })


  Object.keys(leaguesById).map(leagueId => {
    const asArray = Object.values(leagueUserData[leagueId]['leagueUserData'])

    leagueUserData[leagueId]['leagueUserData'] = asArray
  })

  return leagueUserData
}
// END: Selectors to pass to LeagueIndex Components //

// START: Selectors to pass to UserShow Components //
const idNamer = (obj, type) => {
  const newObj = Object.assign({}, obj);

  newObj[`${type}Id`] = obj.id;
  delete newObj.id;

  return newObj
};

export const getUserLeagueData = (state, targetUser) => {
  const userLeagueData = {};
  const usersById = state.entities.users.usersById;

  let targetUserIds
  (targetUser) ? targetUserIds = [targetUser.id]
                  :
                 targetUserIds = state.entities.users.allUserIds;

  targetUserIds.map(userId => {
    userLeagueData[userId] = merge(usersById[userId], { userLeagueData: {} })
  })

  const userLeagueBalances = state.entities.userLeagueBalances.userLeagueBalancesById;
  const userLeagueTransactions = state.entities.userLeagueTransactions.transactionsById;
  const transactions = state.entities.transactions.transactionsById;
  const cashBalances = state.entities.cashBalances.balancesById;
  const leagues = state.entities.leagues.leaguesById;


  Object.values(userLeagueBalances).map(joinObj => {
    const joinUserId = joinObj.userId;
    const joinLeagueId = joinObj.leagueId;

    if (userLeagueData[joinUserId]) {
      const leagueBalanceData = merge(idNamer(cashBalances[joinObj.balanceId], 'balance'),
                                      idNamer(leagues[joinObj.leagueId], 'league'),
                                      { transactionData: {} })

      userLeagueData[joinUserId]['userLeagueData'][joinLeagueId] = leagueBalanceData;
    }

  })

  Object.values(userLeagueTransactions).map(joinObj => {
    const joinUserId = joinObj.userId;
    const joinLeagueId = joinObj.leagueId;
    const joinTransactionId = joinObj.transactionId;

    const remoteData = transactions[joinTransactionId]

    if (userLeagueData[joinUserId]) {
      const userLeagueTrans = userLeagueData[joinUserId]['userLeagueData']
                                                      [joinLeagueId]['transactionData']

      userLeagueTrans[remoteData.symbol] = merge({[remoteData.id]: remoteData},
                                                  userLeagueTrans[remoteData.symbol])
    }
  })

  return (targetUser) ? Object.values(userLeagueData)[0] : userLeagueData
}
// END: Selectors to pass to UserShow Components //
