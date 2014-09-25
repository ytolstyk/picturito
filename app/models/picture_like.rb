# == Schema Information
#
# Table name: picture_likes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  picture_id :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class PictureLike < ActiveRecord::Base
  validates :user_id, :picture_id, presence: true
  validates_uniqueness_of :user_id, scope: :picture_id

  belongs_to :user
  belongs_to :picture
end
