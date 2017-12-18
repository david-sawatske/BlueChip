class League < ApplicationRecord
  validates :name,             presence: true, uniqueness: true
  validates :starting_balance, presence: true

  has_many :transactions
  has_many :cash_balances
  has_many :users, through: :cash_balances

  def self.random_league
    League.limit(1).order("RANDOM()").first
  end
end
