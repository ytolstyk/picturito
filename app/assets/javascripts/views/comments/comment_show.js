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
    var $btn = $(event.currentTarget);
    var $parent = $($(event.currentTarget).parent());
    var $img = $parent.find("img");
    $btn.hide(1000);
    $img.hide(1000, function() {
      $parent.hide(1000, function() {
        view.model.destroy();
        view.remove();
      });
      // view.model.destroy({
      //   success: function() {
      //     $parent.hide(200, view.remove.bind(view))
      //   }
      // });
    });
    // this.remove();
  },

  render: function() {
    var renderContent = this.template({
      comment: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});