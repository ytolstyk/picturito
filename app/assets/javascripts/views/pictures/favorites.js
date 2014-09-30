Picturito.Views.Favorites = Backbone.CompositeView.extend({
  className: "picture-index-wrapper",

  template: JST['pictures/favorites'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
  },

  events: {
    "click button.favorites-load-more": "loadMore",
  },

  loadMore: function(event) {
    event.preventDefault();
    this.collection.fetchNextPage();
  },

  addPicture: function(picture) {
    var pictureIndex = new Picturito.Views.PictureIndexShow({
      model: picture
    });

    this.addSubview(".ul-pictures", pictureIndex);
  },

  refresh: function() {
    this.collection.fetchPage(this.collection.page);
  },

  render: function() {
    this._subviews = {};

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });

    var renderContent = this.template({});

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
