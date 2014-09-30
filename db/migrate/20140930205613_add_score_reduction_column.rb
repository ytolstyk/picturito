class AddScoreReductionColumn < ActiveRecord::Migration
  def change
    add_column :ratings, :last_reduction, :date
  end
end
