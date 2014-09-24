Picturito.Views.PictureShow = Backbone.View.extend({

  template: JST['pictures/show'],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset", this.render);
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
