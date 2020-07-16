/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const origin = [];

if (window.location.origin === 'http://127.0.0.1:5500') {
  origin.push('http://localhost:5000');
} else {
  origin.push(window.location.origin);
}

async function OldApi(route, data = '', method = 'get') {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: origin[0] + route,
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
  baseURL: origin[0],
});
