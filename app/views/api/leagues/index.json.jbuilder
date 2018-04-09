@leagues.each do |league|
  json.set! league.id do
    json.leagues  league_data(league)
    json.users league_user_data(league)
    json.cashBalances league_balance_data(league)
    json.userLeagueBalances user_league_balances(league)
  end
end
