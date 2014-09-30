Picturito.Collections.UserPictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "/api/users/" + CURRENT_USER + "/pictures",

  initialize: function() {
    this.page = 1;
  },

  parse: function(payload) {
    if (payload.length === 0) {
      return payload;
    }
    
    if (payload[0].username) {
      this.username = payload[0].username;
    } else {
      this.username = "unknown";
    }

    if (payload[0].avatar_big) {
      this.avatar = payload[0].avatar_big;
    } else {
      this.avatar = "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
    }

    return payload
  },

  fetchNextPage: function() {
    this.page += 1;
    this.fetch({ remove: false, data: { page: this.page } });
  }
});

Picturito.userPictures = new Picturito.Collections.UserPictures();