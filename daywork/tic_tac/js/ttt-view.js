class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const $ul = $('ul');
    $ul.on('click', 'li', (e) => {
      if (this.makeMove($(e.target)) === true) {
        $ul.off('click');
      }
    });
  }


  makeMove($square) {
    try {
      const currentPlayer = this.game.currentPlayer;
      this.game.playMove($square.data('pos'));
      $square.text(currentPlayer);
      $square.addClass(`click ${currentPlayer}`);
      $square.removeClass('unclicked');
      if (this.game.isOver()) {
        $(`.${currentPlayer}`).addClass('winner');
        $(`.${this.game.currentPlayer}`).addClass('loser');
        const $unclicked = $(".unclicked");
        $unclicked.addClass('unclicked-over');
        $unclicked.removeClass('unclicked');
        this.$el.append($(`<h2>You win, ${currentPlayer}</h2>`));
        return true;
      }
    }
    catch(err) {
      alert("Invalid move!");
    }
  }

  setupBoard() {
    const $ul = $("<ul></ul>");
    this.$el.append($ul);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $li = $("<li class='unclicked'><span></span></li>");
        $li.data('pos', [i,j]);
        $ul.append($li);
      }
    }
  }
}

module.exports = View;
