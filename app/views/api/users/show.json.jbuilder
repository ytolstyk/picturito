json.id @user.id
json.username @user.username
json.pictures @user.pictures do |picture|
  json.id picture.id
end