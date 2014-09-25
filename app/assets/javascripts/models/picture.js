Picturito.Models.Picture = Backbone.Model.extend({
  urlRoot: "api/pictures",

  comments: function() {
    this._comments = this._comments || 
      new Picturito.Collections.PictureComments([], { picture: this });
    return this._comments;
  },

  parse: function(payload) {
    if (payload.comments) {
      this.comments().set(payload.comments, { parse: true });
    }

    return payload;
  }
});
