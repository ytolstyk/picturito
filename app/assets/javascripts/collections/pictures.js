Picturito.Collections.Pictures = Backbone.Collection.extend({
  model: Picturito.Models.Picture,

  url: "pictures",

  getOrFetch: function(id) {
    var board = this.get(id);

    if (!board) {
      board = new TrelloClone.Models.Board({ id: id });
      board.fetch({
        success: function() {
          this.add(board)
        }.bind(this)
      });
    }

    return board;
  }

});

Picturito.pictures = new Picturito.Collections.Pictures();