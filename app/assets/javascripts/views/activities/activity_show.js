Picturito.Views.ActivityShow = Backbone.View.extend({
  tagName: "li",
  className: "li-activity",

  template: JST["activities/show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click .close-activity": "removeActivity",
  },

  removeActivity: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var renderContent = this.template({
      activity: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});