json.partial! 'api/users/user', user: @user
json.leagues user_league_data(@user)
json.cashBalances user_balance_data(@user)
json.transactions user_transacton_data(@user)
