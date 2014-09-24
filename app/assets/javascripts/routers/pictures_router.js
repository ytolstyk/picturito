Picturito.Routers.Pictures = Backbone.Router.extend({
  initialize: function(options) {
    this.$main = options.$main;
    this.collection = Picturito.pictures;
  },

  routes: {
    "": "index",
    "api/picture/new": "newPicture",
    "api/picture/:id": "show",
    "api/picture/:id/edit": "edit"
  },

  index: function() {
    this.collection.fetch();
    var pictureIndex = new Picturito.Views.PicturesIndex({
      collection: this.collection
    });

    this._swapView(pictureIndex);
  },

  newPicture: function() {

  },

  show: function(id) {
    var picture = this.collection.getOrFetch(id);
    var pictureShow = new Picturito.Views.PictureShow({
      collection: this.collection,
      model: picture
    });

    this._swapView(pictureShow);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$main.html(view.render().$el);
  }
});
