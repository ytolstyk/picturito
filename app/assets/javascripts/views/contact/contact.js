Picturito.Views.Contact = Backbone.View.extend({
  template: JST["contact/contact"],

  initialize: function() {
    this.render();
  },

  render: function() {
    var renderContent = this.template();
    this.$el.html(renderContent);
    return this;
  }
});