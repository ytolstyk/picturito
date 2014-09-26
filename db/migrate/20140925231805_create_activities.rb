class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :owner_id, null: false
      t.integer :user_id, null: false
      t.string :action, null: false
      t.integer :picture_id, null: false

      t.timestamps
    end

    add_index :activities, :owner_id
    add_index :activities, :user_id
    add_index :activities, :picture_id
  end
end