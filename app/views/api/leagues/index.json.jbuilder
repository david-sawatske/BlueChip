@leagues.each do |league|
  json.set! league.id do
    json.partial! 'league', league: league
  end
end
