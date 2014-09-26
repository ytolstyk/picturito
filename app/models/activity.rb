# == Schema Information
#
# Table name: activities
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  user_id    :integer          not null
#  action     :string(255)      not null
#  picture_id :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  viewed     :boolean          default(FALSE)
#

class Activity < ActiveRecord::Base
  validates :owner_id, :user_id, :picture_id, :action, presence: true
  validates_uniqueness_of :user_id, scope: [:picture_id, :action]

  validate :user_is_not_owner

  belongs_to :user
  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )
  belongs_to :picture

  default_scope -> { order(:id => :desc) }

  def user_is_not_owner
    if self.user_id == self.owner_id
      self.errors[:base] << "Can't create activity record for yourself"
    end
  end

end
