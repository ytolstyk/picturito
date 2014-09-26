Picturito.Views.ActivitiesIndex = Backbone.CompositeView.extend({
  tagName: "li",

  className: "dropdown",

  template: JST['activities/index'],

  initialize: function() {
    this.listenTo(this.collection, "sync add remove like", this.render);
  },

  addActivity: function(activity) {
    var activityShow = new Picturito.Views.ActivityShow({
      model: activity
    });

    this.addSubview(".ul-activities", activityShow);
  },

  events: {
    "click .close-activity": "keepOpen"
  },

  keepOpen: function(event) {
    event.stopPropagation();
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
    return this;
  }
});
