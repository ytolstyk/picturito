class RenameImgColumn < ActiveRecord::Migration
  def change
    remove_column :pictures, :img_url
  end
end
