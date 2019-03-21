if (!(document.URL === "http://127.0.0.1:5500/functions/views/home.html")) {
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
                    // Display components.
                    closeButton.style.display = "flex";
                    loginBox.style.display = "none";
                    reportText.style.display = "block";
                    return "Created account!"
                }).catch((error) => {
                    console.log("Got an error", error);
                    snackbar(error);
                });
            } else {
                firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value)
                    .then(() => {
                        window.location.href = '/home.html';
                        return "Redirect to home!"
                    }).then(() => {
                        post('/home');
                        return "Redirect to home!"
                    }).catch((error) => {
                        console.log("Got an error", error);
                        snackbar(error);
                    });
                signedout = false;
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
            if (_displayName !== displayNameRoot && _displayName !== null) {
                firebase.auth().currentUser.updateProfile({
                    displayName: _displayName
                }).then(() => {
                    snackbar("Username updated.");
                    return "Username updated.";
                }).catch((error) => {
                    console.log("Got an error", error);
                    snackbar(error);
                });
            } else {
                snackbar("Try another username.");
            }

            // Update photoURL.
            if (_photoURL !== photoURLRoot && _photoURL !== null) {
                firebase.auth().currentUser.updateProfile({
                    photoURL: _photoURL
                }).then(() => {
                    snackbar("Profile photo updated.");
                    return "Profile photo updated.";
                }).catch((error) => {
                    console.log("Got an error", error);
                    snackbar(error);
                });
            } else {
                snackbar("Profile photo don't works.");
            }

            // Update email.
            if (_email !== emailRoot && _email !== null) {
                firebase.auth().updateEmail(_email)
                    .then(() => {
                        // Handle errors.
                        snackbar("Email updated.");
                        return "Email updated."
                    }).catch((error) => {
                        console.log("Got an error", error);
                        snackbar(error);
                    });
            } else {
                snackbar("A valid email address was not inserted.");
            }

            // Update password.
            if (_password === _re_password && _password !== null) {
                firebase.auth().updatePassword(_password)
                    .then(() => {
                        snackbar("Password updated.");
                        return "Password updated."
                    }).catch((error) => {
                        console.log("Got an error", error);
                        snackbar(error);
                    });
            } else {
                snackbar("The  passwords don't match.");
            }
            // Update the database.
            dbUser.doc(_email).set({
                email: _email,
                displayName: _displayName,
                photoURL: _photoURL,
                uid: _uid,
            }).then(() => {
                console.log("Stored user.");
                return "Stored user.";
            }).catch((error) => {
                console.log("Got an error", error);
            });
        });
    }

    // Shared functions.
    firebase.auth().onAuthStateChanged((user) => {
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


}

function logout(){
    firebase.auth().signOut()
    .then(() => {
        // Handle errors.
        signedout = true;
        window.location = "/"
        return "Redirect to index!"
    }).catch((error) => {
        console.log("Sign out error", error);
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
        console.log("Stored user.");
        return "Stored user.";
    }).catch((error) => {
        console.log("Got an error", error);
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
