json.partial! 'api/leagues/league', league: @league
json.users league_user_data(@league)
json.cashBalances league_balance_data(@league)
json.transactions league_transaction_data(@league)
json.userLeagueBalances user_league_balances(@league)
json.userLeagueTransactions user_league_transactions(@league)
