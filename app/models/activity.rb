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
#

class Activity < ActiveRecord::Base
  validates :owner_id, :user_id, :picture_id, :action, presence: true

  belongs_to :user
  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )
  belongs_to :picture

  
end
