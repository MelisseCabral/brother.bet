// Initialize Firebase.
var config = {
    apiKey: "AIzaSyCkYehF5D_TWlTEDNnbHNJt0EVKqLO9NUo",
    authDomain: "brother-bet.firebaseapp.com",
    databaseURL: "https://brother-bet.firebaseio.com",
    projectId: "brother-bet",
    storageBucket: "brother-bet.appspot.com",
    messagingSenderId: "1004176095521"
};

firebase.initializeApp(config);

// Shared constants.
const profilePhoto = document.querySelector(".image");
const loginBox = document.querySelector("#container-box");
const enterKey = document.querySelector("#keyEnter");
const reportText = document.querySelector("#report");
const titleText = document.querySelector("#title");
const usernameText = document.querySelector("#txtUsername");
const emailText = document.querySelector("#txtEmail");
const photoURLText = document.querySelector("#txtphotoURL");
const passText = document.querySelector("#txtPassword");
const enterButton = document.querySelector("#btnEnter");
const accountButton = document.querySelector("#btnAccount");
const updateButton = document.querySelector("#btnUpdate");
const sign_upButton = document.querySelector("#btnSingUp");
const closeButton = document.querySelector("#btnClose");
const _displayName = document.querySelector("#txtUsername");
const _email = document.querySelector("#txtEmail");
const _photoURL = document.querySelector("#txtPhotoURL");
const _password = document.querySelector("#txtPassword");
const _re_password = document.querySelector("#txtRePassword");
const _password_betfair = document.querySelector("#txtPasswordBet");
const _apiKey = document.querySelector("#txtApiKey");

// Shared variables.
var email = null;
var displayName = null;
var photoURL = null;
var password_betfair = null;
var apiKey = null;


// Firestore variables and constants.
var firestore = firebase.firestore();
const dbUser = firestore.collection("users/");

// Login functions.
if (closeButton) {
    closeButton.addEventListener("click", () => {
        // Display components.
        sign_upButton.style.display = "inline-block";
        titleText.innerHTML = "Sign In";
        closeButton.style.display = "none";
        enterButton.innerHTML = "enter";
        loginBox.style.display = "block";
        reportText.style.display = "none";
    })
}

if (enterButton) {
    enterButton.addEventListener("click", () => {
        if (titleText.innerHTML === "Sign Up") {
            firebase.auth().createUserWithEmailAndPassword(emailText.value, passText.value).then(() => {
                return firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
                    .catch((error) => {
                        snackbar("Login" + error);
                    });
            }).catch((error) => {
                snackbar("SingUp" + error);
            });
        } else {
            firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
                .catch((error) => {
                    snackbar(error);
                });
        }
    })
}

if (enterKey) {
    enterKey.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            enterButton.click();
        }
    });
}

// Home functions.
if (accountButton) {
    accountButton.addEventListener("click", () => {
        emailText.value = email;
        usernameText.value = displayName;
        photoURLText.value = photoURL;
        profilePhoto.style.background = "url('" + photoURL + "')";
        // Display components.
        document.querySelector('.photo-dirty').classList.add('is-dirty');
        document.querySelector('.username-dirty').classList.add('is-dirty');
        document.querySelector('.email-dirty').classList.add('is-dirty');
    });
}

if (updateButton) {
    updateButton.addEventListener("click", () => {
        if (_displayName.value) {
            var updateDisplay = firebase.auth().currentUser.updateProfile({
                displayName: _displayName.value
            }).then(() => {
                snackbar("Username updated.");
                return "Username updated.";
            }).catch((error) => {
                snackbar("Username" + error);
            });
        } else {
            snackbar("Try another username.");
        }

        // Update photoURL.
        if (_photoURL.value) {
            var updatePhoto = firebase.auth().currentUser.updateProfile({
                photoURL: _photoURL.value
            }).then(() => {
                snackbar("Profile photo updated.");
                return "Profile photo updated.";
            }).catch((error) => {
                snackbar("Photo" + error);
            });
        } else {
            snackbar("Profile photo don't works.");
        }

        // Update email.
        if (_email.value) {
            var updateEmail = firebase.auth().currentUser.updateEmail(_email.value)
                .then(() => {
                    // Handle errors.
                    snackbar("Email updated.");
                    return "Email updated."
                }).catch((error) => {

                    snackbar("Email" + error);
                });
        } else {
            snackbar("A valid email address was not inserted.");
        }

        // Update password.
        if (_password.value === _re_password.value && _password.value) {
            var updatePassword = firebase.auth().updatePassword(_password.value)
                .then(() => {
                    snackbar("Password updated.");
                    return "Password updated."
                }).catch((error) => {
                    snackbar("Passwords" + error);
                });
        } else {
            snackbar("The passwords don't match or not filleds.");
        }

        //Updade database.
        updateDatabase = dbUser.doc(firebase.auth().currentUser.uid).update({
            email: _email.value,
            displayName: _displayName.value,
            photoURL: _photoURL.value,
            uid: firebase.auth().currentUser.uid,
            password_betfair: _password_betfair.value,
            apiKey: _apiKey.value
        }).then(() => {
            snackbar("Updated BrotherBet user.");
            return "Updated user.";
        }).catch((error) => {
            snackbar("Database" + error);
        });
    });

    // Reload.
    Promise.all([updatePhoto, updatePhoto, updateEmail, updatePassword, updateDatabase])
        .then(() => {
            return firebase.auth().signOut()
                .then(() => {
                    return firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
                        .then(() => {
                            return snackbar("Updated BrotherBet user.");
                        })
                        .catch((error) => {
                            snackbar(error);
                        });
                }).catch((error) => {
                    snackbar(error);
                });
        }).catch((error) => {
            snackbar("Database" + error);
        });
}

