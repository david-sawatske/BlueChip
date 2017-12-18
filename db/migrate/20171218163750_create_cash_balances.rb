class CreateCashBalances < ActiveRecord::Migration[5.1]
  def change
    create_table :cash_balances do |t|
      t.integer :balance,   null: false
      t.integer :user_id,   null: false
      t.integer :league_id, null: false

      t.timestamps
    end

    add_index :cash_balances, :user_id
    add_index :cash_balances, :league_id
  end
end
