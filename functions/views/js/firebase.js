/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Initialize Firebase.
const config = {
  apiKey: 'AIzaSyCkYehF5D_TWlTEDNnbHNJt0EVKqLO9NUo',
  authDomain: 'brother-bet.firebaseapp.com',
  databaseURL: 'https://brother-bet.firebaseio.com',
  projectId: 'brother-bet',
  storageBucket: 'brother-bet.appspot.com',
  messagingSenderId: '1004176095521',
};

firebase.initializeApp(config);

// Shared constants.
const profilePhoto = document.querySelector('.image');
const loginBox = document.querySelector('#container-box');
const enterKey = document.querySelector('#keyEnter');
const reportText = document.querySelector('#report');
const titleText = document.querySelector('#title');
const usernameText = document.querySelector('#txtUsername');
const emailText = document.querySelector('#txtEmail');
const photoURLText = document.querySelector('#txtphotoURL');
const passText = document.querySelector('#txtPassword');
const enterButton = document.querySelector('#btnEnter');
const accountButton = document.querySelector('#btnAccount');
const updateButton = document.querySelector('#btnUpdate');
const signUpButton = document.querySelector('#btnSingUp');
const closeButton = document.querySelector('#btnClose');
const txtDisplayName = document.querySelector('#txtUsername');
const txtEmail = document.querySelector('#txtEmail');
const txtPhotoURL = document.querySelector('#txtPhotoURL');
const txtPassword = document.querySelector('#txtPassword');
const txtRePassword = document.querySelector('#txtRePassword');
const txtPasswordBetfair = document.querySelector('#txtPasswordBet');
const txtApiKey = document.querySelector('#txtApiKey');

// Shared variables.
let email = null;
let displayName = null;
let photoURL = null;

// Firestore variables and constants.
const firestore = firebase.firestore();
const dbUser = firestore.collection('users/');

async function post(path, params = {}, method = 'post') {
  const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
  if (token) params['Header-Autorization'] = token;

  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

// Login functions.
if (closeButton) {
  closeButton.addEventListener('click', () => {
    // Display components.
    signUpButton.style.display = 'inline-block';
    titleText.innerHTML = 'Sign In';
    closeButton.style.display = 'none';
    enterButton.innerHTML = 'enter';
    loginBox.style.display = 'block';
    reportText.style.display = 'none';
  });
}

if (enterButton) {
  enterButton.addEventListener('click', () => {
    if (titleText.innerHTML === 'Sign Up') {
      firebase.auth().createUserWithEmailAndPassword(emailText.value, passText.value)
        .then(() => firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
          .catch((error) => snackbar(`Login${error}`)))
        .catch((error) => snackbar(`SingUp${error}`));
    } else {
      firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
        .catch((error) => {
          snackbar(error);
        });
    }
  });
}

if (enterKey) {
  enterKey.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      enterButton.click();
    }
  });
}

// Home functions.
if (accountButton) {
  accountButton.addEventListener('click', () => {
    emailText.value = email;
    usernameText.value = displayName;
    photoURLText.value = photoURL;
    profilePhoto.style.background = `url('${photoURL}')`;
    // Display components.
    document.querySelector('.photo-dirty').classList.add('is-dirty');
    document.querySelector('.username-dirty').classList.add('is-dirty');
    document.querySelector('.email-dirty').classList.add('is-dirty');
  });
}

