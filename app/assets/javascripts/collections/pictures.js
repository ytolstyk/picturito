Picturito.Collections.Pictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "api/pictures",

  // comparator: function(picture) {
  //   return picture.get("id");
  //   // use -picture.get("views"); to sort by popularity
  // },

  parse: function(payload) {
    if (payload === []) {
      total_pages = 1;
      return payload;
    }

    if (payload[0].total_pages) {
      this.total_pages = payload[0].total_pages;
    }

    // payload.total_pages = [];
    return payload
  },

  initialize: function() {
    this.page = 1;
    this.total_pages = TOTAL_PAGES;
  },

  setPage: function(page) {
    this.page = page;
  },

  fetchPage: function(num) {
    if (!num) {
      num = 1
    }
    if (num > this.total_pages) {
      num = this.total_pages
    } else if (num < 1) {
      num = 1
    }
    this.page = num;

    this.fetch({ data: { page: this.page } });
  },

  fetchNextPage: function() {
    if (this.page < this.total_pages) {
      this.page += 1;
    } else {
      this.page = this.total_pages;
    }
    this.fetch({ data: { page: this.page } });
  },

  fetchPreviousPage: function() {
    if (this.page > 1) {
      this.page -= 1
    } else {
      this.page = 1;
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