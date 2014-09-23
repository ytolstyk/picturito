class AddUrlToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :img_url, :string, null: false
  end
end
