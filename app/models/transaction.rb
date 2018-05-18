class Transaction < ApplicationRecord
  validates :symbol, :transaction_date, :share_quant, :share_price,
            :league_id, :user_id, presence: true

  belongs_to :user
  belongs_to :league
end
