class CreatePictureLikes < ActiveRecord::Migration
  def change
    create_table :picture_likes do |t|
      t.integer :user_id, null: false
      t.integer :picture_id, null: false

      t.timestamps
    end

    add_index :picture_likes, :user_id
    add_index :picture_likes, :picture_id
  end
end
