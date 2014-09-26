Picturito.Collections.Activities = Backbone.Collection.extend({
  model: Picturito.Models.Activity,
  url: "api/activities"
});

Picturito.activites = new Picturito.Collections.Activities();