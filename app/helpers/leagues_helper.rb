module LeaguesHelper
    def league_user_data(league)
      byId = {}
      allIds = []

      league.users.each do |user|
        id = user.id.to_s

        byId[id] = { userId: id, username: user.username }
        allIds.push(id)
      end

      { usersById: byId, allIds: allIds }
    end

    def league_balance_data(league)
      byId = league.cash_balances.select(:id, :balance)
                         .index_by(&:id)

      byId.each do |id, user|
        byId[id] = format_json(user)
                   .merge!("id" => user.id.to_s)

      end

      allIds = byId.keys.map { |id| id.to_s }

      { 'balancesById': byId, 'allBalanceIds': allIds }
    end

    def league_transaction_data(league)
      byId = league.transactions.select(:id, :symbol, :share_price, :share_quant,
                                        :purchase_day)
                                .index_by(&:id)

      byId.each do |id, transaction|
        byId[id] = format_json(transaction)
                   .merge!("id" => transaction.id.to_s)

      end

      allIds = byId.keys.map { |id| id.to_s }

      { 'transactionsById': byId, 'allTransactionIds': allIds }
    end


    def league_user_balances(league)
      joinedById = league.cash_balances.select(:id, :user_id, :league_id)
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

    def user_league_transactions(league)
      joinedById = league.transactions.select(:id, :user_id, :league_id)
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

end
