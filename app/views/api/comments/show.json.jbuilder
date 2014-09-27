json.id @comment.id
json.body @comment.body
json.picture_id @comment.picture_id
json.username @comment.user.username
json.user_id @comment.user.id
json.current_user current_user.id
json.created_at @comment.created_at.asctime
if @comment.user.avatars.empty?
  json.avatar "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
else
  json.avatar @comment.user.avatars.last.image.url(:small)
end