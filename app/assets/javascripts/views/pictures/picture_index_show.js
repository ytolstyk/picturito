Picturito.Views.PictureIndexShow = Backbone.CompositeView.extend({
  template: JST["pictures/indexShow"],

  initialize: function() {
    this.listenTo()
  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }
});