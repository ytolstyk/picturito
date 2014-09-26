Picturito.Routers.Pictures = Backbone.Router.extend({
  initialize: function(options) {
    this.$main = options.$main;
    this.$activities = options.$activities;
    this.$activitiesBtn = options.$activitiesBtn;

    this.activitiesCollection = Picturito.activities;
    this.picturesCollection = Picturito.pictures;

    this.renderActivities();

    // set up modal(options.$navBarBtn) view
  },

  routes: {
    "": "index",
    "picture/new": "newPicture",
    "picture/:id": "show",
    "picture/:id/edit": "edit",
    "profile": "profile",
  },

  renderActivities: function() {
    // stick these in $activities
    this.activitiesCollection.fetch();
    var activitiesIndex = new Picturito.Views.
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
