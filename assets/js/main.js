const board = document.getElementById('board');

Chessground(board);

function resizeBoard() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
}

window.addEventListener('resize', resizeBoard);

document.getElementById('zoom').addEventListener('input', function(e) {
  document.body.setAttribute('style', `--zoom: ${parseInt(e.target.value)}`);
  resizeBoard();
});
