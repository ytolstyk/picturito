Picturito.Collections.Popular = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "api/popular",

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

Picturito.popular = new Picturito.Collections.Popular();