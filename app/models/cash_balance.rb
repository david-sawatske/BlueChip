class CashBalance < ApplicationRecord
  validates :league_id, :balance, presence: true
  validates :user_id, presence: true, uniqueness: { scope: :league_id,
                                                    message: "You are a member" }

  belongs_to :user
  belongs_to :league
end
