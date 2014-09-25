Picturito.Views.CommentShow = Backbone.View.extend({
  tagName: "li",

  className: "li-comment",

  template: JST["comments/show"],

  initialize: function() {
    this.listenTo(this.model, "sync reset", this.render);
  },

  events: {
    "click button.delete-comment": "deleteComment"
  },

  deleteComment: function(event) {

  },

  render: function() {
    var renderContent = this.template({
      comment: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});