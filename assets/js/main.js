const board = document.getElementById('board');

Chessground(board);

function resizeBoard() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
}

window.addEventListener('resize', resizeBoard);

document.getElementById('zoom').addEventListener('input', function(e) {
  const zoom = parseInt(e.target.value);
  const scale = (zoom / 100) * 0.6 + 0.4;
  document.body.setAttribute('style', `--scale: ${scale}`);
  resizeBoard();
});
