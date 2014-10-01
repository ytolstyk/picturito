Picturito.Views.PictureShow = Backbone.CompositeView.extend({

  template: JST['pictures/show'],
  splashTemplate: JST['pictures/show_splash'],

  initialize: function() {
    this.listenTo(this.model, "sync reset like", this.render);

    this.listenTo(this.model.comments(), "add", this.addComment);
    this.listenTo(this.model.comments(), "remove", this.removeComment);

    this.splash = false;

    var view = this;
    this.model.comments().each(function(comment) {
      view.addCommentBefore(comment);
    });
  },

  events: {
    "click .click-picture": "renderSplash",
    "click div.splash-container": "render",
    "submit form.new-comment": "createComment",
    "click .show-picture-like": "handleLike"
  },

  keyHandler: function(key) {
      if (key.target.tagName.toLowerCase() === "textarea") {
        return;
      }

      switch(key.which) {
        case 27: // escape
          if(this.splash){
            this.render();
          }
          break;
        case 37: // left
          if(!this.splash){
            $(".previous-picture").trigger("click");
          }
          break;
        case 39: // right
          if(!this.splash){
            $(".next-picture").trigger("click");
          }
          break;
        default:
          return;
      }
  },

  handleLike: function(event) {
    event.preventDefault();
    if (this.model.escape("user_liked") === "true") {
      this.dislike();
    } else {
      this.like();
    }
  },

  dislike: function() {
    var that = this;
    var likes = this.model.get("likes") - 1;
    var like = new Picturito.Models.PictureLike({
      id: this.model.id,
    });

    like.destroy({
      success: function() {
        that.model.set("user_liked", "false");
        that.model.set("likes", likes)
        that.model.trigger('like');
      }
    });
  },

  like: function() {
    var that = this;
    var likes = this.model.get("likes") + 1;
    var newLike = new Picturito.Models.PictureLike({
      picture_id: this.model.id
    });

    newLike.save({}, {
      success: function() {
        that.model.set("user_liked", "true");
        that.model.set("likes", likes);
        that.model.trigger('like');
      }
    });
  },

  addCommentBefore: function(comment) {
    var commentShow = new Picturito.Views.CommentShow({
      model: comment
    });
    comment.fetch();

    this.addSubview(".ul-comments", commentShow);
  },

  addComment: function(comment) {
    var commentShow = new Picturito.Views.CommentShow({
      model: comment
    });
    comment.fetch();

    this.addCommentSubview(".ul-comments", commentShow);
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
    var view = this;
    var renderContent = this.splashTemplate({
      picture: this.model
    });
    this.splash = true;

    this.$el.html(renderContent);
    return this;
  },

  remove: function(){
    $(document).off("keydown");
    Backbone.CompositeView.prototype.remove.call(this);
  },

  render: function() {
    var view = this;
    var renderContent = this.template({
      picture: this.model
    });
    this.splash = false;

    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  },

  afterSwap: function(){
    // unsubscribe from this event upon remove
    $(document).on("keydown", this.keyHandler.bind(this));
  }

});
