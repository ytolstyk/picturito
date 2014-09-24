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
  belongs_to :user
  belongs_to :picture
end
