Picturito.Views.PicturesIndex = Backbone.CompositeView.extend({

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addPicture)

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });
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
    var renderContent = this.template({
      pictures: this.collection
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
