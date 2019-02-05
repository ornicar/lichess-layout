function resizeBoard() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
}

window.onload = function() {
  Chessground(document.getElementById('main-board'));
}

window.addEventListener('resize', resizeBoard);

document.getElementById('zoom-input').addEventListener('input', function(e) {
  document.querySelector('.site-content').setAttribute('style', `--zoom: ${parseInt(e.target.value)}`);
  resizeBoard();
});
