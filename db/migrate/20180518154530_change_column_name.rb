class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :transactions, :purchase_day, :transaction_date
  end
end
