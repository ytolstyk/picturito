Picturito.Collections.Activities = Backbone.Collection.extend({
  model: Picturito.Models.Activity,
  url: "api/activities"
});

Picturito.activities = new Picturito.Collections.Activities();