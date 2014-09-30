class AddDescriptionToAvatar < ActiveRecord::Migration
  def change
    add_column :avatars, :description, :text, default: ""
  end
end
