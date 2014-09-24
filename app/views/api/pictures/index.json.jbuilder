json.array!(@pictures) do |picture|
  json.id picture.id
  json.title picture.title
  json.description picture.description
  json.image_url picture.img_url.url(:small)
end