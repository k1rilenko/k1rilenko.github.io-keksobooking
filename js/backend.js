'use strict';
(function () {
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  function download(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время соединения c сервером. Сервер не ответил за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL_GET);
    xhr.send();
  }
  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время соединения c сервером. Сервер не ответил за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL_POST);
    xhr.send(data);
  }
  window.backend = {
    download: download,
    upload: upload
  };
})();
