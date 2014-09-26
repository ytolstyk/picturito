Picturito.Views.ActivityShow = Backbone.View.extend({
  tagName: "li",
  className: "li-activity",

  template: JST["activities/show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click .close-activity": "removeActivity",
    "click .a-activity": "markViewed"
  },

  markViewed: function() {
    this.model.set("viewed", true);
    this.model.save();
  },

  removeActivity: function(event) {
    event.preventDefault();
    event.stopPropagation();
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