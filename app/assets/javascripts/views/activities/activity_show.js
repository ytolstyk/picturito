Picturito.Views.ActivityShow = Backbone.View.extend({
  tagName: "li",

  template: JST["activities/show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click .delete": "removeActivity"
  },

  render: function() {
    var renderContent = this.template({
      activity: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});