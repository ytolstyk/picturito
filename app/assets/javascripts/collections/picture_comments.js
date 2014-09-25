Picturito.Collections.PictureComments = Backbone.Collection.extend({
  model: Picturito.Models.Comment,

  // url: "api/comments", // fetch will error out

  // comparator: function(comment) {
  //   return -comment.get("id");
  // },

  initialize: function(models, options) {
    this.picture = options.picture;
  }
});