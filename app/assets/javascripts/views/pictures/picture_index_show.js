Picturito.Views.PictureIndexShow = Backbone.View.extend({

  template: JST["pictures/index_show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove", this.render);
  },

  events: {

  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});