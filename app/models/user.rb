# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  picture_id      :integer          default(0)
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, :session_token, uniqueness: true

  has_many :pictures

  has_many :activities

  has_many(
    :own_activities,
    class_name: "Activity",
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(:picture_likes,
    class_name: "PictureLike",
    primary_key: :id,
    foreign_key: :user_id)
  has_many(:liked_pictures,
    through: :picture_likes,
    source: :picture)

  has_many :comments

  belongs_to :picture

  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user.nil?
    user.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.update(session_token: User.generate_session_token)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
