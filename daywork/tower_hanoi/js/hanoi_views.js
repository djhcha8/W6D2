class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.clickTower();
  }
  
  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $('<ul></ul>').addClass(`tower${i}`);
      this.$el.append($ul);
      $ul.append($("<li><div></div></li>").addClass('base'));
    }
    for (let i = 3; i > 0; i--) {
      const $li = $('<li><div></div></li>').addClass(`disk${i}`);
      $('.tower0').prepend($li);
    }
  }
  
  render() {
    const currentBoard = this.game.towers;
    $('li[class^="disk"]').remove();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        const $li = $('<li><div></div></li>').addClass(`disk${currentBoard[i][j]}`);
        $(`.tower${i}`).prepend($li);
      }
    }
  }
  
  clickTower() {
    let firstClick = false;
    const $ul = $('ul');
    
    $ul.on('click', (e) => {
      if (firstClick) {
        this.toggleFirstClick(firstClick);
        let secondClick = this.getCurrentTower(e)[5];
        if (this.game.move(parseInt(firstClick), parseInt(secondClick)) === false)
        {
          alert('Invalid move!');
        }
        this.render();
        firstClick = false;
        
        if (this.game.isWon()) {
          alert('VICTORY!');
          $('li[class^="disk"] div').css('background-color', 'green');
          $ul.off();
        }
      } else {
        firstClick = this.getCurrentTower(e)[5];
        this.toggleFirstClick(firstClick);
      }
    });
  }
  
  getCurrentTower(e) {
    return $(e.currentTarget).attr('class');
  }
  
  toggleFirstClick(firstClick) {
    $(`.tower${firstClick}` + " .base div").toggleClass('clicked');
  }
}

module.exports = HanoiView;