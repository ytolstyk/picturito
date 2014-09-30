class AddDefaultToHighestScore < ActiveRecord::Migration
  def change
    change_column :ratings, :highest_score, :float, default: 0
  end
end
