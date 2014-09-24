# == Schema Information
#
# Table name: pictures
#
#  id                   :integer          not null, primary key
#  title                :string(255)
#  description          :text
#  user_id              :integer          not null
#  created_at           :datetime
#  updated_at           :datetime
#  img_url_file_name    :string(255)
#  img_url_content_type :string(255)
#  img_url_file_size    :integer
#  img_url_updated_at   :datetime
#  views                :integer          default(0)
#

class Picture < ActiveRecord::Base
  validates :img_url, presence: true

  belongs_to :user

  has_many :users

  has_many(:picture_likes,
    class_name: "PictureLike",
    primary_key: :id,
    foreign_key: :picture_id)  
  has_many(:liked_users, through: :picture_likes, source: :user)

  has_many :comments

  has_attached_file :img_url, styles: {
    big: "1000>",
    small: "250x250#"
  }

  validates_attachment_content_type :img_url, content_type: /\Aimage\/.*\Z/
end
