Picturito.Views.PictureIndexShow = Backbone.View.extend({
  tagName: "li",

  className: "li-picture",

  template: JST["pictures/index_show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset", this.render);
    this.listenTo(this.model.collection, 'sync', function() {
    });
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