json.array!(@users) do |user|
  json.id  user.id
  json.username user.username

  # json.pictures user.pictures do |picture|
    # json.id picture.id
    # json.title picture.title
    # json.description picture.description
    # json.image_url_big picture.img_url.url(:big)
    # json.image_url_small picture.img_url.url(:small)
    # json.views picture.views
    # json.likes picture.like_count
    # json.user_liked picture.user_liked?(current_user)
  # end
end