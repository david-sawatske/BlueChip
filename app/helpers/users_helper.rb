module UsersHelper
  def user_league_data(user)
    byId = user.leagues.select(:id, :name, :starting_balance)
                       .index_by(&:id)

    byId.each do |id, league|
      byId[id] = format_json(league)
                 .merge!("id" => league.id.to_s)

    end

    allIds = byId.keys.map { |id| id.to_s }

    { 'byId': byId, 'allIds': allIds }
  end

  def user_balance_data(user)
    byId = user.cash_balances.select(:id, :balance)
                             .index_by(&:id)

    byId.each do |id, balance|
      byId[id] = format_json(balance)
                 .merge!("id" => balance.id.to_s)
    end

    allIds = byId.keys.map { |id| id.to_s }

    { 'balancesById': byId, 'allBalanceIds': allIds }
  end

  def user_transacton_data(user)
    byId = user.transactions.select( :id, :share_price, :share_quant,
                                     :purchase_day, :symbol )
                            .index_by(&:id)

    byId.each do |id, transaction|
      byId[id] = format_json(transaction)
                 .merge!("id" => transaction.id.to_s)
    end

    allIds = byId.keys.map { |id| id.to_s }

    { 'byId': byId, 'allIds': allIds }
  end

  def user_league_balances(user)
    joinedById = user.cash_balances.select(:id, :user_id, :league_id)
                                   .index_by(&:id)

    joinedById.each do |id, balance|
      joinedById[id] = {
        "id" => balance.id.to_s,
        "userId" => balance.user_id.to_s,
        "leagueId" => balance.league_id.to_s
      }
    end

    joinedAllIds = joinedById.keys.map { |id| id.to_s }

    { 'userLeagueBalancesById' => joinedById,
      'allUserLeagueBalanceIds' => joinedAllIds }
  end

  def user_league_transactions(user)
    joinedById = user.transactions.select(:id, :user_id, :league_id)
                                  .index_by(&:id)

    joinedById.each do |id, transaction|
      joinedById[id] = {
        "id" => transaction.id.to_s,
        "userId" => transaction.user_id.to_s,
        "leagueId" => transaction.league_id.to_s
      }
    end

    joinedAllIds = joinedById.keys.map { |id| id.to_s }

    { 'userLeagueTransactionsById' => joinedById,
      'allUserLeagueTransactionIds' => joinedAllIds }
  end

  def format_json(obj)
    JSON.parse(Jbuilder.encode { |json| json.(obj, *obj.attributes.keys) })
  end
end
