Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
    // this.listenTo(this.collection, "add", this.addPicture);
  },

  events: {
    "click button.refresh": "refresh"
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
      pictures: this.collection
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
