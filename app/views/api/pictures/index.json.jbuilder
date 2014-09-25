json.array!(@pictures) do |picture|
  json.id picture.id
  json.title picture.title
  json.description picture.description
  json.image_url_small picture.img_url.url(:small)
  json.image_url_big picture.img_url.url(:big)
  json.views picture.views
  json.username picture.user.username
  json.likes picture.like_count
  json.user_liked picture.user_liked?(current_user)
  json.comments picture.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.picture_id comment.picture_id
    json.username comment.user.username
    json.user_id comment.user.id
    json.current_user current_user.id
  end
  json.current_user current_user.id
end
