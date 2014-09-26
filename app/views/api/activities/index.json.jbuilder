json.array!(@activities) do |activity|
  json.id activity.id
  json.owner_id activity.owner_id
  json.username activity.user.username
  json.action activity.action
  json.picture activity.picture.title
  json.picture_id activity.picture.id
  json.current_user current_user.username
end