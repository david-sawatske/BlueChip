User.destroy_all
League.destroy_all
Transaction.destroy_all

symbols = ['MU', 'CSX', 'INTC', 'AAPL', 'SIRI', 'CSCO', 'FB', 'MSFT', 'AMD',
           'NVDA', 'TWTR', 'ORCL', 'P', 'TSLA', 'NFLX']

img_base_url = 'https://picsum.photos/300?image='
stockefeller_img = 'http://res.cloudinary.com/sawatskeda10/image/upload/v1525133595/stockefeller_hlmdex.png'

def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

users = []
leagues = []

20.times do
  img_id = rand(1..1000).to_s
  users << User.create!(username: Faker::Internet.user_name,
                        password: "password",
                        img_url: img_base_url + img_id)
end

users << User.create!(username: 'Stockafeller',
                      password: "password",
                      img_url: stockefeller_img)

5.times do
  leagues << League.create!(name: Faker::GameOfThrones.unique.house, starting_balance: 10000)
end

10000.times do
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
    CashBalance.create!(user_id: v, league_id: key, balance: rand(100.1..10000.9).round(2))
  end
end
