Picturito.Routers.Pictures = Backbone.Router.extend({
  initialize: function(options) {
    this.$main = options.$main;
    this.picturesCollection = Picturito.pictures;

    // set up modal(options.$navBarBtn) view
  },

  routes: {
    "": "index",
    "picture/new": "newPicture",
    "picture/:id": "show",
    "picture/:id/edit": "edit",
    "profile": "profile"
  },

  profile: function() {
    // make this shit!
  },

  index: function() {
    this.picturesCollection.fetch();
    var pictureIndex = new Picturito.Views.PicturesIndex({
      collection: this.picturesCollection
    });

    this._swapView(pictureIndex);
  },

  newPicture: function() {

  },

  edit: function() {

  },

  show: function(id) {
    var picture = this.picturesCollection.getOrFetch(id);
    var pictureShow = new Picturito.Views.PictureShow({
      collection: this.picturesCollection,
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
