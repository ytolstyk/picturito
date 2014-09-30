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
  json.date_liked picture.user_liked_date(current_user)
  json.score picture.rating.display_score
  json.highest_score picture.rating.display_highest_score
end

