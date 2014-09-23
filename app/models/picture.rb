# == Schema Information
#
# Table name: pictures
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  description :text
#  user_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  img_url     :string(255)      not null
#

class Picture < ActiveRecord::Base
  validates :img_url, presence: true

  belongs_to :user
end
