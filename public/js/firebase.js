if (!(document.URL === "http://127.0.0.1:5500/web/home.html")) {
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
    const repassText = document.querySelector("#txtRePassword");
    const budgetText = document.querySelector("#txtBudget");
    const enterButton = document.querySelector("#btnEnter");
    const accountButton = document.querySelector("#btnAccount");
    const bugButton = document.querySelector("#btnBug");
    const codeButton = document.querySelector("#btnCode");
    const upButton = document.querySelector("#btnUp");
    const updateButton = document.querySelector("#btnUpdate");
    const fireButton = document.querySelector("#btnFire");
    const sendButton = document.querySelector("#btnSend");
    const sign_upButton = document.querySelector("#btnSingUp");
    const closeButton = document.querySelector("#btnClose");
    const logoutButton = document.querySelector("#btnLogout");

    // Shared variables.
    var email = null;
    var displayName = null;
    var photoURL = null;
    var uid = null;

    // Control variables;
    var signedout = false;

    // Firestore variables and constants.
    var firestore = firebase.firestore();
    const dbUser = firestore.collection("users/");



    // Login functions.

    if (closeButton) {
        closeButton.addEventListener("click", function () {
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
        enterButton.addEventListener("click", function () {
            if (titleText.innerHTML === "Sign Up") {
                firebase.auth().createUserWithEmailAndPassword(emailText.value, passText.value).then(function () {
                    // Display components.
                    closeButton.style.display = "flex";
                    loginBox.style.display = "none";
                    reportText.style.display = "block";
                    console.log("Created account!");
                    // Handle errors.
                }).catch(function (error) {
                    console.log("Got an error", error);
                    snackbar(error);
                });
            } else {
                firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value).then(function () {
                    window.location.href = '/home.html';
                }).then(function () {
                    post('/home');

                }).catch(function (error) {
                    console.log("Got an error", error);
                    snackbar(error);
                });
                signedout = false;
            }
        })
    }

    if (enterKey) {
        enterKey.addEventListener("keyup", function (e) {
            e.preventDefault();
            if (e.keyCode == 13) {
                enterButton.click();
            }
        });
    }

    // Home functions.
    if (accountButton) {
        accountButton.addEventListener("click", function () {
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
        updateButton.addEventListener("click", function () {
            updateProfile(emailText.value, usernameText.value, photoURLText.value, passText.value, repassText.value);
            // Update the database.
            createUserDB(emailText.value, usernameText.value, photoURLText.value, firebase.auth().currentUser.uid);
        });
    }

    if (sendButton) {
        sendButton.addEventListener("click", function () { });
    }

    function logout() {
        firebase.auth().signOut().then(function () {
            // Handle errors.
            signedout = true;
            window.location = "/"
        }).catch(function (error) {
            console.log("Sign out error", error);
            snackbar(error);
        });
    }

    // Shared functions.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Catch shared user variables.
            displayName = user.displayName ? user.displayName : null;
            email = user.email ? user.email : null;
            photoURL = user.photoURL ? user.photoURL : null;
            uid = user.uid ? user.uid : null;
            if ((document.URL === "https://brother-bet.firebaseapp.com/")) {
                // User is signed in.
                // Reporting status.
                console.log("Signed in.");
                // Redirect to home.
                window.location.href = '/home.html';
            }
        } else {
            if (!(document.URL === "https://brother-bet.firebaseapp.com/")) {
                // User is signed out.
                // Nullify shared user variables.
                displayName = null;
                email = null;
                photoURL = null;
                uid = null;
                // Reporting status.
                if (!signedout) {
                    console.log("Forbidden access.");
                } else {
                    console.log("Signed out.");
                }
            }
        }
    });

    // General functions.
    function createUserDB(_email, _displayName, _photoURL, _uid) {
        dbUser.doc(_email).set({
            email: _email,
            displayName: _displayName,
            photoURL: _photoURL,
            uid: _uid,
        }).then(function () {
            // Handle errors.
            console.log("Stored user.");
        }).catch(function (error) {
            console.log("Got an error", error);
        });
    }

    function updateProfile(_email, _displayName, _photoURL, _password, _re_password) {
        // Update displayName.
        if (_displayName != displayName && _displayName != null) {
            displayNameUpdate(_displayName);
        } else {
            snackbar("Try another username.");
        }

        // Update photoURL.
        if (_photoURL != photoURL && _photoURL != null) {
            photoURLUpdate(_photoURL);
        } else {
            snackbar("Profile photo don't works.");
        }

        // Update email.
        if (_email != email && _email != null) {
            emailUpdate(_email);
        } else {
            snackbar("A valid email address was not inserted.");
        }

        // Update password.
        if (_password === _re_password && _password != null) {
            passwordUpdate(_password);
        } else {
            snackbar("The  passwords don't match.");
        }
    }

    function displayNameUpdate(_displayName, _photoURL) {
        // Update displayName .
        firebase.auth().currentUser.updateProfile({
            displayName: _displayName
        }).then(function () {
            // Handle errors.
            snackbar("Username updated.");
        }).catch(function (error) {
            console.log("Got an error", error);
            snackbar(error);
        });
    }

    function photoURLUpdate(_photoURL) {
        // Update photoURL.
        firebase.auth().currentUser.updateProfile({
            photoURL: _photoURL
        }).then(function () {
            // Handle errors.
            snackbar("Profile photo updated.");
        }).catch(function (error) {
            console.log("Got an error", error);
            snackbar(error);
        });
    }

    function emailUpdate(_email) {
        // Update email.
        firebase.auth().updateEmail(_email).then(function () {
            // Handle errors.
            snackbar("Email updated.");
        }).catch(function (error) {
            console.log("Got an error", error);
            snackbar(error);
        });
    }

    function passwordUpdate(_password) {
        // Update password.
        firebase.auth().updatePassword(_password).then(function () {
            // Handle errors.
            snackbar("Password updated.");
        }).catch(function (error) {
            console.log("Got an error", error);
            snackbar(error);
        });
    }

    function testDB() {
        dbUser.doc("Joao").set({
            displayName: "jhjhjhj",
            email: "joana@gmail",
            photoURL: "https://",
            uid: "kjgjksldfhfkaksdfsd4fga6sfd",
        }).then(function () {
            // Handle errors.
            console.log("Stored user.");
        }).catch(function (error) {
            console.log("Got an error", error);
        });
        alert(email);
    }
}

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
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
