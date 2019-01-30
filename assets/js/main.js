const board = document.getElementById('board');
Chessground(board);

window.addEventListener('resize', function() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
});
