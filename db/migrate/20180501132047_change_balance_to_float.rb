class ChangeBalanceToFloat < ActiveRecord::Migration[5.1]
  def change
    change_column :cash_balances, :balance, :float
  end
end
