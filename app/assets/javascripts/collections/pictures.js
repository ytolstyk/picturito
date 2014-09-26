Picturito.Collections.Pictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "api/pictures",

  // comparator: function(picture) {
  //   return picture.get("id");
  //   // use -picture.get("views"); to sort by popularity
  // },

  // parse: function(payload) {
    // if (payload.total_pages) {
    //   this.total_pages = data.total_pages;
    // }

    // payload.total_pages = [];
    // return payload
  // },

  initialize: function() {
    this.page = 1;
  },

  fetchNextPage: function() {
    this.page += 1;
    this.fetch({ remove: false, data: { page: this.page } });
  },

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