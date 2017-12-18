class Transaction < ApplicationRecord
  validates :symbol, :purchase_day, :share_quant, :share_price,
            :league_id, :user_id, presence: true

  belongs_to :user
  belongs_to :league
end
