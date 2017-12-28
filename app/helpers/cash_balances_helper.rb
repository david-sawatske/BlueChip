module CashBalancesHelper
  def cash_balance_data(cash_balance)
    byId = {}
    id = cash_balance.id.to_s

    byId[id] = { id: id, balance: cash_balance.balance }

    allIds = [id]

    { balancesById: byId, allBalanceIds: allIds }
  end

  def user_league_balance(cash_balance)
    balance_id = cash_balance.id.to_s

    joinedById = { balance_id => { id: balance_id.to_s,
                                   user_id: cash_balance.user_id.to_s,
                                   league_id: cash_balance.league_id.to_s }}

    { userLeagueBalancesById: joinedById,
      allUserLeagueBalanceIds: [balance_id.to_s] }
  end


  def format_json(obj)
    JSON.parse(Jbuilder.encode { |json| json.(obj, *obj.attributes.keys) })
  end
end
