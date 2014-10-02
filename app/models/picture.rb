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
  PAGINATE_PER = 15

  validates :img_url, presence: true

  paginates_per PAGINATE_PER

  belongs_to :user

  has_many :users

  has_many :activities, dependent: :destroy

  has_many(:picture_likes,
    class_name: "PictureLike",
    primary_key: :id,
    foreign_key: :picture_id,
    dependent: :destroy)

  has_many(:liked_users,
    through: :picture_likes,
    source: :user,
    dependent: :destroy)

  has_many :comments, dependent: :destroy

  has_attached_file :img_url, styles: {
    big: "1000>",
    small: "250x250#"
  }

  has_one :rating, dependent: :destroy

  validates_attachment_content_type :img_url, content_type: /\Aimage\/.*\Z/

  after_create :create_rating

  def self.total_pages
    return 0 if Picture.count == 0
    (Picture.count + PAGINATE_PER - 1) / PAGINATE_PER
  end

  def like_count
    self.picture_likes.length
  end

  def user_liked?(user)
    self.liked_users.include?(user)
  end

  def user_liked_date(user)
    date = self.picture_likes.find_by_user_id(user.id).created_at.asctime
    date ? date : "Unliked"

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

  def create_rating
    self.rating = Rating.new
  end

  private

  def get_self_index
    @total ||= Picture.count
    @pictures ||= Picture.order(:id).pluck(:id)
    @pictures.index(self.id)
  end
end
