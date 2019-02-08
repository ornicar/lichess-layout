document.querySelector('#topnav-toggle').addEventListener('change', e => {
  document.body.classList.toggle('masked', e.target.checked);
});

window.onload = function() {
  Array.from(document.getElementsByClassName('mini-board'))
    .forEach(el => Chessground(el, {viewOnly: true}));
}

function resizeBoard() {
  const ev = document.createEvent('Event');
  ev.initEvent('chessground.resize', false, false);
  document.body.dispatchEvent(ev);
}

window.addEventListener('resize', resizeBoard);
