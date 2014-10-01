Picturito.Views.ProfilePicture = Backbone.View.extend({
  tagName: "li",

  className: "li-profile-picture",

  template: JST["users/profile_picture"],

  editTemplate: JST["users/profile_picture_edit"],

  initialize: function() {
    this.listenTo(this.model, "sync add remove reset like", this.render);
  },

  events: {
    "click .delete-picture": "deletePicture",
    "dblclick .profile-picture-info": "renderEdit",
    "submit .profile-picture-edit": "updatePicture"
  },

  deletePicture: function(event) {
    event.preventDefault();
    var view = this;
    var $parent = $($(event.currentTarget).parent());
    $parent.children().effect("explode", { pieces: 6 }, 300)
    $parent.effect("explode", { pieces: 6 }, 300, function() {
      view.model.destroy();
      view.remove();
    });
  },

  updatePicture: function(event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var title = $form.find(".edit-title").val();
    var description = $form.find(".edit-description").val();

    this.model.save({
      title: title,
      description: description
    }, this.render);
  },

  renderEdit: function() {
    var renderContent = this.editTemplate({
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
    return this;
  }

});