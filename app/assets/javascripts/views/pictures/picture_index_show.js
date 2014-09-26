Picturito.Views.PictureIndexShow = Backbone.View.extend({
  tagName: "li",

  className: "li-picture",

  template: JST["pictures/index_show"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click div.picture-like": "handleLike"
  },

  handleLike: function(event) {
    event.preventDefault();
    var $heart = $(event.currentTarget).find(".glyphicon");
    if ($heart.attr("style") === "color: red;") {
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

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});