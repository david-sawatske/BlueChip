module UsersHelper
  def user_league_data(user)
    byId = user.leagues.select(:id, :name, :starting_balance).index_by(&:id)
    allIds = byId.keys.map { |id| id.to_s }

    { 'byId': byId, 'allIds': allIds }
  end

  def user_balance_data(user)
    byId = user.cash_balances.select(:id, :balance).index_by(&:id)
    allIds = byId.keys.map { |id| id.to_s }

    { 'balancesById': byId, 'allBalanceIds': allIds }
  end

  def user_transacton_data(user)
    byId = user.transactions.select( :id, :share_price, :share_quant,
                                     :purchase_day, :symbol )
                            .index_by(&:id)

    allIds = byId.keys.map { |id| id.to_s }

    { 'byId': byId, 'allIds': allIds }
  end

  def user_league_balances(user)
    joinedById = user.cash_balances.select(:id, :user_id, :league_id).index_by(&:id)

    joinedAllIds = joinedById.keys.map { |id| id.to_s }

    { 'userLeagueBalancesById' => joinedById, 'allUserLeagueBalanceIds' => joinedAllIds }
  end

  def user_league_transactions(user)
    joinedById = user.transactions.select(:id, :user_id, :league_id).index_by(&:id)

    joinedAllIds = joinedById.keys.map { |id| id.to_s }

    { 'userLeagueTransactionsById' => joinedById, 'allUserLeagueTransactionIds' => joinedAllIds }
  end
end