if (updateButton) {
  updateButton.addEventListener('click', () => {
    let updateDisplay;
    let updatePhoto;
    let updateEmail;
    let updatePassword;
    if (txtDisplayName.value) {
      updateDisplay = firebase.auth().currentUser.updateProfile({
        displayName: txtDisplayName.value,
      }).then(() => {
        snackbar('Username updated.');
        return 'Username updated.';
      }).catch((error) => {
        snackbar(`Username${error}`);
      });
    } else {
      snackbar('Try another username.');
    }

    // Update photoURL.
    if (txtPhotoURL.value) {
      updatePhoto = firebase.auth().currentUser.updateProfile({
        photoURL: txtPhotoURL.value,
      }).then(() => {
        snackbar('Profile photo updated.');
        return 'Profile photo updated.';
      }).catch((error) => {
        snackbar(`Photo${error}`);
      });
    } else {
      snackbar("Profile photo don't works.");
    }

    // Update email.
    if (txtEmail.value) {
      updateEmail = firebase.auth().currentUser.updateEmail(txtEmail.value)
        .then(() => {
          // Handle errors.
          snackbar('Email updated.');
          return 'Email updated.';
        }).catch((error) => {
          snackbar(`Email${error}`);
        });
    } else {
      snackbar('A valid email address was not inserted.');
    }

    // Update password.
    if (txtPassword.value === txtRePassword.value && txtPassword.value) {
      updatePassword = firebase.auth().updatePassword(txtPassword.value)
        .then(() => {
          snackbar('Password updated.');
          return 'Password updated.';
        }).catch((error) => {
          snackbar(`Passwords${error}`);
        });
    } else {
      snackbar("The passwords don't match or not filleds.");
    }

    // Updade database.
    const updateDatabase = dbUser.doc(firebase.auth().currentUser.uid).update({
      email: txtEmail.value,
      displayName: txtDisplayName.value,
      photoURL: txtPhotoURL.value,
      uid: firebase.auth().currentUser.uid,
      password_betfair: txtPasswordBetfair.value,
      apiKey: txtApiKey.value,
    }).then(() => {
      snackbar('Updated BrotherBet user.');
      return 'Updated user.';
    }).catch((error) => {
      snackbar(`Database${error}`);
    });

    // Reload.
    Promise.all([updateDisplay, updatePhoto, updateEmail, updatePassword, updateDatabase])
      .then(() => firebase.auth().signOut()
        .then(() => firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
          .then(() => snackbar('Updated BrotherBet user.'))
          .catch((error) => {
            snackbar(error);
          })).catch((error) => snackbar(error)))
      .catch((error) => snackbar(`Database${error}`));
  });
}

// Shared functions.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (txtDisplayName) {
      dbUser.doc(firebase.auth().currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            for (const i in doc.data()) if (!doc.data()[i]) s;
            // document.getElementById('btnAccounts').click();
            if (!doc.data().displayName) {
              snackbar("Username it's missing, fill your user.");
            } else {
              txtDisplayName.value = doc.data().displayName || '';
              txtDisplayName.parentElement.classList.add('is-dirty');
            }
            if (!doc.data().email) {
              snackbar("Email it's missing, fill your user.");
            } else {
              txtEmail.value = doc.data().email || '';
              txtEmail.parentElement.classList.add('is-dirty');
            }
            if (!doc.data().photoURL) {
              snackbar("URL of photo it's missing, fill your user.");
            } else {
              txtPhotoURL.value = doc.data().photoURL || '';
              txtPhotoURL.parentElement.classList.add('is-dirty');
            }
            if (!doc.data().password_betfair) {
              snackbar("Password Betfair it's missing, fill your user.");
            } else if (!doc.data().apiKey) {
              snackbar("API key Betfair it's missing, fill your user.");
            } else {
              addBetfair(doc.data().displayName, doc.data().password_betfair, doc.data().apiKey);
              main();
            }
            componentHandler.upgradeAllRegistered();
          } else {
            document.getElementById('btnAccounts').click();
            snackbar('You need to fill your user.');
          }
          return "I'm done!";
        }).catch((error) => snackbar(error));
    } else {
      if (titleText.innerHTML === 'Sign Up') {
        return dbUser.doc(firebase.auth().currentUser.uid).set({
          email: emailText.value,
          uid: firebase.auth().currentUser.uid,
        }).then(async () => {
          loginBox.style.display = 'none';
          reportText.style.display = 'block';
          return post('/home');
        }).catch((error) => {
          snackbar(`Auth${error}`);
        });
      }
      return post('/home');
    }
  } else {
    displayName = null;
    email = null;
    photoURL = null;
    uid = null;
    passwordBetfair = null;
    apiKey = null;
  }
  return user;
});

function logout() {
  firebase.auth().signOut()
    .then(() => post('/index'))
    .catch((error) => snackbar(error));
}
