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
  # json.comments picture.comments do |comment|
  #   json.id comment.id
  #   json.body comment.body
  #   json.picture_id comment.picture_id
  #   json.username comment.user.username
  #   json.user_id comment.user.id
  #   json.current_user current_user.id
  #   # json.avatar_big comment.user.avatars.first.image.url(:big)
  #   # json.avatar_small comment.user.avatars.first.image.url(:small)
  # end
  if current_user
    json.current_user current_user.id
    if current_user.avatars.empty?
      json.avatar_small "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
      json.avatar_big "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_big.jpeg"
    else
      json.avatar_small current_user.avatars.last.image.url(:small)
      json.avatar_big current_user.avatars.last.image.url(:big)
    end
    json.total_pages Picture.total_pages
  end
end

