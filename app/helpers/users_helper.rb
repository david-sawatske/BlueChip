module UsersHelper
  def user_league_data(user)
    byId = user.leagues.select(:id, :name, :starting_balance).index_by(&:id)
    allIds = byId.keys.map { |id| id.to_s }

    { 'byId': byId, 'allIds': allIds }
  end
end
