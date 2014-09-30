Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({
  className: "picture-index-wrapper",

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);

    this.thisPage = parseInt(this.collection.page);
    this.totalPages = parseInt(this.collection.total_pages);
    this.nextPage = this.thisPage + 1;
    this.prevPage = this.thisPage - 1;

    if (this.nextPage > this.totalPages) {
      this.nextPage = "#/page/" + this.totalPages;
    } else {
      this.nextPage = "#/page/" + this.nextPage;
    }

    if (this.prevPage < 2) {
      this.prevPage = "#";
    } else {
      this.prevPage = "#/page/" + this.prevPage;
    }
  },

  events: {
    "click button.refresh": "refresh",
    "click button.load-more": "loadMore",
    "submit .go-to-page": "goToPage"
  },

  goToPage: function(event) {
    event.preventDefault();
    var page = $(event.currentTarget).find(".current-page").val();

    if (page > this.totalPages) {
      page = this.totalPages;
    } else if (page < 1) {
      page = 1;
    }

    if (page === 1) {
      Backbone.history.navigate("#/page/1");
    } else {
      Backbone.history.navigate("#/page/" + page);
    }
    // this.collection.fetchPage(page);
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

    var renderContent = this.template({
      this_page: this.thisPage,
      next_page: this.nextPage,
      previous_page: this.prevPage,
      total_pages: this.totalPages
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
