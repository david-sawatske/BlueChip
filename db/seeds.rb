# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
League.destroy_all

Transaction.destroy_all
symbols = ['MU', 'CSX', 'INTC', 'AAPL', 'SIRI', 'CSCO', 'FB', 'ROKU', 'MSFT',
           'NVDA', 'TWTR', 'ORCL', 'P', 'TSLA', 'NFLX', 'AMD']

def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

users = []
leagues = []

5.times do
  users << User.create!(username: Faker::Internet.user_name, password: "password")
end

users << User.create!(username: 't1', password: "password")

3.times do
  leagues << League.create!(name: Faker::GameOfThrones.unique.house, starting_balance: 10000)
end


100.times do
  Transaction.create!(user_id: users.sample.id,
                      league_id: leagues.sample.id,
                      symbol: symbols.sample,
                      purchase_day: time_rand(365.days.ago),
                      share_price: rand(1.1...150.9).round(2),
                      share_quant: rand(300))
end


league_users = {}
leagues.each { |league| league_users [league.id] = []}

Transaction.all.each { |stock| league_users[stock.league_id] << stock.user_id }

league_users.map { |key, value| value.uniq! }

league_users.each do |key, values|
  values.each do |v|
    CashBalance.create!(user_id: v, league_id: key, balance: rand(100..100000))
  end
end
