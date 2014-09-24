class AddAvatarToUsers < ActiveRecord::Migration
  def change
    add_column :users, :picture_id, :integer, default: 0
  end
end
