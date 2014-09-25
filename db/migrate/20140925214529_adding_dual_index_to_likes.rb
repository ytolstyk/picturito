class AddingDualIndexToLikes < ActiveRecord::Migration
  def change
    add_index :picture_likes, [:user_id, :picture_id], unique: true
  end
end
