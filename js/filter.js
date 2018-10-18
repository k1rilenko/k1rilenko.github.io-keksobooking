'use strict';
(function () {
  var filter = window.formModule.mapFilters;
  var filterType = filter.querySelector('#housing-type');
  var filterPrice = filter.querySelector('#housing-price');
  var filterRoom = filter.querySelector('#housing-rooms');
  var filterGuest = filter.querySelector('#housing-guests');
  var filterObject = {};
  function getFilterValues() {
    filterObject.type = filterType.value;
    filterObject.price = filterPrice.value;
    filterObject.rooms = filterRoom.value;
    filterObject.guests = filterGuest.value;
    filterObject.features = gerFeaturesArray();
    function gerFeaturesArray() {
      var featuresArray = [];
      var featuresList = document.querySelectorAll('.map__checkbox');
      for (var i = 0; i < featuresList.length; i++) {
        if (featuresList[i].checked) {
          featuresArray.push(featuresList[i].value);
        }
      }
      return featuresArray;
    }
  }

  function filterObjects() {
    return window.mapModule.mapObjects.filter(function (object) {
      return syncType(object) && syncRooms(object) && syncPrice(object) && syncGuest(object) && checkFeatures(filterObject.features, object.offer.features);
    });
  }

  function closeCard() {
    var card = document.querySelector('.map__card');
    if (card) {
      window.card.closePopup(card);
    } else {
      return;
    }
  }

  function syncType(data) {
    switch (filterObject.type) {
      case 'palace': return data.offer.type === 'palace';
      case 'flat': return data.offer.type === 'flat';
      case 'house': return data.offer.type === 'house';
      case 'bungalo': return data.offer.type === 'bungalo';
      default: return data.offer.type;
    }
  }
  function syncPrice(data) {
    switch (filterObject.price) {
      case 'low': return data.offer.price < 10000;
      case 'middle': return data.offer.price >= 10000 && data.offer.price < 50000;
      case 'high': return data.offer.price >= 50000;
      default: return data.offer.price;
    }
  }
  function syncGuest(data) {
    switch (filterObject.guests) {
      case '1': return data.offer.guests === 1;
      case '2': return data.offer.guests === 2;
      case '0': return data.offer.guests === 0;
      default: return data.offer.guests;
    }
  }
  function syncRooms(data) {
    switch (filterObject.rooms) {
      case '1': return data.offer.rooms === 1;
      case '2': return data.offer.rooms === 2;
      case '3': return data.offer.rooms === 3;
      default: return data.offer.rooms;
    }
  }
  function findInArray(array, value) {
    return array.indexOf(value);
  }

  function checkFeatures(filterFeatures, apartFeatures) {
    var result = true;
    filterFeatures.forEach(function (object) {
      result = result && (findInArray(apartFeatures, object) > -1);
    });
    return result;
  }

  var lastTimeout;
  filter.addEventListener('change', function () {
    getFilterValues();
    window.pin.deletePin();
    closeCard();
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pin.getAllMapPins(filterObjects());
    }, 500);
  });
  window.filterModule = {
    closeCard: closeCard
  };
})();
