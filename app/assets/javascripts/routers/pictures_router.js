Picturito.Routers.Pictures = Backbone.Router.extend({
  initialize: function(options) {
    this.$main = options.$main;

    this.$navbarActivities = options.$navbarActivities;
    this.$activitiesBtn = options.$activitiesBtn;

    this.activitiesCollection = Picturito.activities;
    this.picturesCollection = Picturito.pictures;
    this.profileCollection = Picturito.userPictures;
    this.favoritesCollection = Picturito.favorites;

    if (this.$navbarActivities.length !== 0) {
      this.renderActivities();
    }
  },

  routes: {
    "": "index",
    "page/:page": "index",
    "picture/new": "newPicture",
    "picture/:id": "show",
    "profile": "profile",
    "favorites": "favorites",
    "popular": "popular"
  },

  popular: function() {
    
  },

  favorites: function() {
    this.favoritesCollection.page = 1;
    this.favoritesCollection.fetch();
    var favorites = new Picturito.Views.Favorites({
      collection: this.favoritesCollection
    });

    this._swapView(favorites);
  },

  profile: function() {
    this.profileCollection.page = 1;
    this.profileCollection.fetch();
    var profile = new Picturito.Views.Profile({
      collection: this.profileCollection
    });

    this._swapView(profile);
  },

  renderActivities: function() {
    this.activitiesCollection.fetch();
    var activitiesIndex = new Picturito.Views.ActivitiesIndex({
      collection: this.activitiesCollection
    });

    this._swapActivities(activitiesIndex);
  },

  _swapActivities: function(view){
    this._currentActivities && this._currentActivities.remove();
    this._currentActivities = view;
    this.$navbarActivities.html(view.render().$el);
  },

  index: function(page) {
    if (!page) {
      page = 1;
    }

    this.picturesCollection.page = page;
    this.picturesCollection.fetchPage(page);
    var pictureIndex = new Picturito.Views.PicturesIndex({
      collection: this.picturesCollection,
    });

    this._swapView(pictureIndex);
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
    this.renderActivities();
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$main.html(view.render().$el);
    //call the afterSwap callback only if view implements it
    view.afterSwap && view.afterSwap();
  }
});
