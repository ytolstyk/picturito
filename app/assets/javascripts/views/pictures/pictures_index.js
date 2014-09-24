Picturito.Views.PicturesIndex = Backbone.View.extend({

  template: JST['pictures/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  events: {
    "click button.refresh": "refresh"
  },

  refresh: function() {
    this.collection.fetch();
  },

  render: function() {
    var renderContent = this.template({
      pictures: this.collection
    });

    this.$el.html(renderContent);
    return this;
  },

});
