# Schema Information

## leagues
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
league         | string    | not null
start_balance  | integer   | not null

#### Associations:
has many users through cash_balances, <br>
has many cash_balances <br>
has many owned_stocks


## cash_balances
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
balance     | integer   | not null
user_id     | integer   | not null, indexed, unique in scope of league_id
league_id   | integer   | not null, indexed

#### Associations:
belongs to league, <br>
belongs to user


## owned_stocks
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
symbol       | string    | not null
transactions | jsonb     | not null
user_id      | integer   | not null, indexed
league_id    | integer   | not null, indexed

#### Associations:
belongs to league, <br>
belongs to user


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

#### Associations:
has many owned_stocks, <br>
has many cash_balances, <br>
has many leagues through cash_balances
