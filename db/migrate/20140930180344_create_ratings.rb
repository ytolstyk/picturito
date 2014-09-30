class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :picture_id
      t.float :score, default: 0

      t.timestamps
    end

    add_index :ratings, :picture_id
  end
end
