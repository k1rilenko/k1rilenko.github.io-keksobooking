'use strict';
(function () {

  var MAX_SHOW_PIN = 5;
  var MAP_LIMIT = {
    top: 130,
    bottom: 630
  };
  var START_POSITION = {
    left: 'left: 570px;',
    top: 'top: 375px'
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var heightDisableMainPin = mapPinMain.offsetHeight / 2;
  var heightActiveMainPin = mapPinMain.offsetHeight + 14;

  function getSingleMapPin(apartItem) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + apartItem.location.x + 'px; top:' + apartItem.location.y + 'px;';
    pinElement.querySelector('img').src = apartItem.author.avatar;
    pinElement.querySelector('img').alt = apartItem.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.showApartPopup(apartItem);
    });
    return pinElement;
  }
  function getAllMapPins(objects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(objects.length, MAX_SHOW_PIN); i++) {
      fragment.appendChild(getSingleMapPin(objects[i]));
    }
    window.mapModule.mapPin.appendChild(fragment);
    window.mapModule.mapPinMain.removeEventListener('click', window.formModule.repeatGetAllMapPin);
  }

  function initMapPins(data) {
    window.mapModule.mapObjects = data;
    getAllMapPins(data);
  }

  function setDefaultPosition() {
    mapPinMain.style = START_POSITION.left + START_POSITION.top;
  }
  var mapLimits = {
    top: MAP_LIMIT.top - heightActiveMainPin,
    right: map.offsetWidth + map.offsetLeft - mapPinMain.offsetWidth,
    bottom: MAP_LIMIT.bottom - heightActiveMainPin,
    left: map.offsetLeft + mapPinMain.offsetWidth
  };
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };
      if (startCoords.x > mapLimits.right) {
        mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
      } else if (startCoords.x < mapLimits.left) {
        mapPinMain.style.left = 0 + 'px';
      }
      if (startCoords.y > mapLimits.bottom) {
        mapPinMain.style.top = mapLimits.bottom + 'px';
      } else if (startCoords.y < mapLimits.top) {
        mapPinMain.style.top = mapLimits.top + 'px';
      }
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      window.formModule.getStartLocate(heightActiveMainPin);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function deletePin() {
    var allPins = map.querySelectorAll('[type="button"]');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].parentElement.removeChild(allPins[i]);
    }
  }

  mapPinMain.addEventListener('mouseup', window.mapModule.activeFormHandler);
  window.formModule.getStartLocate(heightDisableMainPin);
  window.pin = {
    getAllMapPins: getAllMapPins,
    setDefaultPosition: setDefaultPosition,
    heightDisableMainPin: heightDisableMainPin,
    heightActiveMainPin: heightActiveMainPin,
    deletePin: deletePin,
    initMapPins: initMapPins
  };
})();
