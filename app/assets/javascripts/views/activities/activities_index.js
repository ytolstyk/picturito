Picturito.Views.ActivitiesIndex = Backbone.CompositeView.extend({
  tagName: "li",

  className: "dropdown",

  template: JST['activities/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add reset", this.render);
    this.$noMore = $("<li class='li-activity'>");
    this.$noMore.html("<a href='#'>nothing happened lately</a>");
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

    var renderContent = this.template({});

    this.$el.html(renderContent);
    this.attachSubviews();
    if (this.collection.length === 0) {
      $(".ul-activities").append(this.$noMore);
    }
    return this;
  }
});
