json.id @picture.id
json.title @picture.title
json.description @picture.description
json.image_url_big @picture.img_url.url(:big)
json.image_url_small @picture.img_url.url(:small)
json.views @picture.views
json.username @picture.user.username