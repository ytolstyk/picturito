json.array!(@picture_likes) do |like|
  json.id like.id
  json.picture_id like.picture_id
  json.username like.user.username
  json.user_id like.user_id
  json.current_user current_user.id
end