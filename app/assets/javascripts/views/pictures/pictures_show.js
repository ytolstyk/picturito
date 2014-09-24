Picturito.Views.PictureShow = Backbone.View.extend({

  template: JST['pictures/show'],
  splashTemplate: JST['pictures/show_splash'],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset", this.render);
  },

  events: {
    "click .div-picture": "renderSplash",
    "click .div-splash-container": "render"
  },

  renderSplash: function() {
    var renderContent = this.splashTemplate({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});
