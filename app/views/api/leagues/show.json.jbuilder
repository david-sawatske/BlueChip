json.set! @league.id do
  json.partial! 'api/leagues/league', league: @league
end
