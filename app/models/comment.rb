# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  picture_id :integer          not null
#  body       :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Comment < ActiveRecord::Base
  validates :user_id, :picture_id, :body, presence: true

  default_scope -> { order(:id => :desc) }

  belongs_to :user
  belongs_to :picture
end
