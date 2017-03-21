// ==UserScript==
// @name        WME layers menu behavinator
// @namespace   http://www.tomputtemans.com/
// @description Makes the layers menu appear when hovering over the button and stick when clicked
// @include     /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/.*$/
// @version     0.6
// @grant       none
// ==/UserScript==
(function() {
  function init() {
    if (!document.querySelector('.layer-switcher')) {
      setTimeout(init, 300);
      return;
    }
    setTimeout(addButtonBehaviour, 50); // necessary as the switcher often hasn't been replaced yet when the mode changes
  }
  
  function addButtonBehaviour() {
    var switcher = document.querySelector('.layer-switcher');
    var content = switcher.querySelector('.content');
    switcher.addEventListener('click', function(e) {
      if (e.target.classList.contains('toolbar-button')) {
        e.preventDefault();
        content.classList.toggle('forced');
        content.classList.toggle('not-visible', !content.classList.contains('forced'));
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
    console.log('Layer behavinator has applied its event listeners to ', switcher);
  }

  function addModeChangeListener() {
    if (Waze.app && Waze.app.modeController && Waze.loginManager) {
      Waze.app.modeController.model.bind('change:mode', init);
      Waze.loginManager.events.register("login", null, init);
      Waze.loginManager.events.register("loginStatus", null, init);
    } else {
      setTimeout(addModeChangeListener, 400);
    }
  }
  addModeChangeListener();
  init();
})();