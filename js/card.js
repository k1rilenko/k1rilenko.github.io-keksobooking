'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  function getCard(apartment) {
    var newCard = cardTemplate.cloneNode(true);
    editCard('.popup__title', apartment.offer.title);
    editCard('.popup__text--address', apartment.offer.address);
    editCard('.popup__text--price', apartment.offer.price + ' ₽/ночь');
    editCard('.popup__type', getTypeValue(apartment.offer.type));
    editCard('.popup__text--capacity', apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей');
    editCard('.popup__text--time', 'Заезд после' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout);
    editCard('.popup__description', apartment.offer.description);
    newCard.querySelector('.popup__avatar').src = apartment.author.avatar;
    getPhotos(apartment.offer.photos);
    getFeatures(apartment.offer.features);
    return newCard;

    function getTypeValue(element) {
      var typeValue = element;
      switch (typeValue) {
        case 'flat': return 'Квартира';
        case 'bungalo': return 'Бунгало';
        case 'house': return 'Дом';
        default: return 'Дворец';
      }
    }


    function editCard(searchClass, editText) {
      newCard.querySelector(searchClass).textContent = editText;
    }
    function getPhotos(array) {
      var photosWrapper = newCard.querySelector('.popup__photos');
      var firstImage = photosWrapper.querySelector('img');
      array.forEach(function (element) {
        photosWrapper.appendChild(getImageToPopup(element));
      });
      photosWrapper.removeChild(firstImage);

      function getImageToPopup(path) {
        var img = photosWrapper.querySelector('img').cloneNode(true);
        img.src = path;
        return img;
      }
    }
    function getFeatures(array) {
      var featuresWrapper = newCard.querySelector('.popup__features');
      var fragmentFeatures = document.createDocumentFragment();
      while (featuresWrapper.firstChild) {
        featuresWrapper.removeChild(featuresWrapper.firstChild);
      }
      for (var i = 0; i < array.length; i++) {
        var featuresElement = document.createElement('li');
        featuresElement.classList.add('popup__feature', 'popup__feature--' + array[i]);
        fragmentFeatures.appendChild(featuresElement);
      }
      featuresWrapper.appendChild(fragmentFeatures);
    }
  }

  function closePopup(element) {
    if (element) {
      window.mapModule.map.removeChild(element);
    } else {
      return;
    }
  }

  function popupCloseEscHandler(evt) {
    if (evt.keyCode === window.mapModule.KEY_ESC) {
      closePopup(document.querySelector('.map__card'));
    }
    document.removeEventListener('keydown', popupCloseEscHandler);
  }

  function showApartPopup(apartItem) {
    var card = document.querySelector('.map__card');
    var newCard = window.card.getCard(apartItem);
    var closePopupButton = newCard.querySelector('.popup__close');

    if (card) {
      window.mapModule.map.removeChild(card);
    }
    closePopupButton.addEventListener('click', function () {
      closePopup(newCard);
    });
    closePopupButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.mapModule.KEY_ESC) {
        closePopup(newCard);
      }
    });
    document.addEventListener('keydown', popupCloseEscHandler);

    window.mapModule.map.appendChild(newCard);
  }
  window.card = {
    getCard: getCard,
    closePopup: closePopup,
    showApartPopup: showApartPopup,
  };
})();
