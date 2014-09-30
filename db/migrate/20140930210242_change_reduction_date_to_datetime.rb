class ChangeReductionDateToDatetime < ActiveRecord::Migration
  def change
    change_column :ratings, :last_reduction, :datetime
  end
end
