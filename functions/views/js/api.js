/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
async function api(route, data = '', method = 'get') {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: window.location.origin + route,
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

axios.create({
  baseURL: window.location.origin,
});
