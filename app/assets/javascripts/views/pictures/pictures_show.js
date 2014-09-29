Picturito.Views.PictureShow = Backbone.CompositeView.extend({

  template: JST['pictures/show'],
  splashTemplate: JST['pictures/show_splash'],

  initialize: function() {
    this.listenTo(this.model, "sync reset", this.render);

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
    "submit form.new-comment": "createComment"
  },

  keyHandler: function(key) {
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
