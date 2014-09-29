Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({
  className: "picture-index-wrapper",

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
    // this.listenTo(this.collection, "add", this.addPicture);
  },

  events: {
    "click button.next-page": "nextPage",
    "click button.previous-page": "previousPage",
    "click button.refresh": "refresh",
    "click button.load-more": "loadMore"
  },

  nextPage: function(event) {
    event.preventDefault();
    this.collection.fetchNextPage();
  },

  previousPage: function(event) {
    event.preventDefault();
    this.collection.fetchPreviousPage();
  },

  addPicture: function(picture) {
    var pictureIndex = new Picturito.Views.PictureIndexShow({
      model: picture
    });

    this.addSubview(".ul-pictures", pictureIndex);
  },

  refresh: function() {
    this.collection.fetch();
  },

  render: function() {
    this._subviews = {};

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });

    var renderContent = this.template({
      // pictures: this.collection
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
