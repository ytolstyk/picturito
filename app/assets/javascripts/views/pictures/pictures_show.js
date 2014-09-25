Picturito.Views.PictureShow = Backbone.CompositeView.extend({

  template: JST['pictures/show'],
  splashTemplate: JST['pictures/show_splash'],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset", this.render);

    // listening for 'add' will call callback in order received from the server
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);

    var view = this;
    this.model.comments().each(function(comment) {
      view.addComment(comment);
    });
  },

  events: {
    "click .div-picture": "renderSplash",
    "click .div-splash-container": "render",
    "submit form.new-comment": "createComment"
  },

  addComment: function(comment) {
    var commentShow = new Picturito.Views.CommentShow({
      model: comment
    });
    comment.fetch();

    this.addCommentSubview(".ul-comments", commentShow);
    // this.addSubview(".ul-comments", commentShow);
  },

  createComment: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var that = this;
    var newComment = new Picturito.Models.Comment({
      picture_id: that.model.id,
      body: $form.find(".new-comment-body").val()
    });

    newComment.save({}, {
      success: function() {
        that.model.comments().add(newComment);
        that.clearForm($form);
      }
    });
  },

  removeComment: function(comment) {
    var subview = _.find(
      this.subviews(".ul-comments"),
      function(subview) {
        return subview.model === comment;
      });

    this.removeSubview(".ul-comments", subview);
  },

  clearForm: function($form) {
    $form.find(":input").val("");
  },

  renderSplash: function() {
    var renderContent = this.splashTemplate({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});
