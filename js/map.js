'use strict';
(function () {
  var KEY_ESC = 27;
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapObjects = [];
  function activeFormHandler() {
    map.classList.remove('map--faded');
    window.formModule.form.classList.remove('ad-form--disabled');
    window.backend.download(window.pin.initMapPins, window.formModule.errorFormHandler);
    window.formModule.toogleDisableForm(false);
    window.formModule.toogleDisableFilters(false);
    window.formModule.getStartLocate(window.pin.heightActiveMainPin);
    mapPinMain.removeEventListener('mouseup', window.mapModule.activeFormHandler);
    window.formModule.changeTypeSelect();
    window.formModule.numberOfGuestsHandler();
  }
  function disableApplication() {
    map.classList.add('map--faded');
    window.formModule.form.classList.add('ad-form--disabled');
    window.formModule.toogleDisableFilters(true);
    window.formModule.toogleDisableForm(true);
    window.formModule.form.reset();
    window.formModule.mapFilters.reset();
    window.pin.setDefaultPosition();
    window.formModule.changeTypeSelect();
    window.formModule.numberOfGuestsHandler();
    window.pin.deletePin();
    window.filterModule.closeCard();
    window.formModule.getStartLocate(window.pin.heightDisableMainPin);
    window.mapModule.mapPinMain.addEventListener('click', window.mapModule.activeFormHandler);
  }

  window.mapModule = {
    map: map,
    mapPin: mapPin,
    mapPinMain: mapPinMain,
    activeFormHandler: activeFormHandler,
    KEY_ESC: KEY_ESC,
    mapObjects: mapObjects,
    disableApplication: disableApplication
  };
})();
