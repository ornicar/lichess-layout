Chessground(document.getElementById('main-board'));

function resizeBoard() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
}

window.addEventListener('resize', resizeBoard);

document.getElementById('zoom-input').addEventListener('input', function(e) {
  document.body.setAttribute('style', `--zoom: ${parseInt(e.target.value)}`);
  resizeBoard();
});
