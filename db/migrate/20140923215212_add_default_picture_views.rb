class AddDefaultPictureViews < ActiveRecord::Migration
  def change
    change_column :pictures, :views, :integer, default: 0
  end
end
