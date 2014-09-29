Picturito.Routers.Pictures = Backbone.Router.extend({
  initialize: function(options) {
    this.$main = options.$main;

    this.$navbarActivities = options.$navbarActivities;
    this.$activitiesBtn = options.$activitiesBtn;

    this.activitiesCollection = Picturito.activities;
    this.picturesCollection = Picturito.pictures;

    if (this.$navbarActivities.length !== 0) {
      this.renderActivities();
    }
    
    // var router = this;
    // this.$activitiesBtn.on("click", router.renderActivities.bind(router));
    // set up modal(options.$navBarBtn) view
    // this.$navbarActivities.on('show.bs.dropdown', 'li.dropdown', router.renderActivities.bind(router));
  },

  routes: {
    "": "index",
    "page/:page": "index",
    "picture/new": "newPicture",
    "picture/:id": "show",
    "picture/:id/edit": "edit",
    "profile": "profile"
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

  profile: function() {
    // make this shit!
  },

  index: function(page) {
    if (!page) {
      page = 0;
    }

    this.picturesCollection.page = page;
    this.picturesCollection.fetchPage(page);
    var pictureIndex = new Picturito.Views.PicturesIndex({
      collection: this.picturesCollection,
      currentPage: page
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
  }
});
