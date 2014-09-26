class AddDefaultToTitle < ActiveRecord::Migration
  def change
    change_column :pictures, :title, :string, default: "*"
  end
end
