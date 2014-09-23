class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :title
      t.text :description
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :pictures, :user_id
  end
end
