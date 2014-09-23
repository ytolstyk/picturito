class AddPictureViewsCounter < ActiveRecord::Migration
  def change
    add_column :pictures, :views, :integer
  end
end
