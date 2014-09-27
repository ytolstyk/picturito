Picturito.Collections.Activities = Backbone.Collection.extend({
  model: Picturito.Models.Activity,

  url: "api/activities",

  initialize: function() {
    this.page = 1;
  },

  fetchNextPage: function() {
    this.page += 1;
    this.fetch({ remove: false, data: { page: this.page } });
  }
});

Picturito.activities = new Picturito.Collections.Activities();