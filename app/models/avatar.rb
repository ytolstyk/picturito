# == Schema Information
#
# Table name: avatars
#
#  id                  :integer          not null, primary key
#  user_id             :integer
#  avatar_file_name    :string(255)
#  avatar_content_type :string(255)
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  created_at          :datetime
#  updated_at          :datetime
#

class Avatar < ActiveRecord::Base
  validates :avatar, presence: true

  belongs_to :user

  has_attached_file :avatar, styles: {
    big: "250x250#",
    small: "100x100#"
  }

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
end
