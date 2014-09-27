# == Schema Information
#
# Table name: avatars
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  image_updated_at   :datetime
#  title              :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#

class Avatar < ActiveRecord::Base
  validates :image, presence: true

  belongs_to :user

  default_scope -> { order(:id => :asc) }

  has_attached_file :image, styles: {
    big: "250x250#",
    small: "50x50#"
  }

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
