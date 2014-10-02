Picturito.Collections.UsersPictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: function() {
    return this.userUrl;
  },

  initialize: function(id) {
    if (id === undefined) {
      id = CURRENT_USER;
    }

    this.userUrl = "api/users/" + id + "/pictures";
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
      this.avatar = payload[0].user_avatar_big;
    } else {
      this.avatar = "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
    }

    return payload
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