Picturito.Collections.UserPictures = Backbone.Collection.extend({
  model: "api/pictures",

  url: "/api/users/" + CURRENT_USER + "/pictures",

  initialize: function() {
    this.page = 1;
  },

  fetchNextPage: function() {
    this.page += 1;
    this.fetch({ remove: false, data: { page: this.page } });
  }
});

Picturito.userPictures = new Picturito.Collections.UserPictures();