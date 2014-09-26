window.Picturito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    console.log("started backbone");

    new Picturito.Routers.Pictures({
      $main: $("#main"),
      $activities: $("ul.activities"),
      $activitiesBtn: $("a.dropdown-toggle")
    });

    Backbone.history.start();
  }
};

$(function () {
  Picturito.initialize();

  function _toggleFormEnabled($form, disable) {
    $form.find(".picture-file").prop("disabled", disable);
    $form.find(":input").prop("disabled", disable);
    $form.find("button").prop("disabled", disable);
  };

  function clearForm($form) {
    $form.find(":input").val("");
    removeAlert();
    $(".close").trigger("click");
    $(".refresh").trigger("click");
  };

  function displayError($form) {
    var $alert = $("<div class='alert alert-danger inline-block'>");
    $alert.html("Something went wrong with your upload");
    $(".modal-content").find(".modal-footer").prepend($alert);
    _toggleFormEnabled($form, false);
  };

  function removeAlert() {
    $(".modal-footer").find(".alert").remove();
  };

  $("#pictureUpload").on("hidden.bs.modal", function(event) {
    removeAlert();
  });

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
        error: function() {
          uploadCallback();
          displayError($form);
        },
        success: function() {
          uploadCallback();
          clearForm($form);
        },
        wait: true
      });
    });

    if (file === undefined) {
      displayError($form);
    } else {
      reader.readAsDataURL(file);
    }
  });

});
