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
end
