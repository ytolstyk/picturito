Picturito.Collections.Pictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "api/pictures",

  // comparator: function(picture) {
  //   return picture.get("id");
  //   // use -picture.get("views"); to sort by popularity
  // },

  parse: function(payload) {
    if (payload[0].total_pages) {
      this.total_pages = payload[0].total_pages + 1;
    }

    // payload.total_pages = [];
    return payload
  },

  initialize: function() {
    this.page = 1;
  },

  fetchPage: function(num) {
    if (num > 0) {
      num = num % this.total_pages;
    } else {
      num = (num % this.total_pages) + this.total_pages
    }

    this.fetch({ data: { page: num } });
  },

  fetchNextPage: function() {
    this.page = (this.page + 1) % this.total_pages
    if (this.page === 0) {
      this.page = 1;
    }
    this.fetch({ data: { page: this.page } });
  },

  fetchPreviousPage: function() {
    this.page -= 1;
    if (this.page < 1) {
      this.page = this.total_pages - 1
    }

    this.fetch({ data: { page: this.page } });
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