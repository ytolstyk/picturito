class MakeAvatarsTable < ActiveRecord::Migration
  def change
    create_table :avatars do |t|
      t.integer :user_id
      t.attachment :image
      t.string :title

      t.timestamps
    end

    add_index :avatars, :user_id
  end
end
