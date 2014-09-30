class AddHighestScoreToRating < ActiveRecord::Migration
  def change
    add_column :ratings, :highest_score, :float
  end
end
