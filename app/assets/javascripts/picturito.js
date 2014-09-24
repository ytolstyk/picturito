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

  // function handleFile(file) {
  //   var reader = new FileReader();
  //   reader.onload = function(e) {
  //     // send e.target.result in $.ajax request
  //     console.log(this.result);
  //   }
  //   reader.readAsDataURL(file);
  // };

  function _toggleFormEnabled($form, disable) {
    $form.find(".picture-file").prop("disabled", disable);
  };

  $(".picture-upload").on("click", function(event) {
    event.preventDefault();
    var $form = $(".picture-upload-form");
    var title = $($form.find(".picture-title")).val();
    var description = $($form.find(".picture-description")).val();
    var file = $form.find(".picture-file")[0].files[0];
    var picture = new Picturito.Models.Picture({
      title: title,
      description: description
    });
    var reader = new FileReader();
    var self = this;
    var uploadCallback = _toggleFormEnabled.bind(this, $form, false);

    _toggleFormEnabled($form, true);
    reader.addEventListener("load", function(fileEvent) {
      var fileContent = this.result;
      picture.set("img_url", fileContent);
      picture.save([], {
        error: uploadCallback,
        success: function() {
          uploadCallback();
          alert("we're here!");
        },
        wait: true
      });
    });

    reader.readAsDataURL(file);
  });

});
