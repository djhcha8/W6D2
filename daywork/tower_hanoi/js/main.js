const HanoiGame = require('./game');
const HanoiView = require('./hanoi_views');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});