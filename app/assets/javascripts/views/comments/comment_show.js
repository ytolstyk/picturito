Picturito.Views.CommentShow = Backbone.View.extend({
  tagName: "li",

  className: "li-comment clearfix",

  template: JST["comments/show"],

  initialize: function() {
    this.listenTo(this.model, "sync reset", this.render);
  },

  events: {
    "click button.delete-comment": "deleteComment"
  },

  deleteComment: function(event) {
    event.preventDefault();
    var view = this;
    var $parent = $($(event.currentTarget).parent());
    $parent.children().effect("explode", { pieces: 6 }, 300)
    $parent.effect("explode", { pieces: 6 }, 300, function() {
      view.model.destroy();
    });
  },

  render: function() {
    var renderContent = this.template({
      comment: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});