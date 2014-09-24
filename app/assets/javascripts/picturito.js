window.Picturito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    console.log("started backbone");

    new Picturito.Routers.Pictures({
      $main: $("#main")
    });

    Backbone.history.start();
  }
};

$(function () {
  Picturito.initialize();
});
