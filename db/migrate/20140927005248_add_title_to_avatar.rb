class AddTitleToAvatar < ActiveRecord::Migration
  def change
    add_column :avatars, :title, :string, default: "*"
  end
end
