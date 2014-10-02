Picturito.Views.UserProfile = Backbone.CompositeView.extend({
  className: "profile-wrapper",

  template: JST["users/show"],

  initialize: function() {
    this.listenTo(this.collection, "add remove reset", this.render);
  },

  addPicture: function(picture) {
    var profilePicture = new Picturito.Views.UserProfilePicture({
      model: picture
    });

    this.addSubview(".ul-profile-pictures", profilePicture);
  },

  events: {
    "click button.refresh": "refresh",
    "click button.load-more": "loadMore"
  },

  refresh: function(event) {
    event.preventDefault();
    this.collection.fetch();
  },

  loadMore: function(event) {
    event.preventDefault();
    this.collection.fetchNextPage();
  },

  render: function() {
    this._subviews = {};

    var view = this;
    this.collection.each(function(picture) {
      view.addPicture(picture);
    });
    
    var renderContent = this.template({
      collection: this.collection
    });
    
    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  }

});