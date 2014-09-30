Picturito.Views.ProfilePicture = Backbone.View.extend({
  tagName: "li",

  className: "li-profile-picture",

  template: JST["users/profile_picture"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click .delete-picture": "deletePicture"
  },

  deletePicture: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});