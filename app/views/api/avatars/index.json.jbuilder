json.id @avatar.id
json.user_id @avatar.user_id
json.avatar_small @avatar.image.url(:small)
json.avatar_big @avatar.image.url(:big)
json.username @avatar.user.username