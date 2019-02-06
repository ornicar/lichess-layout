document.querySelector('#topnav-toggle').addEventListener('change', e => {
  document.body.classList.toggle('masked', e.target.checked);
});
