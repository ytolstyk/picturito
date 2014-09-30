window.Picturito = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    
    new Picturito.Routers.Pictures({
      $main: $("#main"),
      $navbarActivities: $("ul.nav.navbar-nav.activities"),
      $activitiesBtn: $("ul.activities")
    });

    Backbone.history.start();
  }
};

$(function () {
  Picturito.initialize();

  function _toggleFormEnabled($form, disable) {
    $form.find(".upload-picture-file").prop("disabled", disable);
    $form.find(":input").prop("disabled", disable);
    $form.find("button").prop("disabled", disable);
  };

  function clearForm($form) {
    var $alert = $("<div class='alert alert-success inline-block'>");
    $alert.html("Success!");
    $(".modal-content").find(".modal-footer").prepend($alert);
    $form.find(":input").val("");
    $(".close").trigger("click");
    $(".refresh").trigger("click");
  };

  function displayError($form, $btn) {
    $("div.alert.alert-danger").remove();
    var $alert = $("<div class='alert alert-danger inline-block'>");
    $alert.html("Something went wrong with your upload");
    $(".modal-content").find(".modal-footer").prepend($alert);
    _toggleFormEnabled($form, false);
    resetButton($btn);
  };

  function removeAlert() {
    $(".modal-footer").find(".alert").remove();
  };

  function resetButton($btn) {
    $btn.button("reset");
  };

  $("#pictureUpload").on("hidden.bs.modal", function(event) {
    removeAlert();
  });

  $("#picture-upload").on("click", function(event) {
    $(".picture-upload").attr("data-type", "upload");
    $("#Upload").text("Upload Picture");
  });

  $("#avatar-upload").on("click", function(event) {
    $(".picture-upload").attr("data-type", "avatar");
    $("#Upload").text("Upload Avatar");
  });

  $(".picture-upload").on("click", function(event) {
    event.preventDefault();
    var $btn = $(this);
    $btn.button("loading");
    var uploadType = $(event.currentTarget).data("type");
    var $form = $(".picture-upload-form");
    var title = $($form.find(".upload-picture-title")).val();
    var description = $($form.find(".upload-picture-description")).val();
    var file = $form.find(".upload-picture-file")[0].files[0];

    if (uploadType === "avatar") {
      var picture = new Picturito.Models.Avatar({
        title: title,
        description: description
      });
      var column = "image";
    } else {
      var picture = new Picturito.Models.Picture({
        title: title,
        description: description
      });
      var column = "img_url";
    }

    var reader = new FileReader();
    var self = this;
    var uploadCallback = _toggleFormEnabled.bind(this, $form, false);

    _toggleFormEnabled($form, true);
    reader.addEventListener("load", function(fileEvent) {
      var fileContent = this.result;
      picture.set(column, fileContent);
      // picture.set("img_url", fileContent);
      picture.save([], {
        error: function() {
          uploadCallback();
          displayError($form, $btn);
        },
        success: function() {
          uploadCallback();
          clearForm($form);
          resetButton($btn);
        },
        wait: true
      });
    });

    if (file === undefined) {
      displayError($form, $btn);
    } else {
      reader.readAsDataURL(file);
    }
  });

  $(".guest-sign-in").on("click", function(event) {
    event.preventDefault();
    $("#userName").val("guest");
    $("#userPassword").val("something");
    $(".sign-in-button").trigger("click");
  });

});
