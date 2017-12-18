class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.string :symbol,         null: false
      t.integer :share_quant,   null: false
      t.float :share_price,     null: false
      t.datetime :purchase_day, null: false
      t.integer :user_id,       null: false
      t.integer :league_id,      null: false

      t.timestamps
    end

    add_index :transactions, :symbol
    add_index :transactions, :user_id
    add_index :transactions, :league_id
  end
end
