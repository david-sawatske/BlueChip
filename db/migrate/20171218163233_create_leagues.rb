class CreateLeagues < ActiveRecord::Migration[5.1]
  def change
    create_table :leagues do |t|
      t.string :name,              null: false
      t.integer :starting_balance, null: false

      t.timestamps
    end
    add_index :leagues, :name, unique: true
  end
end
