Picturito.Views.UserProfilePicture = Backbone.View.extend({
  tagName: "li",

  className: "li-profile-picture",

  template: JST["users/user_profile_picture"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    
  },

  render: function() {
    var renderContent = this.template({
      picture: this.model
    });

    this.$el.html(renderContent);
    return this;
  }

});