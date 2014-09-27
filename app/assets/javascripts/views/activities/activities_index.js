Picturito.Views.ActivitiesIndex = Backbone.CompositeView.extend({
  tagName: "li",

  className: "dropdown",

  template: JST['activities/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove reset", this.render);
    this.$more = $("<li class='load-more-activities'><a href='#'>load more</a></li>");
  },

  events: {
    "click li.load-more-activities": "loadMore"
  },

  loadMore: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.collection.fetchNextPage();
  },

  addActivity: function(activity) {
    var activityShow = new Picturito.Views.ActivityShow({
      model: activity
    });

    this.addSubview(".ul-activities", activityShow);
  },

  render: function() {
    this._subviews = {};

    var view = this;
    this.collection.each(function(activity) {
      view.addActivity(activity);
    });

    var renderContent = this.template({
      // activities: this.collection
    });

    this.$el.html(renderContent);
    this.attachSubviews();
    this.$el.find(".ul-activities").append(this.$more);
    return this;
  }
});
