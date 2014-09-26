json.id @comment.id
json.body @comment.body
json.picture_id @comment.picture_id
json.username @comment.user.username
json.user_id @comment.user.id
json.current_user current_user.id
json.created_at @comment.created_at.asctime