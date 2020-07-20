/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
let origin;
let developerMode = false;

if (window.location.origin === 'http://127.0.0.1:5500') {
  developerMode = true;
}

if (developerMode) {
  origin = 'http://localhost:5000';
} else {
  origin = window.location.origin;
}

async function OldApi(route, data = '', method = 'get') {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: origin + route,
      dataType: 'json',
      cache: false,
      crossDomain: true,
      headers: {
        Accept: 'application/json',
        Autorization: 'authorization',
      },
      method,
      data,
    }).done((response) => {
      resolve(response);
    }).fail((error) => {
      console.log(error);
      reject(error);
    });
  });
}

const api = axios.create({
  baseURL: origin,
});