// Shared functions.
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (_displayName) {
            dbUser.doc(firebase.auth().currentUser.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        for (var i in doc.data())
                            if (!doc.data()[i]) s
                        document.getElementById('btnAccounts').click();
                        if (!doc.data().displayName) {
                            snackbar("Username it's missing, fill your user.");
                        } else {
                            _displayName.value = doc.data().displayName || "";
                            _displayName.parentElement.classList.add('is-dirty');
                        }
                        if (!doc.data().email) {
                            snackbar("Email it's missing, fill your user.");
                        } else {
                            _email.value = doc.data().email || "";
                            _email.parentElement.classList.add('is-dirty');
                        }
                        if (!doc.data().photoURL) {
                            snackbar("URL of photo it's missing, fill your user.");
                        } else {
                            _photoURL.value = doc.data().photoURL || "";
                            _photoURL.parentElement.classList.add('is-dirty');
                        }
                        if (!doc.data().password_betfair) {
                            snackbar("Password Betfair it's missing, fill your user.");
                        } else if (!doc.data().apiKey) {
                            snackbar("API key Betfair it's missing, fill your user.");
                        } else {
                            addBetfair(doc.data().displayName, doc.data().password_betfair, doc.data().apiKey)
                            main();
                        }
                        componentHandler.upgradeAllRegistered();
                    } else {
                        document.getElementById('btnAccounts').click();
                        snackbar("You need to fill your user.");
                    }
                    return "I'm done!"
                }).catch((error) => {
                    return snackbar(error);
                });
        } else {
            if (titleText.innerHTML === "Sign Up") {
                return dbUser.doc(firebase.auth().currentUser.uid).set({
                    email: emailText.value,
                    uid: firebase.auth().currentUser.uid
                }).then(() => {
                    loginBox.style.display = "none";
                    reportText.style.display = "block";
                    if (window.location.href === "http://127.0.0.1:5500/functions/views/index.html") {
                        window.location.href = "http://127.0.0.1:5500/functions/views/home.html";
                    } else {
                        post("/home");
                    }
                    return snackbar("Init");
                }).catch((error) => {
                    snackbar("Auth" + error);
                });
            } else if (window.location.href === "http://127.0.0.1:5500/functions/views/index.html") {
                window.location.href = "http://127.0.0.1:5500/functions/views/home.html";
            } else {
                post("/home");
            }
        }
    } else {
        displayName = null;
        email = null;
        photoURL = null;
        uid = null;
        password_betfair = null;
        apiKey = null;
    }
    return user;
})

function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem("betfair:");
            if (window.location.href === "http://127.0.0.1:5500/functions/views/home.html") {
                return window.location.href = "http://127.0.0.1:5500/functions/views/index.html";
            } else {
                return post("home");
            }
        }).catch((error) => {
            snackbar(error);
        });
}

function testDB() {
    dbUser.doc("Joao").set({
        displayName: "jhjhjhj",
        email: "joana@gmail",
        photoURL: "https://",
        uid: "kjgjksldfhfkaksdfsd4fga6sfd",
    }).then(() => {
        // Handle errors.
        snackbar("Stored user.");
        return "Stored user.";
    }).catch((error) => {
        snackbar(error);
    });
}

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function post(path, params, method) {
    method = method || "post";
    let form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

function saveRobot(robot) {
    dbUser.doc(firebase.auth().currentUser.uid).set({
        robotModel: JSON.stringify(robot),
    }).then(() => {
        snackbar("Robot model saved.");
        return "Updated user.";
    }).catch((error) => {
        snackbar("Error saving robot" + error);
        saveRobot(robot);
    });
}