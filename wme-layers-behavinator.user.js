// ==UserScript==
// @name        WME Beta layers menu behavinator
// @namespace   http://www.tomputtemans.com/
// @description Makes the layers menu appear when hovering over the button and stick when clicked
// @include     https://beta.waze.com/*editor/*
// @version     0.2
// @grant       none
// ==/UserScript==
(function() {
  function init(e) {
    if (e && e.user == null) {
      return;
    }

    var switcher = document.querySelector('.layer-switcher');
    if (!switcher) {
      setTimeout(init, 300);
      return;
    }
    var content = switcher.querySelector('.content');
    switcher.addEventListener('click', function(e) {
      console.log('click received', e);
      if (e.target.classList.contains('toolbar-button')) {
        console.log('click intercepted');
        e.preventDefault();
        content.classList.toggle('forced');
        content.classList.toggle('not-visible', !content.classList.contains('forced'));
        document.getElementById('editor-container').style.paddingRight = (content.classList.contains('forced') ? '230px' : '0');
      }
    });
    switcher.addEventListener('mouseover', function() {
      if (!content.classList.contains('forced')) {
        content.classList.remove('not-visible');
      }
    });
    switcher.addEventListener('mouseleave', function() {
      if (!content.classList.contains('forced')) {
        content.classList.add('not-visible');
      }
    });
  }

  init();
})();