json.id @picture.id
json.title @picture.title
json.description @picture.description
json.image_url_big @picture.img_url.url(:big)
json.image_url_small @picture.img_url.url(:small)
json.views @picture.views
json.username @picture.user.username
json.likes @picture.like_count
json.user_liked @picture.user_liked?(current_user)
if @picture.user.avatars.empty?
  json.avatar "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
else
  json.avatar @picture.user.avatars.last.image.url(:small)
end

json.comments @picture.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.picture_id comment.picture_id
  json.username comment.user.username
  json.user_id comment.user.id
  json.current_user current_user.id
  if comment.user.avatars.empty?
    json.avatar "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
  else
    json.avatar comment.user.avatars.last.image.url(:small)
  end
end
json.current_user current_user.id
