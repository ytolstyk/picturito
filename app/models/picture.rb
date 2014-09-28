# == Schema Information
#
# Table name: pictures
#
#  id                   :integer          not null, primary key
#  title                :string(255)      default("*")
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

  paginates_per 15

  belongs_to :user

  has_many :users

  has_many :activities

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

  def like_count
    return 0 if self.liked_users.empty?
    self.liked_users.count
  end

  def user_liked?(user)
    self.liked_users.include?(user)
  end

  def next_picture
    @index ||= get_self_index
    index = (@index + 1) % @total
    @pictures[index]
  end

  def previous_picture
    @index ||= get_self_index
    index = (@index - 1) % @total
    @pictures[index]
  end

  private

  def get_self_index
    @total ||= Picture.count
    @pictures ||= Picture.order(:id).pluck(:id)
    @pictures.index(self.id)
  end
end
