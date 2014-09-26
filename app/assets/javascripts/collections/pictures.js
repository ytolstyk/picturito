Picturito.Collections.Pictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "api/pictures",

  // comparator: function(picture) {
  //   return picture.get("id");
  //   // use -picture.get("views"); to sort by popularity
  // },

  getOrFetch: function(id) {
    var picture = this.get(id);

    if (!picture) {
      picture = new Picturito.Models.Picture({ id: id });

      picture.fetch({
        success: function() {
          this.add(picture)
        }.bind(this)
      });
    } else {
      picture.fetch();
    }

    return picture;
  }

});

Picturito.pictures = new Picturito.Collections.Pictures();