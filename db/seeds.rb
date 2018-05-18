User.destroy_all
League.destroy_all
Transaction.destroy_all

symbols = {'MU': 54, 'CSX': 63, 'INTC': 54, 'AAPL': 184, 'SIRI': 6, 'CSCO': 43, 'FB': 184, 'MSFT': 96, 'AMD': 13,
           'NVDA': 251, 'CY': 16, 'ORCL': 46, 'P': 7, 'TSLA': 283, 'NFLX': 325, 'ROKU': 35, 'LXFT': 41}

img_base_url = 'https://picsum.photos/300?image='
stockefeller_img = 'http://res.cloudinary.com/sawatskeda10/image/upload/v1525133595/stockefeller_hlmdex.png'

def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end

def pricer price
  (price * rand(0.9...1.1)).round(2)
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

i = 1
7500.times do
  symbol = symbols.keys.sample
  user_id = users.sample.id
  league_id = leagues.sample.id
  price = pricer symbols[symbol]
  quant = rand(10..300)
  date = time_rand(365.days.ago)

  Transaction.create!(user_id: user_id,
                      league_id: league_id,
                      symbol: symbol,
                      transaction_date: date,
                      share_price: price,
                      share_quant: quant)

  if i % 5 == 0
    price = pricer price
    quant = rand(0..quant) * -1
    date = time_rand(date)

    Transaction.create!(user_id: user_id,
                        league_id: league_id,
                        symbol: symbol,
                        transaction_date: date,
                        share_price: price,
                        share_quant: quant)
  end

 i += 1
end


league_users = {}
leagues.each { |league| league_users [league.id] = []}

Transaction.all.each { |stock| league_users[stock.league_id] << stock.user_id }

league_users.map { |key, value| value.uniq! }

league_users.each do |key, values|
  values.each do |v|
    CashBalance.create!(user_id: v, league_id: key, balance: rand(10000.1..100000.9).round(2))
  end
end
