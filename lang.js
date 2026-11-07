// Arată documentul în limba telefonului; butoanele schimbă limba.
(function () {
  document.documentElement.classList.add('js');
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.doc'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('nav.langs button'));
  function show(lang) {
    var found = sections.some(function (s) { return s.lang === lang; });
    if (!found) lang = 'en';
    sections.forEach(function (s) { s.hidden = s.lang !== lang; });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    document.documentElement.lang = lang;
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.lang); history.replaceState(null, '', '#' + b.dataset.lang); });
  });
  var fromHash = location.hash.replace('#', '');
  var fromBrowser = (navigator.language || 'en').slice(0, 2);
  show(fromHash || fromBrowser);
})();
