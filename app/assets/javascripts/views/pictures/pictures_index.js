Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({
  className: "picture-index-wrapper",

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
  },

  events: {
    "click button.refresh": "refresh",
    "click button.load-more": "loadMore",
    "submit .go-to-page": "goToPage"
  },

  goToPage: function(event) {
    event.preventDefault();
    var page = $(event.currentTarget).find(".current-page").val();
    this.collection.fetchPage(page);
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
    var thisPage = this.collection.page;
    var nextPage = thisPage + 1;
    var totalPages = this.collection.total_pages;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    var prevPage = thisPage - 1;
    if (prevPage < 1) {
      prevPage = 1;
    }

    this._subviews = {};

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });

    var renderContent = this.template({
      this_page: thisPage,
      next_page: nextPage,
      previous_page: prevPage,
      total_pages: totalPages
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
