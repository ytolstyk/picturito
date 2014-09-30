# == Schema Information
#
# Table name: ratings
#
#  id             :integer          not null, primary key
#  picture_id     :integer
#  score          :float            default(0.0)
#  created_at     :datetime
#  updated_at     :datetime
#  last_reduction :datetime
#  highest_score  :float            default(0.0)
#

class Rating < ActiveRecord::Base
  validates :picture_id, presence: true

  belongs_to :picture

  default_scope -> { order(:score => :desc) }

  before_create :set_last_reduction

  def show_action
    score = self.score
    score = (score + (100 - score) * 0.05).round(1)
    if (self.last_reduction < 1.day.ago && score > 50)
      self.score = score - 10
      self.last_reduction = DateTime.now
    else
      self.score = score
    end
    self.highest_score = score if self.highest_score < score
    
    self.save
  end

  def like_action
    score = self.score
    score = (score + (100 - score) * 0.1).round(1)
    if (self.last_reduction < 1.day.ago && score > 50)
      self.score = score - 10
      self.last_reduction = DateTime.now
    else
      self.score = score
    end
    self.highest_score = score if self.highest_score < score

    self.save
  end

  def remove_like
    score = self.score
    score = ((score - 10) / 0.9).round(1)
    self.update(score: score)
  end

  private

  def set_last_reduction
    self.last_reduction = DateTime.now
  end

end
