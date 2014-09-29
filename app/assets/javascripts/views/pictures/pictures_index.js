Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({
  className: "picture-index-wrapper",

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
    // this.listenTo(this.collection, "add", this.addPicture);
    this.currentPage = this.currentPage || 0;
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
    // try this.collection.page
    this.collection.fetchPage(this.collection.page);
  },

  render: function() {
    this._subviews = {};

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });

    var renderContent = this.template({
      this_page: this.collection.page
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
