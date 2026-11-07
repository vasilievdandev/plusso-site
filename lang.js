// Limba paginilor: engleza implicit; alegerea din meniu se ține minte, iar #ro, #ru etc. din link o
// forțează. Pe pagina principală textele vin din text.js; pe paginile legale se arată secțiunea limbii.
(function () {
  var LANGS = ['en', 'ro', 'ru', 'uk', 'es', 'de', 'it'];
  var KEY = 'plusso-lang';
  document.documentElement.classList.add('js');

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* navigare privată */ }
  }

  var texts = window.PLUSSO_TEXT;
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.doc'));
  var select = document.querySelector('.lang select');

  function show(lang) {
    if (LANGS.indexOf(lang) < 0) lang = 'en';
    document.documentElement.lang = lang;
    if (select) select.value = lang;
    if (texts) {
      var dict = texts[lang] || texts.en;
      Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function (el) {
        var value = dict[el.getAttribute('data-t')];
        if (value) el.textContent = value;
      });
      if (dict.title) document.title = dict.title;
    }
    sections.forEach(function (s) { s.hidden = s.lang !== lang; });
    var title = sections.filter(function (s) { return !s.hidden; })[0];
    var h1 = title && title.querySelector('h1');
    if (h1) document.title = 'Plusso · ' + h1.textContent;
    // Linkurile spre celelalte pagini păstrează limba.
    Array.prototype.forEach.call(document.querySelectorAll('a[data-page]'), function (a) {
      a.setAttribute('href', a.getAttribute('data-page') + (lang === 'en' ? '' : '#' + lang));
    });
  }

  if (select) {
    select.addEventListener('change', function () {
      remember(select.value);
      history.replaceState(null, '', select.value === 'en' ? location.pathname : '#' + select.value);
      show(select.value);
    });
  }

  var fromHash = location.hash.replace('#', '');
  if (LANGS.indexOf(fromHash) >= 0) {
    show(fromHash);
  } else {
    show(saved() || 'en');
  }
})();
