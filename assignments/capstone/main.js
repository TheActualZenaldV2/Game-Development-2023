
// Create a scene
const scene = new THREE.Scene();

gameStart = false;
//document.getElementById("gameUI").style.display = "none";
showUI = true;
let userFov;
let userSenstivity;
let userDifficulty;
let spawnEnemies;
let ui;
const spawnEnemiesCheckbox = document.getElementById("spawn-enemies");
const antialiasCheckbox = document.getElementById("antialias");
let coolPineapplePizza = true;
let antialias = false;
let userResolution;
let bulletDammage = 10;


//
//
//
//
//
//
const firebaseConfig = {
    apiKey: "AIzaSyCqB4uXUadpU3A2_xoqxEbf2E6XotmZVN0",
    authDomain: "fortnitelovers.firebaseapp.com",
    databaseURL: "https://fortnitelovers-default-rtdb.firebaseio.com",
    projectId: "fortnitelovers",
    storageBucket: "fortnitelovers.appspot.com",
    messagingSenderId: "775617229851",
    appId: "1:775617229851:web:f43a82425c9d26db58f4be",
    measurementId: "G-3K165RJPM4"
};

firebase.initializeApp(firebaseConfig);

//declare database variable
var database = firebase.database();
loggedIn = false;
var username;
var recievedData = false;
var sentData = false;
var databaseError = false;
var databaseErrorFixed = false;
var accountError = false;

//check local storage, if there is a username, set the username variable to the local storage username
if (localStorage.getItem("username") !== null) {

    username = localStorage.getItem("username");
    document.getElementById("menuLogin")
        .innerHTML = "Profile";
    document.getElementById("menuUsername")
        .innerHTML = username;
    //if there is a username, set the logged in variable to true
    loggedIn = true;
    document.getElementById("loginWarning")
        .style.display = "none";
    getUserStats(username);

}



const passwordInput = document.getElementById('password-input');
const confirmPasswordInput = document.getElementById('password-input-confirm');

function checkPasswordsMatch() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Passwords don't match.");
    }
    else {
        confirmPasswordInput.setCustomValidity('');
    }
}

passwordInput.addEventListener('input', checkPasswordsMatch);
confirmPasswordInput.addEventListener('input', checkPasswordsMatch);



//if the user has not made an account, show the registration form
if (localStorage.getItem("hasMadeAccount") === null) {
    //showRegistrationForm();
    document.getElementById("registration-form")
        .style.display = "none";
}
else {
    //if the user has made an account, show the login form
    //showLoginForm();
}

function contineLogin() {
    event.preventDefault();
    document.getElementById("login-success")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "block";
    document.getElementById("login-form")
        .style.display = "none";
    document.getElementById("registration-form")
        .style.display = "none";


}

function showAccountDetails() {
    event.preventDefault();
    document.getElementById("accountDetails")
        .style.display = "block";
    document.getElementById("accountEmail")
        .innerHTML = localStorage.getItem("email");
    document.getElementById("showAccountDetailsText")
        .style.display = "none";
}

function logout() {
    //hide login success form
    document.getElementById("login-success")
        .style.display = "none";
    //show login form
    document.getElementById("login-form")
        .style.display = "block";
    //set logged in to false
    loggedIn = false;
    //clear username variable
    username = "";
    console.clear();
    //clear local storage username
    localStorage.removeItem("username");
    setTimeout(() => {
        location.reload();

    }, 100);
}




const registrationForm1 = document.getElementById("registration-form");


registrationForm1.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById("registration-form")
        .style.display = "none";
    document.getElementById("registration-form-2")
        .style.display = "block";
});

function resetPass() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById("reset-email")
        .value;
    //show loading spinner
    showSpinner();
    //hide reset password form
    document.getElementById("reset-password")
        .style.display = "none";

    auth.sendPasswordResetEmail(emailAddress)
        .then(function () {
            // Email sent.
            document.getElementById("passwordResetConfirmation")
                .style.display = "block";
            document.getElementById("user-email")
                .innerHTML = emailAddress;
            hideSpinner();
        })
        .catch(function (error) {
            // An error happened.
            setTimeout(() => {
                alert("Error: " + error.message);
            }, 10);

            hideSpinner();
            //show reset password form
            document.getElementById("reset-password")
                .style.display = "block";
        });
}

function hideSpinner() {
    document.getElementById("loading")
        .style.display = "none";
    document.getElementById("loading-text")
        .style.display = "none";
}

function showResetPassword() {
    //hide login page
    document.getElementById("login-form")
        .style.display = "none";
    //show reset password page
    document.getElementById("reset-password")
        .style.display = "block";

}

function reset() {
    localStorage.clear();
    //reload the page
    location.reload();
}
//basic functions to show and hide forms
function showRegistrationForm() {
    document.getElementById("registration-form")
        .style.display = "block";
    document.getElementById("login-form")
        .style.display = "none";
    document.getElementById("account-confirmation")
        .style.display = "none";
    document.getElementById("login-success")
        .style.display = "none";
    document.getElementById("registration-form-2")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "none";


}

function showLoginForm() {
    if (loggedIn) {
        document.getElementById("login-success")
            .style.display = "block";
        document.getElementById("login-form")
            .style.display = "none";
        document.getElementById("startMenu")
            .style.display = "none";
        document.getElementById("registration-form")
            .style.display = "none";
        document.getElementById("username-from-database")
            .innerHTML = username;
        getUserStats(username);

    }
    else {
        document.getElementById("login-form")
            .style.display = "block";
        document.getElementById("registration-form")
            .style.display = "none";
        document.getElementById("account-confirmation")
            .style.display = "none";
        document.getElementById("login-success")
            .style.display = "none";
        document.getElementById("passwordResetConfirmation")
            .style.display = "none";
        document.getElementById("reset-password")
            .style.display = "none";
        document.getElementById("registration-form-2")
            .style.display = "none";
        document.getElementById("databaseErrorFixed")
            .style.display = "none";
        document.getElementById("startMenu")
            .style.display = "none";

        databaseError = false;
    }
}

function showSpinner() {
    document.getElementById("loading")
        .style.display = "block";
    document.getElementById("loading-text")
        .style.display = "block";
    document.getElementById("registration-form")
        .style.display = "none";
    document.getElementById("login-form")
        .style.display = "none";
    document.getElementById("registration-form-2")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "none";
}

function hideSpinnerAndShowRegistrationForm() {
    document.getElementById("loading")
        .style.display = "none";
    document.getElementById("loading-text")
        .style.display = "none";
    document.getElementById("registration-form")
        .style.display = "block";
    document.getElementById("login-form")
        .style.display = "none";
}

function hideSpinnerAndShowLoginForm() {
    document.getElementById("loading")
        .style.display = "none";
    document.getElementById("loading-text")
        .style.display = "none";
    document.getElementById("registration-form")
        .style.display = "none";
    document.getElementById("login-form")
        .style.display = "block";
}

function userIsLoggedIn() {
    //the user has logged in successfully, redirect to the home page of website...
    //currently auto directing to google.com with 1.5s delay
    document.getElementById("login-form")
        .style.display = "none";
    document.getElementById("login-success")
        .style.display = "block";
    document.getElementById("loading")
        .style.display = "none";
    document.getElementById("loading-text")
        .style.display = "none";
}




//start of firebase code

const registrationForm = document.getElementById('registration-form-2');
registrationForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const email = document.getElementById('email-input')
        .value;
    const password = document.getElementById('password-input')
        .value;
    const username = document.getElementById('username-input')
        .value;

    // show loading spinner and hide form
    document.getElementById("loading")
        .style.display = "block";
    document.getElementById("loading-text")
        .style.display = "block";
    document.getElementById("registration-form")
        .style.display = "none";
    showSpinner();

    // Query Firebase for the specified username
    database.ref('users')
        .once('value')
        .then((snapshot) => {
            let existingUsernames = [];

            if (snapshot.val() !== null) {
                // Convert all existing usernames to lowercase
                existingUsernames = Object.keys(snapshot.val())
                    .map(username => username.toLowerCase());
            }

            // Convert input username to lowercase
            const lowercaseUsername = username.toLowerCase();

            // If the snapshot exists and the username already exists in the database
            if (existingUsernames.includes(lowercaseUsername)) {
                //highlight the username input field

                setTimeout(() => {
                    alert('Username already exists!');

                }, 100);

                //show registration form and hide spinner
                document.getElementById("registration-form-2")
                    .style.display = "block";
                document.getElementById("loading")
                    .style.display = "none";
                document.getElementById("loading-text")
                    .style.display = "none";
                localStorage.setItem("hasMadeAccount", true);
            }
            else {
                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Account creation successful
                        // show account confirmation form and hide spinner
                        document.getElementById("account-confirmation")
                            .style.display = "block";
                        document.getElementById("loading")
                            .style.display = "none";
                        document.getElementById("loading-text")
                            .style.display = "none";
                        // hide registration form
                        document.getElementById("registration-form-2")
                            .style.display = "none";

                        document.getElementById("username-welcome")
                            .innerHTML = username;
                        //clear local storage username
                        localStorage.removeItem("username");
                        localStorage.removeItem("email");

                        //send username to localStorage
                        localStorage.setItem("username", username);
                        //send email to localStorage
                        localStorage.setItem("email", email);
                        // create a new entry in the database with the specified username
                        database.ref('users/' + username)
                            .set({

                                email: email,
                                // ...
                            })
                            .then(() => {
                                // ...
                            })
                            .catch((error) => {
                                // entry creation failed
                                console.log("Error creating entry in database:", error);
                                // show registration form and hide spinner
                                document.getElementById("registration-form")
                                    .style.display = "block";
                                document.getElementById("loading")
                                    .style.display = "none";
                                document.getElementById("loading-text")
                                    .style.display = "none";
                            });

                    })
                    .catch((error) => {
                        // Account creation failed
                        console.log("Error creating account:", error);
                        // show registration form and hide spinner
                        document.getElementById("registration-form")
                            .style.display = "block";
                        document.getElementById("loading")
                            .style.display = "none";
                        document.getElementById("loading-text")
                            .style.display = "none";

                        const errorMessage = error.message;
                        alert(errorMessage); // display an alert for all error messages
                    });
            }
        });

    setTimeout(() => {
        //console.clear();
    }, 1000);
});



//login to an existing account

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email-input-login')
        .value;
    const password = document.getElementById('password-input-login')
        .value;

    // show loading spinner
    document.getElementById("loading")
        .style.display = "block";
    document.getElementById("loading-text")
        .style.display = "block";
    document.getElementById("login-form")
        .style.display = "none";

    setTimeout(() => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {



                loggedIn = true
                const user = firebase.auth()
                    .currentUser;
                document.getElementById("menuLogin")
                    .innerHTML = "Profile";
                localStorage.removeItem("email");
                //get user object:
                var email = document.getElementById('email-input-login')
                    .value;
                localStorage.setItem("email", email);
                var userRef = database.ref('users');
                userRef.orderByChild('email')
                    .equalTo(email)
                    .once('value')
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            // User with matching email found
                            var userData = snapshot.val();
                            // userData will contain an object with the user(s) that match the email
                            // In case multiple users have the same email address, userData will be an object with multiple keys

                            // Retrieve the username from the user object
                            username = Object.keys(userData)[0];
                            getUserStats(username);




                            document.getElementById("username-from-database")
                                .innerHTML = username;
                            document.getElementById("menuUsername")
                                .innerHTML = username;
                            document.getElementById("loginWarning")
                                .style.display = "none";
                            //send username to localStorage
                            localStorage.setItem("username", username);

                            //show login success form
                            document.getElementById("login-success")
                                .style.display = "block";
                            //hide loading spinner
                            document.getElementById("loading")
                                .style.display = "none";
                            document.getElementById("loading-text")
                                .style.display = "none";
                            //hide login form
                            document.getElementById("login-form")
                                .style.display = "none";




                        }
                        else {
                            databaseError = true;
                        }

                        // User with matching email not found
                        if (databaseError == true) {
                            setTimeout(() => {
                                alert("Error: User not found in database. Please finish setting up your account.");
                            }, 100);
                            document.getElementById("loading")
                                .style.display = "none";
                            document.getElementById("loading-text")
                                .style.display = "none";
                            document.getElementById("databaseError")
                                .style.display = "block";


                        }

                    })


                .catch((error) => {
                    console.error(error);
                });



            })
            .catch((error) => {
                // Login failed, display error message
                const errorMessage = error.message;
                setTimeout(() => {
                    alert(errorMessage);
                }, 100);


                // hide loading spinner and show login form
                document.getElementById("loading")
                    .style.display = "none";
                document.getElementById("loading-text")
                    .style.display = "none";
                document.getElementById("login-form")
                    .style.display = "block";
            });
    }, 2000);


});

function showUserSearch() {
    document.getElementById("userSearch")
        .style.display = "block";
    document.getElementById("highscoreTable")
        .style.display = "none";
    document.getElementById("usernameSearchInput")
        .style.display = "block";
    document.getElementById("searchPlayerButton")
        .classList.add("active1");
    document.getElementById("myProfileButton")
        .classList.remove("active1");
    document.getElementById("usernameSearchInput")
        .value = "";
    document.getElementById("results")
        .style.display = "none";


}

function hideUserSearch() {
    document.getElementById("userSearch")
        .style.display = "none";
    document.getElementById("highscoreTable")
        .style.display = "table";
    document.getElementById("highscoreTable")
        .style.width = "100%";
    document.getElementById("usernameSearchInput")
        .style.display = "none";
    document.getElementById("searchPlayerButton")
        .classList.remove("active1");
    document.getElementById("myProfileButton")
        .classList.remove("active1");
    document.getElementById("error")
        .innerHTML = "";
}



function searchUser(searchCurrentUser) {
    document.getElementById("userSearch")
        .style.display = "block";
    document.getElementById("highscoreTable")
        .style.display = "none";
    document.getElementById("usernameSearchInput")
        .style.display = "block";
    searchUsername = document.getElementById("usernameSearchInput")
        .value;
    if (!searchUsername && !searchCurrentUser) {
        return;
    }
    if (searchCurrentUser) {
        searchUsername = searchCurrentUser;
        document.getElementById("usernameSearchInput")
            .value = searchCurrentUser;
        if (searchUsername == username) {
            document.getElementById("myProfileButton")
                .classList.add("active1");
            document.getElementById("searchPlayerButton")
                .classList.remove("active1");
        }
        else {
            document.getElementById("searchPlayerButton")
                .classList.add("active1");
            document.getElementById("myProfileButton")
                .classList.remove("active1");
        }

    }
    else {
        document.getElementById("searchPlayerButton")
            .classList.add("active1");
        document.getElementById("myProfileButton")
            .classList.remove("active1");


    }
    // Get a reference to the Firebase database
    const database = firebase.database();

    // Search for the user with the given username
    const userRef = database.ref("users/" + searchUsername);

    // Retrieve the user's stats from the database
    userRef.once("value")
        .then((snapshot) => {
            // Get the user's data from the snapshot
            const userData = snapshot.val();

            // Check if a user with the given username was found
            if (userData) {
                //for every run of the game, add 1 to the games completed
                var runsRef = database.ref('users/' + searchUsername + '/runs');
                //check how many children are in the runs object, and set the runs variable to that number
                runsRef.once("value")
                    .then((snapshot) => {
                        runs = snapshot.numChildren();
                        let totalScore = 0;
                        let numRuns = snapshot.numChildren();

                        snapshot.forEach((childSnapshot) => {
                            let score = childSnapshot.val()
                                .score;
                            totalScore += score;
                        });

                        let averageScore = totalScore / numRuns;
                        averageScore = averageScore.toFixed(2); // Round to 2 decimal places
                        document.getElementById("usernameResult")
                            .innerHTML = searchUsername;
                        document.getElementById("averageScoreResult")
                            .innerHTML = averageScore;
                        document.getElementById("totalScoreResult")
                            .innerHTML = totalScore;
                        document.getElementById("numRunsResult")
                            .innerHTML = numRuns;


                        document.getElementById("results")
                            .style.display = "block";
                        document.getElementById("error")
                            .innerHTML = "";


                    })
                    .catch((error) => {
                        console.error(`Error: ${error.message}`);
                        document.getElementById("error")
                            .innerHTML = "Error: " + error.message;
                    });




            }
            else {
                // User with matching username not found
                console.error("Error: User not found in database, " + searchUsername);
                document.getElementById("error")
                    .innerHTML = "Error: User not found in database, " + searchUsername;
                document.getElementById("results")
                    .style.display = "none";
            }
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
        });
}

function getUserStats(username) {
    var runs = 0;
    // Get a reference to the Firebase database
    const database = firebase.database();

    // Search for the user with the given username
    const userRef = database.ref("users/" + username);

    // Retrieve the user's stats from the database
    userRef.once("value")
        .then((snapshot) => {
            // Get the user's data from the snapshot
            const userData = snapshot.val();

            // Check if a user with the given username was found
            if (userData) {
                //for every run of the game, add 1 to the games completed
                var runsRef = database.ref('users/' + username + '/runs');
                //check how many children are in the runs object, and set the runs variable to that number
                runsRef.once("value")
                    .then((snapshot) => {
                        runs = snapshot.numChildren();
                        document.getElementById("games-completed")
                            .innerHTML = runs;
                        let totalScore = 0;
                        let numRuns = snapshot.numChildren();

                        snapshot.forEach((childSnapshot) => {
                            let score = childSnapshot.val()
                                .score;
                            totalScore += score;
                        });

                        let averageScore = totalScore / numRuns;
                        averageScore = averageScore.toFixed(2); // Round to 2 decimal places
                        document.getElementById("average-score")
                            .innerHTML = averageScore
                        document.getElementById("total-score")
                            .innerHTML = totalScore
                    })
                    .catch((error) => {
                        console.error(`Error: ${error.message}`);
                    });




            }
            else {
                // User with matching username not found
                console.error("Error: User not found in database, " + username);
            }
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
        });
}




const input = document.getElementById('databaseErrorUsername');

input.addEventListener('input', () => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(input.value)) {
        input.setCustomValidity('Special characters are not allowed.');
    }
    else {
        input.setCustomValidity('');
    }
});


// attach an event listener to the database error fix button for form submit 
const databaseError1 = document.getElementById('databaseError');
databaseError1.addEventListener('submit', (event) => {
    event.preventDefault();

    var user = firebase.auth()
        .currentUser;
    // send username to firebase realtime database
    const username = document.getElementById('databaseErrorUsername')
        .value;
    const email = document.getElementById('email-input-login')
        .value;

    // Query Firebase for the specified username
    database.ref('users')
        .once('value')
        .then((snapshot) => {
            // Convert all existing usernames to lowercase
            const existingUsernames = Object.keys(snapshot.val() || {})
                .map(username => username.toLowerCase());

            // Convert input username to lowercase
            const lowercaseUsername = username.toLowerCase();

            // If the snapshot exists, then the username already exists in the database
            if (existingUsernames.includes(lowercaseUsername)) {
                // highlight the username input field
                alert('Username already exists!');
                return;
            }

            database.ref('users/' + username)
                .set({

                    email: email,
                    // ...
                })
                .then(() => {
                    // entry creation successful
                    // show login form and hide spinner
                    document.getElementById("databaseError")
                        .style.display = "none";
                    document.getElementById("databaseErrorFixed")
                        .style.display = "block";
                })
                .catch((error) => {
                    // entry creation failed
                    console.log("Error creating entry in database:", error);
                    // show registration form and hide spinner
                    document.getElementById("databaseError")
                        .style.display = "block";
                    document.getElementById("loading")
                        .style.display = "none";
                    document.getElementById("loading-text")
                        .style.display = "none";
                });
        })
        .catch((error) => {
            // error querying database for existing usernames
            console.log("Error querying database:", error);
            // show registration form and hide spinner
            document.getElementById("databaseError")
                .style.display = "block";
            document.getElementById("loading")
                .style.display = "none";
            document.getElementById("loading-text")
                .style.display = "none";
        });

    // show loading spinner and hide form
    document.getElementById("loading")
        .style.display = "none";
    document.getElementById("loading-text")
        .style.display = "none";
    document.getElementById("databaseError")
        .style.display = "block";
});




const rememberMeCheckbox = document.getElementById('remember-me');
const emailInput = document.querySelector('#email-input-login');
const passwordInput2 = document.querySelector('#password-input-login');


// check if there are saved credentials in localStorage
const savedEmail = localStorage.getItem('email');
const savedPassword = localStorage.getItem('password');
if (savedEmail && savedPassword) {
    // fill in the login form with saved credentials
    emailInput.value = savedEmail;
    passwordInput2.value = savedPassword;
    //check the remember me checkbox
    rememberMeCheckbox.checked = true;
}

// add an event listener that listens for the form's submit event
loginForm.addEventListener('submit', (event) => {
    // check if the "Remember Me" checkbox is checked
    if (rememberMeCheckbox.checked) {
        // save the user's credentials to localStorage
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('password', passwordInput2.value);
    }
    else {
        // remove the user's credentials from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
});

//
//
//
//
//
//
//
//
// Create the stats object
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom


function showStats() {
    document.body.appendChild(stats.dom);
}

function enableDevAccess() {
    let code = prompt("Enter the code to enable developer access:");
    if (code === "wiggles") {
        localStorage.setItem("devAccess", "true");
        coolPineapplePizza = true;
        console.log("Developer access enabled. Press B to open the shop.");
    }
    else {
    }
}

function fullscreen() {
    //request fullscreen 
    if (document.fullscreenElement) {
        document.exitFullscreen();
        //unfocus the button
        document.getElementById("fullscreen-button")
            .blur();
    }
    else {
        document.documentElement.requestFullscreen();
        document.getElementById("fullscreen-button")
            .blur();

    }

}

function openDemo() {
    document.getElementById("demo")
        .style.display = "block";
    document.getElementById("startMenu")
        .style.display = "none";
}

function closeDemo() {
    document.getElementById("demo")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "block";
}

//get settings from local storage
if (localStorage.getItem("fov")) {
    userFov = localStorage.getItem("fov");
    //update slider in html
    document.getElementById("fov-slider")
        .value = userFov;
    document.getElementById("fovValue")
        .innerHTML = "FOV: " + userFov;

}
if (localStorage.getItem("ui")) {
    showUI = localStorage.getItem("ui");
    if (showUI == "true") {
        showUI = true;
        document.getElementById("ui")
            .innerHTML = "UI Enabled";
        document.getElementById("uiBtn")
            .style.backgroundColor = "aquamarine"
    }
    else {
        showUI = false;
        document.getElementById("ui")
            .innerHTML = "UI Disabled";
        document.getElementById("uiBtn")
            .style.backgroundColor = "red"
    }
}
if (localStorage.getItem("resolution")) {
    userResolution = localStorage.getItem("resolution");
    document.getElementById("resolution")
        .innerHTML = '<i class="fa-solid fa-pen"></i>' + " Resolution: " + userResolution;
    document.getElementById("resolution-slider")
        .value = userResolution;
    userResolution = userResolution;
}
if (localStorage.getItem("antialias")) {
    antialias = localStorage.getItem("antialias");
    if (antialias == "true") {
        antialias = true;
        document.getElementById("antialias")
            .checked = true;
    }
    if (antialias == "false") {
        antialias = false;
        document.getElementById("antialias")
            .checked = false;
    }
}



function startGame() {
    gameStart = true;
    document.getElementById("gameUI")
        .style.display = "block";
    document.getElementById("startMenu")
        .style.display = "none";
    document.getElementById("background")
        .style.display = "none";
    document.body.style.backgroundColor = "black";
    gameStartFunction();
    if (showUI == false) {
        document.getElementById("gameUI")
            .style.display = "none";
    }
}

function openOptions() {
    document.getElementById("optionsMenu")
        .style.display = "block";
    document.getElementById("startMenu")
        .style.display = "none";
}

function toggleUI() {
    if (showUI == false) {
        document.getElementById("ui")
            .innerHTML = "UI Enabled";
        showUI = true;
        document.getElementById("uiBtn")
            .style.backgroundColor = "aquamarine"
    }
    else {
        document.getElementById("gameUI")
            .style.display = "none";
        document.getElementById("ui")
            .innerHTML = "UI Disabled";
        showUI = false;
        document.getElementById("uiBtn")
            .style.backgroundColor = "red"
    }
}

function openControls() {
    document.getElementById("controlsMenu")
        .style.display = "block";
    document.getElementById("startMenu")
        .style.display = "none";
}

function closeControls() {
    document.getElementById("controlsMenu")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "block";
}

function updateFOV(value) {
    userFov = value;
    if (value > 150.0) {
        userFov = 150;
    }
    document.getElementById("fovValue")
        .innerHTML = "FOV: " + userFov;
}

function updateResolution(value) {
    userResolution = value;
    if (value > 2.5) {
        userResolution = 2.5;
    }
    document.getElementById("resolution")
        .innerHTML = '<i class="fa-solid fa-pen"></i>' + " Resolution: " + value;
    localStorage.setItem("resolution", userResolution);
}

function resetSettings() {
    userDifficulty = 5;
    userFov = 90;
    showUI = true;
    spawnEnemies = true;
    antialias = false;
    userResolution = 1;
    document.getElementById("fov-slider")
        .value = userFov;
    document.getElementById("fovValue")
        .innerHTML = "FOV: " + userFov;
    document.getElementById("ui")
        .innerHTML = "UI Enabled";
    document.getElementById("uiBtn")
        .style.backgroundColor = "aquamarine"
    document.getElementById("antialias")
        .checked = false;
    document.getElementById("resolution")
        .innerHTML = '<i class="fa-solid fa-pen"></i>' + " Resolution: " + userResolution;
    document.getElementById("resolution-slider")
        .value = userResolution;


    localStorage.setItem("fov", userFov);
    localStorage.setItem("ui", showUI);
    localStorage.setItem("antialias", antialias);
    localStorage.setItem("resolution", userResolution);
    document.getElementById("resetSettingsBtn")
        .innerHTML = '<i class="fa-solid fa-trash-can-arrow-up"></i>' + " Settings Reset";


    setTimeout(() => {
        document.getElementById("resetSettingsBtn")
            .innerHTML = '<i class="fa-solid fa-trash-can"></i>' + " Reset";

    }, 1500);

}

function closeOptions() {
    document.getElementById("optionsMenu")
        .style.display = "none";
    document.getElementById("startMenu")
        .style.display = "block";
    //save settings to local storage
    if (userDifficulty == undefined || userDifficulty == null || userDifficulty == 0 || userDifficulty == NaN || userFov == undefined || userFov == null || userFov == 0 || userFov == NaN) {
        userDifficulty = 2.5;
        userFov = 90;

    }
    localStorage.setItem("fov", userFov);
    localStorage.setItem("difficulty", userDifficulty);
    localStorage.setItem("ui", showUI);
    localStorage.setItem("enemies", spawnEnemies);

}
antialiasCheckbox.addEventListener("change", () => {
    antialias = antialiasCheckbox.checked;
    localStorage.setItem("antialias", antialiasCheckbox.checked);
});

function gameStartFunction() {
    //powerups variables
    let liquifyingBullets = false;
    let megaJump = false;
    let isPaused = false;

    document.getElementById("loading")
        .style.display = "block";
    document.getElementById("loading-text")
        .style.display = "block";


    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 1, -3);
    camera.lookAt(0, 1.5, 0);

    // Set the camera's field of view to a wider angle
    if (!userFov) {
        userFov = 90;
    }
    if (!userResolution) {
        userResolution = 1;
    }
    camera.fov = userFov;
    camera.updateProjectionMatrix();
    if (!userDifficulty) {
        userDifficulty = 5;
    }
    let round = 1;
    let score = 0;
    let health = 100;
    let maxHealth = 100
    let enemyNumber = userDifficulty;
    let gameOver = false;
    let gameLoaded = false;
    let enemies = [];
    let nukeActive = false;
    let shieldActive = false;
    let recentScore = 0; // Variable to store the recent score
    let lastKillTime = Date.now(); // Variable to store the time of the last enemy kill
    let stealth = false;
    let money = 0;
    let gameReady = false;


    // Store the timeout ID in a variable
    let megaJumpTimeoutId;
    let liquifyingBulletsTimeoutId;
    let stealthTimeoutId;
    // Create an array to hold the powerup objects
    const powerups = [];
    let enemySpeed = 0.01; // Set initial enemy speed

    //if antialias is enabled 
    if (antialias == true) {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.shadowMap.enabled = true;

        renderer.shadowMap.type = THREE.BasicShadowMap;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.5;

    }
    else {
        renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: "high-performance",
            
        });
        renderer.shadowMap.enabled = true;

        renderer.shadowMap.type = THREE.BasicShadowMap;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 1.5;


    }
    

    //set low resolution for performance
    renderer.setPixelRatio(window.devicePixelRatio * userResolution);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //give the canvas id of canvas
    renderer.domElement.id = "canvas";
    //hide the canvas
    renderer.domElement.style.display = "none";
    //hide HUD
    document.getElementById("gameUI")
        .style.display = "none";

    // Load the texture image

    // Create the floor object
    const floorGeometry = new THREE.PlaneGeometry(1500, 1500);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333, // Set the normal color to a darker grey
        metalness: 0.05, // Set the metalness to 0.5
        roughness: 0.5 // Set the roughness to 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;




    const loader = new THREE.ObjectLoader();


    let gun;

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = function () {
        setTimeout(() => {
            fadeOutGame();

            gameLoaded = true;
            // Hide the loading spinner when all files are loaded
            document.getElementById('loading-text')
                .style.display = 'none';
            document.getElementById('loading')
                .style.display = 'none';
            canvas.style.display = 'block';



        }, 500);




        animate();
    };

    
// Image loading
var imageLoader = new THREE.ImageLoader(loadingManager);
imageLoader.load('https://i.imgur.com/uaxySvY.jpg', function (image) {
    document.getElementById('overlay').style.backgroundImage = 'url("https://i.imgur.com/uaxySvY.jpg")'
});



   // Define enemy geometry for level 2
const enemyGeometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const enemyMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x33FFEC
});


    function createEnemy(geometry, material, position) {
        const enemy = new THREE.Mesh(geometry, material);
        enemy.position.set(position.x, position.y, position.z);
        scene.add(enemy);
        return enemy;
    }
    function createEnemyWithModel(model, position) {
    const enemy = model.clone();
    enemy.position.copy(position);
    scene.add(enemy);
    return enemy;
}


    function spawnEnemies(amount, geometry, material, level) {
    if (!gameReady) return;

    const spawnDelay = 300; // 0.3 second delay

    function spawnEnemyWithDelay(index) {
        if (index < amount) {
            setTimeout(() => {
                const position = {
                    x: Math.random() * 20 - 10,
                    y: 0.5,
                    z: Math.random() * 20 - 10
                };

                const enemy = createEnemy(geometry, material, position);
                enemy.level = level;

                if (level === 2) {
                    enemy.name = "lvl2";
                    enemy.health = 20;
                } else if (level === 3){
                    enemy.name = "lvl3"
                    enemy.health = 150;
                }

                enemies.push(enemy);

                spawnEnemyWithDelay(index + 1);
            }, spawnDelay);
        }
    }

    spawnEnemyWithDelay(0);
}




    



function zombieCheck(){
   if(enemies.length === 0){
      return true;
   } else {
      return false;
   }
}

function updateRecentMoney() {
    document.getElementById("money-popup")
                                .style.display = "block";
                            document.getElementById("money-popup")
                                .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;
}

let roundOver = false;
let round2Called = false;
let round3Called = false;
let round4Called = false;
let round5Called = false;
let round6Called = false;
let round7Called = false;
let round8Called = false;
let round9Called = false;
let round10Called = false;
let round11Called = false;
let round12Called = false;
let round13Called = false;
let newRound = false;
const roundPopup = document.getElementById('round-popup')
const roundPopupContent = document.getElementById('round-popup-content')
const roundHolder = document.getElementById("newRound")
const roundCount = document.getElementById("newRoundCount")
//ammount, geometry, material, lvl
//lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
var roundReward = 500;
function round1(roundNbr){

   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

   setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    }, 5000);

    setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    }, 7000);

    setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
        roundOver = true;
        newRound = true;
    }, 10000);


const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round2(2);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}



function round2(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

   setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    }, 5000);



    setTimeout(() => {
        spawnEnemies(7, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);

    }, 6000);
    setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    }, 7000);
    setTimeout(() => {
        spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
        roundOver = true;
        newRound = true;
    }, 10500);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round3(3);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round3(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;
   roundPopup.classList.remove('fade-in');
    roundPopup.classList.remove('fade-out');
    roundPopup.style.display = 'block';

    setTimeout(() => {
        roundPopup.classList.remove("fade-in");
                roundPopup.classList.add("fade-out");
                setTimeout(() => {
                    roundPopup.classList.remove("fade-out");
                    roundPopup.style.display = 'none'
                }, 2000);
            }, 5500);
   

   roundPopupContent.innerHTML = `
   <h3 style=" font-weight: bold; text-align: center;">Press H to Hide | <span id="popuo-round"> Round 3 </span><i class="fa-solid fa-biohazard"></i></h3> <hr> <br> 
	<li> <i class="fa-solid fa-biohazard"></i> New Zombie Type! </li> <br>
	<li><i class="fa-solid fa-triangle-exclamation"></i> Small but deadly - avoid touching them. </li> <br>
	<li> <i class="fa-solid fa-toolbox"></i> Next Milestone Reward: Round 5</li> <BR>
	<li> <i class="fa-solid fa-bolt"></i> Powerups will have a chance to spawn on the ground & New Zombie Type</li> <BR>
        `


setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 1000);
setTimeout(() => {
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
}, 6500);
setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
    roundOver = true;
    newRound = true;
}, 10500); 

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round4(4);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round4(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;
setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(7, enemyGeometry2, enemyMaterial2, 2);
}, 1000);
setTimeout(() => {
    spawnEnemies(7, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 5000); 
setTimeout(() => {
    spawnEnemies(10, enemyGeometry2, enemyMaterial2, 2);
    newRound = true;
    roundOver = true;
}, 20000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round5(5);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round5(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

   roundPopup.classList.remove('fade-in');
    roundPopup.classList.remove('fade-out');
    roundPopup.style.display = 'block';

    setTimeout(() => {
        roundPopup.classList.remove("fade-in");
                roundPopup.classList.add("fade-out");
                setTimeout(() => {
                    roundPopup.classList.remove("fade-out");
                    roundPopup.style.display = 'none'
                }, 2000);
            }, 5500);
   

   roundPopupContent.innerHTML = `
   <h3 style=" font-weight: bold; text-align: center;">Press H to Hide | <span id="popuo-round"> Round 5 </span><i class="fa-solid fa-biohazard"></i></h3> <hr> <br> 
	<li> <i class="fa-solid fa-biohazard"></i> New Zombie Type! </li> <br>
	<li><i class="fa-solid fa-triangle-exclamation"></i> Large Spinning Mammoths - Avoid their dangerous bullets. </li> <br>
	<li> <i class="fa-solid fa-toolbox"></i> Powerups now spawn randomly on the ground. Keep an eye out for them! </li> <BR>
    <li> <i class="fa-brands fa-wpexplorer"></i> Buy Mega Jump and explore out-of-bounds areas of the map! Be careful not to get stuck... </li> <BR>

        `

setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(3, enemyGeometry2, enemyMaterial2, 2);
}, 1000);
setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 5000); 
setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    newRound = true;
    roundOver = true;
}, 20000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round6(6);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round6(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(2, enemyGeometry2, enemyMaterial2, 2);
}, 1000);
setTimeout(() => {
    spawnEnemies(2, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 5000); 
setTimeout(() => {
    spawnEnemies(3, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    newRound = true;
    roundOver = true;
}, 20000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round7(7);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}


function round7(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;


//lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);

setTimeout(() => {
    spawnEnemies(3, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 1000);
setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 3);
}, 10500); 
setTimeout(() => {
    spawnEnemies(3, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(5, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    newRound = true;
    roundOver = true;
}, 30000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round8(8);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round8(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;


//lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(10, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
}, 1000);

setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(2, enemyGeometry2, enemyMaterial2, 2);
    newRound = true;
    roundOver = true;
}, 30000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round9(9);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round9(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;
setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 1000);

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 5000);

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 10000);

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 15000);

setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 20000);
setTimeout(() => {
    spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 25000);

setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(10, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
    newRound = true;
    roundOver = true;
}, 30000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round10(10);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round10(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;


//lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);

setTimeout(() => {
    spawnEnemies(2, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(10, enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(15, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 1000);


setTimeout(() => {
    spawnEnemies(2, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(7, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 20000);

setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(10, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(5, enemyGeometry2, enemyMaterial2, 2);
    newRound = true;
    roundOver = true;
}, 30000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round11(11);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}


function round11(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

setTimeout(() => {
    spawnEnemies(7, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, 1000);


setTimeout(() => {
    spawnEnemies(15, enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(15, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 20000);

setTimeout(() => {
    spawnEnemies(7, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(15, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(3, enemyGeometry2, enemyMaterial2, 2);
    newRound = true;
    roundOver = true;
}, 25000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round12(12);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}


function round12(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;

setTimeout(() => {
    spawnEnemies(5, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(15, enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(30, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 1000);


setTimeout(() => {
    spawnEnemies(30, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 20000);

setTimeout(() => {
    spawnEnemies(30, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(3, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    newRound = true;
    roundOver = true;
}, 25000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                round13(13);
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney()
            }
        }, 10);
}

function round13(roundNbr){
   round = roundNbr;
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = roundNbr;
   roundOver = false;


//lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);

setTimeout(() => {
    spawnEnemies(10, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    spawnEnemies(30, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 1000);


setTimeout(() => {
    spawnEnemies(15, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
}, 15000);

setTimeout(() => {
    spawnEnemies(30, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(3, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    newRound = true;
    roundOver = true;
}, 25000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                freeplay();
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney();
                roundPopup.classList.remove('fade-in');
    roundPopup.classList.remove('fade-out');
    roundPopup.style.display = 'block';

    setTimeout(() => {
        roundPopup.classList.remove("fade-in");
                roundPopup.classList.add("fade-out");
                setTimeout(() => {
                    roundPopup.classList.remove("fade-out");
                    roundPopup.style.display = 'none'
                }, 2000);
            }, 5500);
   

   roundPopupContent.innerHTML = `
   <h3 style=" font-weight: bold; text-align: center;">Press H to Hide | <span id="popuo-round"> Freeplay Round 14 </span><i class="fa-solid fa-biohazard"></i></h3> <hr> <br> 
	<li> <i class="fa-solid fa-biohazard"></i> You have unlocked freeplay! </li> <br>
	<li><i class="fa-solid fa-triangle-exclamation"></i> Freeplay never ends - rounds will become increasingly difficult. </li> <br>
	<li> <i class="fa-solid fa-toolbox"></i> Survive as long as possible. Good luck!  </li> <BR>

        `
            }
        }, 10);
}



// Freeplay function
function freeplay() {

round++
   newRound = false;
   roundHolder.style.display = 'block';
   roundCount.textContent = round;
   setTimeout(() => {roundHolder.style.display = 'none';}, 3500);
   document.getElementById("round-count").textContent = round;
   roundOver = false;

 const freeplayDifficulty = round/2;
 //lvl 1:         spawnEnemies(1, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
//lvl 2:         spawnEnemies(1, enemyGeometry2, enemyMaterial2, 2);
//LVL 3:         spawnEnemies(1, new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);

setTimeout(() => {
    //first zombie spawn
    spawnEnemies(Math.round(0.5 * freeplayDifficulty), new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(Math.round(0.5 * freeplayDifficulty), enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(Math.round(0.5 * freeplayDifficulty), new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, Math.random() * 5000 + 5000);


setTimeout(() => {
    //second zombie spawn
    spawnEnemies(Math.round(1 * freeplayDifficulty), new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(Math.round(0.75 * freeplayDifficulty), enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(Math.round(0.5 * freeplayDifficulty), new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
}, Math.random() * 10000 + 5000);


setTimeout(() => {
    //third zombie spawn
    spawnEnemies(Math.round(2 * freeplayDifficulty), new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 1);
    spawnEnemies(Math.round(1 * freeplayDifficulty), enemyGeometry2, enemyMaterial2, 2);
    spawnEnemies(Math.round(0.65 * freeplayDifficulty), new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }), 3);
    newRound = true;
    roundOver = true;
}, Math.random() * 30000 + 10000);

const intervalId = setInterval(() => {
            if (zombieCheck() && newRound) {
               if(!roundOver) return;
                clearInterval(intervalId); 
                freeplay(); //call new freeplay round
                recentMoney += roundReward + 250;
                money += roundReward + 250;
                roundReward += 250;
                updateRecentMoney();
            }
        }, 10);
}







    const textureLoader = new THREE.TextureLoader(loadingManager);
    textureLoader.load('overlay.jpg'); //overlay experimental background img 
    //
    //
    //possible skyboxes made with https://skybox.blockadelabs.com/
    //
    //
    //https://i.imgur.com/H9VQm8h.jpg
    //https://i.imgur.com/ZEtn2vn.jpg
    //https://i.imgur.com/y4K0Idj.jpg
    //https://i.imgur.com/Qp9m02L.jpg <=== best so far
    //https://i.imgur.com/7EFwzds.jpg
    const texture = textureLoader.load('skybox.jpg');

    // Create the skybox geometry
    const skyboxGeometry = new THREE.SphereGeometry(1000, 32, 32);

    // Create the skybox material with the loaded texture
    const skyboxMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.BackSide
    });
    // Create the skybox mesh
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skybox.position.set(0, 100, 0);

    // Add the skybox to the scene
    scene.add(skybox);


    const loadingText = document.getElementById('loading-text');
let highestProgress = 0; // To track the highest progress value

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progress = Math.round((itemsLoaded / itemsTotal) * 100);
    
    // Update the highestProgress only if the current progress is higher
    highestProgress = Math.max(progress, highestProgress);
    
    loadingText.innerHTML = `Loading...  ${highestProgress}% <i class="fas fa-spinner fa-spin"></i>`;
};

loadingManager.onError = function (url) {
    console.error(`Failed to load ${url}`);
    alert("Failed to load " + url);
};




    // Assuming you already have a scene, camera, and renderer defined
    const loader1 = new THREE.FBXLoader(loadingManager);




    loader1.load('SciFiRifle.fbx', function (object) {
        gun = object;
        gun.scale.set(0.003, 0.003, 0.003); // Set the scale of the gun model
        gun.position.set(1.5, -1.2, -2); // Set the position of the gun model
        gun.rotation.x = Math.PI; // Rotate the gun model around the x axis
        gun.rotation.z = Math.PI; // Rotate the gun model around the y axis
        // Load the gun texture
        const textureLoader = new THREE.TextureLoader();
        const gunTexture = textureLoader.load('gunTexture.jpg');
        gunTexture.repeat.set(0.0032, 0.0032); // Set the repeat property of the texture

        // Create a material with a fixed color
        const gunMaterial = new THREE.MeshStandardMaterial({
            color: 0xc982e8,
            map: gunTexture,
            transparent: true,

        });

        // Apply the material to the gun mesh
        gun.material = gunMaterial;

        // Set the material of the gun model
        gun.traverse(function (node) {
            if (node.isMesh) {
                node.material = gunMaterial;
                node.material.needsUpdate = true; // Set the needsUpdate property to true to update the material
            }
        });

        // Set the render order and disable depth testing
        gun.renderOrder = 999999999;
        gun.traverse(function (node) {
            if (node.isMesh) {
                node.material.depthTest = false;
            }
        });
        camera.add(gun); // Add the gun model as a child of the camera



    });

    const pauseButton = document.getElementById("pause-button");

    function pauseGame() {

        if (isPaused) {

            // Resume the game
            isPaused = false;
            pauseButton.classList.remove("play");
            pauseButton.classList.add("pause");
            // Enable user input and show UI elements here

            animate(); // Restart the animation loop
            //unfocus element 
            pauseButton.blur();
            document.getElementById("pausedText")
                .style.display = "none";
            document.getElementById("shopButton")
                .disabled = false;

            document.addEventListener("click", lockControls);




        }
        else {


            // Pause the game
            isPaused = true;
            pauseButton.classList.remove("pause");
            pauseButton.classList.add("play");

            document.getElementById("pausedText")
                .style.display = "block";
            document.getElementById("shopButton")
                .disabled = true;

            // Disable user input and hide UI elements here
            cancelAnimationFrame(animationId); // Stop the animation loop
        }
    }
    pauseButton.addEventListener("click", () => {
        pauseGame();
        toggleEventListeners()
    });

    let animationId;

    //when user presses escape key pause the game
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            //if shop is open, return
            if (document.getElementById("shop")
                .classList.contains("active") || document.getElementById("shop")
                .classList.contains("active fading-in") || document.getElementById("shop")
                .classList.contains("active fading-out")) return;
            pauseGame();

        }
    });
    let gltf; // Declare the gltf variable outside of the loader function
    function fadeOutGame() {
        const overlay = document.getElementById("overlay");
        const text = document.getElementById("mapChangeText");
        const upgradesContinue = document.getElementById("upgradesContinue");

        setTimeout(() => {
            overlay.style.display = "block";
            document.getElementById("canvas")
                .style.opacity = "0";
            text.innerHTML = 'A new day dawns, <br> Youre alone out here... good luck'
        }, 500);
        document.getElementById("canvas")
            .style.opacity = "0";
        document.getElementById("gameUI")
            .style.display = "none";
        document.getElementById("gameUI")
            .style.opacity = "0";


        // Fade out the overlay after a delay
        setTimeout(() => {
            overlay.classList.add("fade-out");
            //document.getElementById("canvas").style.opacity = "1";
            // document.getElementById("gameUI").style.display = "block";
            setTimeout(() => {
                overlay.style.display = "none";
                overlay.classList.remove("fade-out");
                //            document.getElementById("canvas").style.display = "block";
                text.innerHTML = "";
            }, 500);
            document.getElementById("options-menu")
                .style.display = "block";
            //exit pointer lock
            document.exitPointerLock();
            //remove pointer lock
            document.removeEventListener("click", lockControls);
        }, 10500); //default 10500

        upgradesContinue.addEventListener("click", function () {
            if (!dayReward) {
                //add shake to li 
                upgradesContinue.classList.add("shake");
                setTimeout(() => {
                    upgradesContinue.classList.remove("shake");
                }, 500);
                return;

            }
            //startSpawningEnemies();
            document.getElementById("canvas")
                .style.animationPlayState = "running";
            document.getElementById("options-menu")
                .style.display = "none";
            document.addEventListener("click", lockControls);
            setTimeout(() => {
                document.getElementById("canvas")
                    .style.opacity = "1";
                document.getElementById("gameUI")
                    .style.opacity = "1";
                    gameReady = true;
                    round1(1);
                
            }, 500);


            const roundPopup = document.getElementById("round-popup");
            setTimeout(() => {
                roundPopup.classList.add("fade-out");
                setTimeout(() => {
                    roundPopup.classList.remove("fade-out");
                    roundPopup.style.display = 'none'
                }, 2000);
            }, 5500);
            //if gameUI is enabled
            if (showUI == true) {
                document.getElementById("gameUI")
                    .style.display = "block";
            }
            ammoCount = maxAmmo;
        });

    }



    function changeMap() {
        mapUrl = "https://theactualzenaldv2.github.io/gamedev/public2/extra/Freight.gltf";
        const overlay = document.getElementById("overlay");
        const text = document.getElementById("mapChangeText");
        //remove current skybox 
        scene.remove(skybox);

        setTimeout(() => {
            overlay.style.display = "block";
            document.getElementById("canvas")
                .style.display = "none";
            text.innerHTML = "A dawn of a new day...";
        }, 500);
        document.getElementById("canvas")
            .style.opacity = "0";
        document.getElementById("gameUI")
            .style.display = "none";
        scene.remove(gltf.scene);
        //change skybox 
        const texture = textureLoader.load('https://i.imgur.com/AQDR0Fc.jpg')

        // Create the skybox geometry
        const skyboxGeometry = new THREE.SphereGeometry(1000, 32, 32);

        // Create the skybox material with the loaded texture
        const skyboxMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.BackSide
        });
        // Create the skybox mesh
        const skybox2 = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
        skybox2.position.set(0, 100, 0);
        // Add the skybox to the scene
        scene.add(skybox2);
        //load the map
        gltfLoader.load(
            mapUrl,
            function (loadedGltf) {
                // Remove the old gltf object from the scene
                if (gltf) {
                    scene.remove(gltf.scene);
                }
                // Assign the loaded gltf to the global variable
                gltf = loadedGltf;
                gltf.scene.scale.set(0.13, 0.13, 0.13);
                gltf.frustumCulled = true;

                // Add the model to the scene
                scene.add(gltf.scene);
                //set camera position
                camera.position.set(0, 1, 10);

                // Fade out the overlay after a delay
                setTimeout(() => {
                    overlay.classList.add("fade-out");
                    document.getElementById("canvas")
                        .style.opacity = "1";
                    //document.getElementById("gameUI").style.display = "block";
                    setTimeout(() => {
                        overlay.style.display = "none";
                        overlay.classList.remove("fade-out");
                        document.getElementById("canvas")
                            .style.display = "block";
                        text.innerHTML = "";
                    }, 500);
                }, 5000);
            },

        );

    }

    let mapUrl = "CAPSTONEMAP.gltf"

    // Load the GLTF model
    const gltfLoader = new THREE.GLTFLoader(loadingManager);
    gltfLoader.load(
            mapUrl,
            function (loadedGltf) {
                // Assign the loaded gltf to the global variable
                gltf = loadedGltf;
                gltf.scene.scale.set(0.13, 0.13, 0.13);
                gltf.frustumCulled = true;
          

                // Add the model to the scene
                scene.add(gltf.scene);
            }
        ), // Called if there is an error loading the model
        function (error) {
            console.error(error);
        };
    const floorHeight = -0.5; // Set the floor height threshold for collisions

    function detectCollisions() {
        let collisionDetected = false;
        // Check if the gltf variable is defined
        if (gltf) {
            // Loop through the children of the GLTF model to check for collisions
            for (let child of gltf.scene.children) {
                // Check if the child object is below the floor height threshold
                if (child.position.y < floorHeight) {
                    continue; // Skip this object
                }

                // Check if the material is collidable
                if (child.material && child.material.collidable === false) {
                    continue; // Skip this object
                }

                // Create a new bounding box for the child object
                const box = new THREE.Box3()
                    .setFromObject(child);
                // Add padding to the box
                box.expandByScalar(0.35);

                // Check collision with player
                if (box.containsPoint(camera.position)) {
                    collisionDetected = true;
                }
            }
        }
        else {
        }

        return collisionDetected;
    }

    function detectBulletCollisions() {
        // Check if the gltf variable is defined
        if (gltf) {
            // Loop through the children of the GLTF model to check for collisions
            for (let child of gltf.scene.children) {
                // Compute the bounding box for the child object
                const box = new THREE.Box3()
                    .setFromObject(child);
                for (let bullet of bullets) {
                    // Origin point of bullet
                    const originPoint = bullet.position.clone();
                    if (box.containsPoint(originPoint)) {
                        // Remove the bullet from the scene
                        scene.remove(bullet);
                        // Set the collision flag to true
                        return true;
                    }
                }
            }
        }
        else {
        }
        // No collision detected, return false
        return false;
    }


    function detectEnemyBulletCollisions() {
        // Check if the gltf variable is defined
        if (gltf) {
            // Loop through the children of the GLTF model to check for collisions
            for (let child of gltf.scene.children) {
                // Compute the bounding box for the child object
                const box = new THREE.Box3()
                    .setFromObject(child);
                for (let bullet of enemyBullets) {
                    // Origin point of bullet
                    const originPoint = bullet.position.clone();
                    if (box.containsPoint(originPoint)) {
                        // Remove the bullet from the scene
                        scene.remove(bullet);
                        // Set the collision flag to true
                        return true;
                    }
                }
            }
        }
        else {
        }
        // No collision detected, return false
        return false;
    }






    function moveEnemies() {
        if (stealth) return;
        if(isPaused) return;
        // enemies towards player
        for (let enemy of enemies) {
            if(enemy.name === "lvl3"){
                enemy.rotation.z += 0.02
            }
            // Move in direction of player
            if (enemy.name === "lvl2") {
                const distance = enemy.position.distanceTo(controls.getObject()
                    .position);
                const speed = distance > 4 ? enemySpeed * 0.6 : enemySpeed * 5; // Move 3x faster for enemies with name "lvl2" when far away, otherwise move at regular speed
                enemy.position.lerp(controls.getObject()
                    .position, speed);
                enemy.position.y = 0.5;
            } if (enemy.name === "lvl3"){
                enemy.position.y = 5;
                enemy.position.lerp(controls.getObject()
                    .position, enemySpeed * 0.5);

            }
            else {
                enemy.position.lerp(controls.getObject()
                    .position, enemySpeed);

            }
        }
    }
    let enemyBullets = [];

    function enemyShooting() {
        if (isPaused) return;
        if (stealth) return;
        if (gameOver) return;
        //if there are more than 20 bullets in the array, remove the first one
        if (enemyBullets.length > 20) {
            scene.remove(enemyBullets[0]);
            enemyBullets.shift();
        }
        // Give each enemy 10% chance of shooting every second
        for (let enemy of enemies) {
            if (enemy.name === "lvl2") continue; // Skip shooting for enemies with name "lvl2"
            if(!enemy.name){
                if (Math.random() < 0.01) {
                const bullet = new THREE.Mesh(bulletGeometry, new THREE.MeshBasicMaterial({
                    color: 0xff0000
                }));
                // Set bullet velocity in direction of player
                const playerPosition = controls.getObject()
                    .position.clone();
                const enemyPosition = enemy.position.clone();
                const direction = playerPosition.sub(enemyPosition)
                    .normalize();
                bullet.position.copy(enemyPosition);
                bullet.velocity = direction.multiplyScalar(0.5);
                scene.add(bullet);
                enemyBullets.push(bullet);
            }
            } else if (enemy.name === "lvl3"){
                if (Math.random() < 0.05) {
                const bullet = new THREE.Mesh(bulletGeometry3, new THREE.MeshBasicMaterial({
                    color: 0xff0000
                }));
                // Set bullet velocity in direction of player
                const playerPosition = controls.getObject()
                    .position.clone();
                const enemyPosition = enemy.position.clone();
                const direction = playerPosition.sub(enemyPosition)
                    .normalize();
                bullet.position.copy(enemyPosition);
                bullet.velocity = direction.multiplyScalar(0.75);
                scene.add(bullet);
                bullet.dmg = 25;
                enemyBullets.push(bullet);
            }
            }
            
        }
    }
    setInterval(() => {
        enemyShooting();
    }, 50);

    let maxAmmo = 10;

    let isReloading = false;

    function startRecoil() {
        if (isPaused) return;
        if (isReloading) return;
        if (ammoCount == 0) return;
        if (gameOver) return;
        //if more than 20 bullets in bullet array, remove first one 
        if (bullets.length > 10) {
            scene.remove(bullets[0]);
            bullets.shift();
        }
        // Set the recoil animation
        let start = null;
        const duration = 100; // Duration of the animation in milliseconds
        const distance = 0.25; // Distance to move the gun in the z-axis
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            gun.position.z = -distance * Math.sin(progress * Math.PI) - 2;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    // Add bullets
    const bullets = [];
    const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const bulletGeometry3 = new THREE.SphereGeometry(0.5, 20, 20);

    //if liquid ammo is enabled, change bullet material to green, else make it white 
    let bulletMaterial;

    let ammoCount = 10; // Set initial ammo count
    const ammoCountElement = document.getElementById('ammo-count-value'); // Get ammo count element
    ammoCountElement.textContent = `${ammoCount}`; // Update ammo count element

    let shootTimeout = null; // Initialize shoot timeout variable
    let bulletDelay = 225; //default bullet delay
    canvas = document.getElementById("canvas");
    // On mousedown, start shooting

    // On mousedown, start shooting
    document.addEventListener('mousedown', () => {
        if (!gameLoaded) return;
        if (isPaused) return;
        if (isReloading) return;
        if (ammoCount == 0) return;

        if (liquifyingBullets == true) {
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
            bulletDelay = 75;
        }
        if (liquifyingBullets == false) {
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });
            bulletDelay = 225;
        }
        if (maxDamageLevel == true) {
            //gold bullets 
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0xffd700
            });
        }
        if (!shootTimeout) { // Check if shootTimeout is already set
            shootTimeout = setInterval(() => {
                if (ammoCount > 0) { // Check if there is ammo left
                    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
                    // Set bullet position to camera position
                    bullet.position.copy(camera.position);
                    // Add velocity to bullet
                    bullet.velocity = new THREE.Vector3();
                    // Set bullet velocity in direction of camera
                    camera.getWorldDirection(bullet.velocity);
                    bullet.velocity.multiplyScalar(0.65);
                    startRecoil(); // Start the recoil animation
                    if (!bullet.velocity || bullet.velocity.length() === 0) return; // Check if bullet velocity is zero

                    bullets.push(bullet);
                    scene.add(bullet);

                    ammoCount--; // Decrement ammo count
                    ammoCountElement.textContent = `${ammoCount}`; // Update ammo count element
                }
                if (ammoCount == 0) {
                    //ammoCountElement.style.color = 'red'; // Update ammo count element
                }
            }, bulletDelay);
        }
    });

    // On mouseup, stop shooting
    document.addEventListener('mouseup', () => {
        if (isPaused) return;
        if (!gameLoaded) return;
        if (ammoCount == 0) return;
        clearInterval(shootTimeout); // Clear the shootTimeout interval
        shootTimeout = null; // Reset the shootTimeout variable
    });

    // On click, shoot with 150ms delay
    document.addEventListener('click', () => {
        if (isPaused) return;
        if (!gameLoaded) return;
        if (isReloading) return;
        if (ammoCount == 0) return;
        if (gameOver) return;
        startRecoil(); // Start the recoil animation
        if (liquifyingBullets == true) {
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
        }
        if (liquifyingBullets == false) {
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });
        }
        if (maxDamageLevel == true) {
            //gold bullets 
            bulletMaterial = new THREE.MeshBasicMaterial({
                color: 0xffd700
            });
        }
        setTimeout(() => {
            if (ammoCount > 0) { // Check if there is ammo left
                const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
                // Set bullet position to camera position
                bullet.position.copy(camera.position);
                // Add velocity to bullet
                bullet.velocity = new THREE.Vector3();
                // Set bullet velocity in direction of camera
                camera.getWorldDirection(bullet.velocity);
                bullet.velocity.multiplyScalar(0.65);

                if (!bullet.velocity || bullet.velocity.length() === 0) return; // Check if bullet velocity is zero

                bullets.push(bullet);
                scene.add(bullet);

                ammoCount--; // Decrement ammo count
                ammoCountElement.textContent = `${ammoCount}`; // Update ammo count element
            }
            if (ammoCount == 0) {
                // ammoCountElement.style.color = 'red'; // Update ammo count element
                setTimeout(() => {
                    reloadWeapon();
                }, 500);
            }
        }, 150);
    });

    function reloadWeapon() {
        if (isPaused) return;
        if (ammoCount == maxAmmo) return; // Check if ammo count is already full

        //clear all shooting intervals
        clearInterval(shootTimeout); // Clear the shootTimeout interval
        shootTimeout = null; // Reset the shootTimeout variable

        // Set reloading flag to true
        isReloading = true;

        // Reload animation
        const reloadInterval = setInterval(() => {
            if (gun.position.z < 2.5) {
                gun.position.z += 0.1;
            }
        }, 10);

        setTimeout(() => {
            // Clear the reload interval
            clearInterval(reloadInterval);

            // Move the gun back to its original position
            const moveBackInterval = setInterval(() => {
                if (gun.position.z > -2) {
                    gun.position.z -= 0.1;
                }
                else {
                    // Set reloading flag to false when the gun is back in its original position
                    isReloading = false;
                    clearInterval(moveBackInterval);

                    // Reset ammo count and update ammo count element
                    ammoCount = maxAmmo;
                    ammoCountElement.textContent = `${ammoCount}`;
                    ammoCountElement.style.color = 'white';
                }
            }, 10);
        }, 800);

        ammoCountElement.textContent = 'Reloading...'; // Update ammo count element
        ammoCount = 0;

        // Check if the gun is reloading every 100ms and stop the moveBackInterval if it's not
        const checkReloadingInterval = setInterval(() => {
            if (!isReloading) {
                clearInterval(checkReloadingInterval);
            }
        }, 100);
    }
    // On key press, reload if 'r' is pressed
    document.addEventListener('keydown', (event) => {
        if (isPaused) return;
        if (isReloading) return;
        if (event.key === 'r' || event.key === 'R') {
            reloadWeapon();
        }
    });


    const controls = new THREE.PointerLockControls(camera, document.body);


    const lockControls = () => {
        controls.lock();
    };

    document.addEventListener("click", lockControls);

    scene.add(controls.getObject());




    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffdab9, 1.5);
    ambientLight.position.set(-64, 115, 66);
    scene.add(ambientLight);

  




    // Set up the raycaster for collision detection
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3();

    let jumpVelocity = 0;
    const jumpSpeed = 0.2;
    const jumpHeight = 0.9;
    // Load the skybox texture


    // Define variables for movement
    // Define variables for movement and timer
    let velocity = new THREE.Vector3();
    let speed = 0.1;
    let dashSpeed = 0.18;
    let lastShiftTime = 0;
    let shiftAvailable = true;
    var timeSinceLastShift;

    setInterval(() => {
            //check bullets array
            //if a bullet doesn't have a velocity, remove it from the scene
            bullets.forEach((bullet) => {
                if (!bullet.velocity || bullet.velocity.x === 0 && bullet.velocity.y === 0 && bullet.velocity.z === 0) {
                    bullet.position.add(bullet.velocity);

                }
            });
        },
        100);



    let fps = 0;
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsCounter = document.getElementById("fps-counter");
    const keyboard = {};
    let jumpVelocity1 = 0.006;
    let isJumping = false;
    let isDoubleJumping = false;
    let canDoubleJump = true;
    let hasDoubleJumped = false;
    let maxSpeed = 0.05;
    let dayReward = false;


    function handleKeyDown(event) {
        const key = event.key.toLowerCase();
        keyboard[key] = true;

        if (key === " ") {
            if (!isJumping) {
                isJumping = true;
                jumpVelocity = jumpSpeed;
            }
            else if (isJumping && canDoubleJump && !hasDoubleJumped && megaJump) {
                isDoubleJumping = true;
                jumpVelocity = jumpSpeed;
                hasDoubleJumped = true;
                canDoubleJump = false;
            }
        }
    }

    function handleKeyUp(event) {
        const key = event.key.toLowerCase();
        keyboard[key] = false;
    }

    let isEventListenerActive = false;
    function toggleEventListeners() {
    if (isEventListenerActive) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
    } else {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    }
    Object.keys(keyboard).forEach(key => {
        keyboard[key] = false;
    });

    isEventListenerActive = !isEventListenerActive;
}
toggleEventListeners();


    function handleMovement(){
        
        const currentTime = performance.now();
        const elapsedTime = currentTime - lastTime;
        const forward = new THREE.Vector3(
            controls.getObject()
            .matrix.elements[8],
            0,
            controls.getObject()
            .matrix.elements[10]
        );
        const backward = forward.clone()
            .negate();
        const left = new THREE.Vector3(
            controls.getObject()
            .matrix.elements[0],
            0,
            controls.getObject()
            .matrix.elements[2]
        );
        const right = left.clone()
            .negate();
        const velocity = new THREE.Vector3();




        // Check for shift key and timer
        if (!isPaused) {
            timeSinceLastShift = currentTime - lastShiftTime;
        }
        if (keyboard["shift"] && shiftAvailable && timeSinceLastShift > 5000) {
            speed = dashSpeed;

            document.getElementById("dash-progress-bar")
                .innerHTML = '<i class="fa fa-person-running"></i> Dashing';
            //	document.getElementById("dash-progress-bar").style.color = "red";
            setTimeout(() => {
                shiftAvailable = false;
                lastShiftTime = currentTime;

                setTimeout(() => {
                    shiftAvailable = true;
                }, 1500);
                const intervalId = setInterval(() => {
                    const progress = (Date.now() - lastShiftTime) / 1500;
                    if (progress >= 1) {
                        clearInterval(intervalId);
                    }
                }, 50);
            }, 1500);
        }
        else {
            speed = maxSpeed;
        }

        if (megaJump == true) {
            speed += 0.07;
            jumpVelocity1 = 0.0035
        }
        if (megaJump == false) {
            jumpVelocity1 = 0.006;
        }
        // Move the user
        if (keyboard["w"]) {
            velocity.add(backward);
        }
        if (keyboard["s"]) {
            velocity.add(forward);
        }
        if (keyboard["a"]) {
            velocity.add(right);
        }
        if (keyboard["d"]) {
            velocity.add(left);
        }




        // Jumping logic
        if (isJumping) {
            jumpVelocity -= jumpVelocity1;
            controls.getObject()
                .position.y += jumpVelocity / 2;

            if (controls.getObject()
                .position.y < jumpHeight) {
                controls.getObject()
                    .position.y = 1;
                isJumping = false;
                jumpVelocity = 0;
                canDoubleJump = true; // Enable double jump upon landing
                hasDoubleJumped = false; // Reset double jump flag
            }
        }

        if (isDoubleJumping) {
            jumpVelocity -= jumpVelocity1 * 0.01;
            controls.getObject()
                .position.y += jumpVelocity / 4;

            if (controls.getObject()
                .position.y < jumpHeight) {
                controls.getObject()
                    .position.y = 1;
                isDoubleJumping = false;
                jumpVelocity = 0;
            }
        }




        velocity.normalize();
        velocity.multiplyScalar(speed);
        controls.getObject()
            .position.add(velocity);

        // Check for collisions with the floor
        raycaster.set(
            controls.getObject()
            .position,
            new THREE.Vector3(0, -1, 0)
        );
        const intersects = raycaster.intersectObject(floor);
        if (intersects.length > 0) {
            const distance = intersects[0].distance;
            if (distance < 1) {
                controls.getObject()
                    .position.y += 1 - distance;
                isJumping = false;
                jumpVelocity = 0;
                canDoubleJump = true;
                isDoubleJumping = false;
                hasDoubleJumped = false;
            }
        }


        // Render the scene
        renderer.render(scene, camera);

        //stop player from moving through walls
        if (detectCollisions()) {
            controls.getObject()
                .position.sub(velocity);

        }
        moveEnemies();
    }
    setInterval(() => {
        handleMovement();
    }, 1000/165);

    let hitmarkerId;
    // Set up the animation loop
    //===================================================================================================
    //MAIN ANIMATION LOOP
    //
    //
    function animate() {

        // Check if another instance of animate() is already running
        if (animationId !== null) {
            // Another instance of animate() is already running, cancel it
            cancelAnimationFrame(animationId);
        }
        stats.begin();
        if (gameOver) return;


        // Update bullet positions
        bullets.forEach((bullet) => {
            bullet.position.add(bullet.velocity);
        });
        // Update bullet positions
        bullets.forEach((bullet) => {
            bullet.position.add(bullet.velocity);
        });

        const currentTime = performance.now();
        const elapsedTime = currentTime - lastTime;
        frameCount++;
        if (elapsedTime >= 1000) {
            fps = frameCount / (elapsedTime / 1000);
            frameCount = 0;
            lastTime = currentTime;
            fpsCounter.textContent = `FPS: ${Math.round(fps)}`;
        }




        animationId = requestAnimationFrame(animate);




        //enemy bullets 
        enemyBullets.forEach((enemyBullet) => {
            enemyBullet.position.add(enemyBullet.velocity);
        });

        //if they can dash, update dash-progress
        if (timeSinceLastShift > 5000) {
            document.getElementById("dash-progress-bar")
                .style.color = "white"
            document.getElementById("dash-progress-bar")
                .innerHTML = '<i class="fa fa-person-running"></i> Dash Ready';
            //size 15px
            document.getElementById("dash-progress-bar")
                .style.fontSize = "25px";
            document.getElementById("dash-progress-bar")
                .style.textAlign = "center";

        }
        else {
            document.getElementById("dash-progress-bar")
                .innerHTML = "";
        }



    


        let lastKillTime = Date.now(); // Variable to store the time of the last enemy kill

        //bullet collisions with enemies
        for (let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];
            for (let j = 0; j < enemies.length; j++) {
                const enemy = enemies[j];

                if(bullet.position.distanceTo(enemy.position) < 5){
                    if (enemy.name === "lvl3"){
                    enemy.health -= bulletDammage; // Reduce health by 1 for enemies with name "lvl 2";
                    scene.remove(bullet);
                  
                        bullets.splice(i, 1);
                    
                    if(hitmarkerId){
                        clearTimeout(hitmarkerId)
                    }
                    document.getElementById("crosshair").textContent = "x"
                 hitmarkerId = setTimeout(() => {
                    document.getElementById("crosshair").textContent = "+";

                }, 300);
                    if (enemy.health <= 0) {
                            scene.remove(enemy);
                            enemies.splice(j, 1);
                            score += 10;
                            recentScore += 10; // Update the recent score
                            money += 250;
                            recentMoney += 250; // Update the recent money
                            document.getElementById("score-counter")
                                .style.display = "block";
                            document.getElementById("score-counter")
                                .innerHTML = "+" + recentScore;
                            document.getElementById("score-value")
                                .innerHTML = score;
                            document.getElementById("money-popup")
                                .style.display = "block";
                            document.getElementById("money-popup")
                                .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;
                            lastKillTime = Date.now(); // Update the time of the last enemy kill
                        }
                       break;
                    }
                    
                }
                if (bullet.position.distanceTo(enemy.position) < 0.5) {
                    if(hitmarkerId){
                        clearTimeout(hitmarkerId)
                    }
                    document.getElementById("crosshair").textContent = "x"
                 hitmarkerId = setTimeout(() => {
                    document.getElementById("crosshair").textContent = "+";

                }, 300);

                    if (enemy.name === "lvl2") {
                        enemy.health -= bulletDammage; // Reduce health by 1 for enemies with name "lvl 2"
                        if (enemy.health <= 0) {
                            scene.remove(enemy);
                            enemies.splice(j, 1);
                            score += 2;
                            recentScore += 2; // Update the recent score
                            money += 50;
                            recentMoney += 50; // Update the recent money
                            document.getElementById("score-counter")
                                .style.display = "block";
                            document.getElementById("score-counter")
                                .innerHTML = "+" + recentScore;
                            document.getElementById("score-value")
                                .innerHTML = score;
                            document.getElementById("money-popup")
                                .style.display = "block";
                            document.getElementById("money-popup")
                                .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;
                            lastKillTime = Date.now(); // Update the time of the last enemy kill
                        }
                    } 
                    else {
                        scene.remove(enemy);
                        enemies.splice(j, 1);
                        score++;
                        recentScore++; // Update the recent score
                        money += 30;
                        recentMoney += 30;
                        document.getElementById("score-counter")
                            .style.display = "block";
                        document.getElementById("score-counter")
                            .innerHTML = "+" + recentScore;
                        document.getElementById("score-value")
                            .innerHTML = score;
                        document.getElementById("money-popup")
                            .style.display = "block";
                        document.getElementById("money-popup")
                            .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;

                        lastKillTime = Date.now(); // Update the time of the last enemy kill
                    }
                    scene.remove(bullet);
                    if (liquifyingBullets !== true) {
                        bullets.splice(i, 1);
                    }
                    // Exit the inner loop to prevent checking for collisions with the removed enemy
                    break;
                }
            }
        }




        checkPowerupCollisions();

        //rotate powerups slowly 
        powerups.forEach((powerup) => {
            powerup.rotation.y += 0.01;
        });
        //move them up and down slowly 
        powerups.forEach((powerup) => {
            powerup.position.y += Math.sin(Date.now() * 0.0015) * 0.0025;
        });

        //collision detection for enemy bullets
        enemyBullets.forEach((enemyBullet) => {
            if (enemyBullet.position.distanceTo(controls.getObject()
                    .position) < 0.75) {
                var dmg = 10
                if(enemyBullet.dmg){
                    dmg = enemyBullet.dmg
                } else {
                    dmg = 10;
                }
                health -= dmg;
                scene.remove(enemyBullet);
                enemyBullets.splice(enemyBullets.indexOf(enemyBullet), 1);
                document.getElementById("health-bar-number")
                    .innerHTML = "Health: " + health;
                document.getElementById("currentHealth")
                    .innerHTML = health;


            }
        });

        if (health < 0 && gameOver == false || health == 0 && gameOver == false) {
            gameOver = true;
            document.removeEventListener("click", lockControls);
            document.getElementById('background').style.backgroundImage = 'url("https://i.imgur.com/uaxySvY.jpg")'

            //hide the canvas
            document.getElementById("canvas")
                .style.opacity = "0";

            setTimeout(() => {
                document.getElementById("canvas")
                    .style.display = "none";

            }, 2000);
            document.getElementById("endGame")
                .style.opacity = "1";
            document.getElementById("endGame")
                .style.display = "block";

            document.getElementById("background")
                .style.display = "block";

            //exit pointer lock
            document.exitPointerLock();
            //stop the animation
            cancelAnimationFrame(animate);
            //hide UI
            document.getElementById("gameUI")
                .style.display = "none";
            document.getElementById("score-holder")
                .innerHTML = score;
            document.getElementById("roundEnd")
                .innerHTML = round;
            controls.unlock();
            var currentRun = {
                username: username,
                score: score,
                round: round,
                date: Date.now(),
            };

getLeaderBoardData();
            if (!username) {
                //disable chat bar 
                document.getElementById("chat-input")
                    .disabled = true;
                document.getElementById("chat-send")
                    .disabled = true;
                document.getElementById("chat-input")
                    .placeholder = "Login to chat and post high scores";
                document.getElementById("sendButtonText")
                    .innerHTML = "Not logged in";
            }

            if (username) {
                firebase.database()
                    .ref("users/" + username + "/runs")
                    .push({
                        username: username,
                        score: score,
                        round: round,
                        date: Date.now(),
                    });
            }


            var timeSinceLastMessage;
            // Get a reference to the chat messages node
            const chatMessagesRef = database.ref("chat/messages");

            // Get a reference to the current user's node
            const currentUserRef = database.ref("users/" + username);
            const last100ChatMessagesRef = chatMessagesRef.limitToLast(100);

            last100ChatMessagesRef.on("child_added", (snapshot) => {
                document.getElementById("chat-messages")
                    .scrollTop = document.getElementById("chat-messages")
                    .scrollHeight + 10;
                const message = snapshot.val();
                const messageElement = document.createElement("div");
                const date = new Date(message.date)
                    .toLocaleString();
                messageElement.innerHTML = `<span style="color: ${message.sender === username ? 'green' : 'gold'}; font-weight: bold; text-decoration: underline; cursor: pointer;" onclick="searchUser('${message.sender}')">${message.sender}:</span> ${makeLinksClickable(message.text)} <span style="color: gray; text-align: right; display: inline-block;">${date}</span>`;
                messageElement.classList.add("message");
                document.getElementById("chat-messages")
                    .appendChild(messageElement);
            });

            const updateLeaderboardButton = document.getElementById("updateLeaderboard");
let isButtonAvailable = true; // Flag to track button availability

updateLeaderboardButton.addEventListener('click', (event) => {
    if (isButtonAvailable) {
        isButtonAvailable = false; // Set the flag to false when button is clicked
        getLeaderBoardData();
        document.getElementById("leaderboardUpdate").innerHTML = "Updated";

        setTimeout(() => {
            document.getElementById("leaderboardUpdate").innerHTML = "Update Leaderboard";
            isButtonAvailable = true; // Set the flag to true after the cooldown period
        }, 10000); // 10 seconds cooldown
    }
});
        function getLeaderBoardData(){
                document.getElementById("high-scores").innerHTML = "";
                
            // Retrieve the high scores for all users and display the top 50 in the table
            var highScoresRef = firebase.database()
                .ref("users");
            //change "once" to "on" to make it update in real time if wanted later

            highScoresRef.once("value", function (snapshot) {
                var highScores = [];
                snapshot.forEach(function (childSnapshot) {
                    var username = childSnapshot.key;
                    var runs = childSnapshot.child("runs");
                    runs.forEach(function (runSnapshot) {
                        var run = runSnapshot.val();
                        highScores.push({
                            username: run.username,
                            score: run.score,
                            round: run.round,
                            date: new Date(run.date),
                        });



                    });
                });


                highScores.sort(function (a, b) {
                    return b.score - a.score;
                });
                var highScoresTable = document.getElementById("high-scores");
                highScoresTable.innerHTML = "";
                highScores.slice(0, 50)
                    .forEach(function (highScore, index) {
                        var row = document.createElement("tr");

                        var currentRunAdded = false;

                        var runVariation = Math.abs(currentRun.date - highScore.date);

                        if (highScore.username === currentRun.username && highScore.score === currentRun.score && highScore.round === currentRun.round && currentRunAdded === false && runVariation <= 1000) { // Add CSS class to row if the run matches the current run within 1000ms tolerance
                            currentRunAdded = true;

                            row.classList.add("currentRun");
                        }
                        var usernameCell = document.createElement("td");


                        usernameCell.innerHTML = index + 1 + ": " + `<span style="text-decoration: underline; cursor: pointer;" onclick="searchUser('${highScore.username}')"> ${highScore.username}</span>`;
                        if (index === 0) {
                            indexPlus1 = index + 1;
                            row.classList.add("gold");
                            usernameCell.innerHTML = '<i class="fa-solid fa-trophy"></i> ' + indexPlus1 + ": " + `<span style="text-decoration: underline; cursor: pointer;" onclick="searchUser('${highScore.username}')"> ${highScore.username}</span>`;
                        }
                        if (index === 1) {
                            indexPlus1 = index + 1;
                            row.classList.add("silver");
                            usernameCell.innerHTML = '<i class="fa-solid fa-award"></i> ' + indexPlus1 + ": " + `<span style="text-decoration: underline; cursor: pointer;" onclick="searchUser('${highScore.username}')"> ${highScore.username}</span>`;
                        }
                        if (index === 2) {
                            indexPlus1 = index + 1;
                            row.classList.add("bronze");
                            usernameCell.innerHTML = '<i class="fa-solid fa-star"></i> ' + indexPlus1 + ": " + `<span style="text-decoration: underline; cursor: pointer;" onclick="searchUser('${highScore.username}')"> ${highScore.username}</span>`;
                        }
                        row.appendChild(usernameCell);
                        var scoreCell = document.createElement("td");
                        scoreCell.textContent = highScore.score;
                        row.appendChild(scoreCell);
                        var roundCell = document.createElement("td");
                        roundCell.textContent = highScore.round;
                        row.appendChild(roundCell);
                        var dateCell = document.createElement("td");
                        dateCell.textContent = highScore.date.toLocaleString();
                        row.appendChild(dateCell);
                        highScoresTable.appendChild(row);
                    });
            });
            }

            function getDevData() {
                document.getElementById("chat-messages")
                    .scrollTop = document.getElementById("chat-messages")
                    .scrollHeight + 10;
                let totalUsers;
                // Make a new div with the data
                const devData = document.createElement("div");
                const currentDate = new Date()
                    .toLocaleString();
                devData.innerHTML += `<span style="color: white; font-weight: bold; text-decoration: underline; cursor: pointer;">Dev Data:</span> <span style="color: gray; text-align: right; display: inline-block;">As Of ${currentDate}</span>`;
                // Retrieve the total number of users from the database
                firebase.database()
                    .ref("users")
                    .once("value")
                    .then(function (snapshot) {
                        totalUsers = snapshot.numChildren();
                        devData.innerHTML += `<br><span style="color: gray;">Total Users:</span> ${totalUsers}`;
                    });
                // Retrieve the total number of chat messages from the database
                firebase.database()
                    .ref("chat/messages")
                    .once("value")
                    .then(function (snapshot) {
                        const totalChatMessages = snapshot.numChildren();
                        devData.innerHTML += `<br><span style="color: gray;">Total Chat Messages:</span> ${totalChatMessages}`;
                    });
                // Retrieve the total number of runs for the current user from the database
                firebase.database()
                    .ref(`users/${username}/runs`)
                    .once("value")
                    .then(function (snapshot) {
                        const totalRuns = snapshot.numChildren();
                        devData.innerHTML += `<br><span style="color: gray;">Total Runs:</span> ${totalRuns}`;
                        // Calculate the average score, runs, and round for the current user
                        let totalScore = 0;
                        let totalRounds = 0;
                        snapshot.forEach(function (childSnapshot) {
                            const runData = childSnapshot.val();
                            totalScore += runData.score;
                            totalRounds += runData.round;
                        });
                        const averageScore = totalScore / totalRuns;
                        const averageRounds = totalRounds / totalRuns;
                        devData.innerHTML += `<br><span style="color: gray;">Average Score:</span> ${averageScore.toFixed(2)}`;
                        devData.innerHTML += `<br><span style="color: gray;">Average Round:</span> ${averageRounds.toFixed(2)}`;
                        document.getElementById("chat-messages")
                            .scrollTop = document.getElementById("chat-messages")
                            .scrollHeight + 10;
                        if (username) {
                            setTimeout(() => {
                                // Send a ping under the current user's username to the Firebase database to measure response time
                                const pingStart = performance.now();
                                firebase.database()
                                    .ref(`users/${username}/ping`)
                                    .set(Date.now())
                                    .then(function () {
                                        // Read the ping value from the Firebase database and calculate the response time
                                        firebase.database()
                                            .ref(`users/${username}/ping`)
                                            .once("value")
                                            .then(function (snapshot) {
                                                const pingEnd = performance.now();
                                                const pingTime = pingEnd - pingStart;
                                                const pingValue = snapshot.val();
                                                const pingResponseTime = Date.now() - pingValue;
                                                devData.innerHTML += `<br><span style="color: gray;">Ping:</span> ${pingTime.toFixed(2)} ms (Response Time: ${pingResponseTime.toFixed(2)} ms)`;
                                                document.getElementById("chat-messages")
                                                    .scrollTop = document.getElementById("chat-messages")
                                                    .scrollHeight + 10;
                                            });
                                    });
                            }, 50);


                        }
                    });
                setTimeout(() => {
                    document.getElementById("chat-messages")
                        .scrollTop = document.getElementById("chat-messages")
                        .scrollHeight + 10;
                    devData.classList.add("message");
                    devData.style.border = "1px solid #ddd";
                    devData.style.padding = "10px";
                    document.getElementById("chat-messages")
                        .appendChild(devData);
                    //scroll to bottom
                    document.getElementById("chat-messages")
                        .scrollTop = document.getElementById("chat-messages")
                        .scrollHeight + 10;
                }, 50);

            }
            // Function to make URLs in a string clickable
            function makeLinksClickable(text) {
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
            }


            setInterval(() => {
                //pingServer();
            }, 5000);
            pingServer();

            function pingServer(printResults) {
                if (!username) return;
                // Create a div to hold the ping results
                const pingResults = document.createElement("div");
                if (printResults) {
                    const currentDate = new Date()
                        .toLocaleString();
                    pingResults.innerHTML = `<span style="color: white; font-weight: bold; text-decoration: underline; cursor: pointer;">Ping Results:</span> <span style="color: gray; text-align: right; display: inline-block;">As Of ${currentDate}</span><br> <span style="color: gray">Pong! Calculating Database Response Time...         <i class="fas fa-spinner fa-spin" style="font-size: 16px; color: #ccc; margin-left: 0px;"></i></span>`;
                    pingResults.classList.add("message");
                    pingResults.classList.add("server-message");
                    pingResults.style.border = "1px solid #ddd";
                    pingResults.style.padding = "10px";
                    document.getElementById("chat-messages")
                        .appendChild(pingResults);
                    document.getElementById("chat-messages")
                        .scrollTop = document.getElementById("chat-messages")
                        .scrollHeight + 10;
                }
                let pingCount = 0;
                let totalPingTime = 0;
                let lowPingTime = Infinity;
                let highPingTime = 0;
                const pingInterval = setInterval(function () {
                    // Send a ping under the current user's username to the Firebase database to measure response time
                    const pingStart = performance.now();
                    firebase.database()
                        .ref(`users/${username}/ping`)
                        .set(pingStart)
                        .then(function () {
                            // Read the ping value from the Firebase database and calculate the response time
                            firebase.database()
                                .ref(`users/${username}/ping`)
                                .once("value")
                                .then(function (snapshot) {
                                    const pingEnd = performance.now();
                                    const pingTime = pingEnd - pingStart;
                                    const pingValue = snapshot.val();
                                    const pingResponseTime = pingEnd - pingValue;
                                    pingCount++;
                                    totalPingTime += pingResponseTime;
                                    if (pingResponseTime < lowPingTime) {
                                        lowPingTime = pingResponseTime;
                                    }
                                    if (pingResponseTime > highPingTime) {
                                        highPingTime = pingResponseTime;
                                    }
                                });
                        });
                }, 1000);
                setTimeout(function () {
                    clearInterval(pingInterval);
                    const averagePingTime = totalPingTime / pingCount;
                    if (printResults) {
                        const currentDate = new Date()
                            .toLocaleString();
                        // Update the ping results div with the average, low, and high ping times
                        pingResults.innerHTML = "";
                        pingResults.innerHTML = `<span style="color: white; font-weight: bold; text-decoration: underline; cursor: pointer;">Ping Results:</span> <span style="color: gray; text-align: right; display: inline-block;">As Of ${currentDate}</span> <br><span style="color: gray;">Average Response Time:</span> ${averagePingTime.toFixed(2)} ms <br><span style="color: gray;">Lowest Response Time:</span> ${lowPingTime.toFixed(2)} ms <br><span style="color: gray;">Highest Response Time:</span> ${highPingTime.toFixed(2)} ms <br><span style="color: gray;">Pings Sent: </span> ${pingCount}`;
                        pingResults.classList.add("message");
                        pingResults.classList.add("server-message");
                        pingResults.style.border = "1px solid #ddd";
                        pingResults.style.padding = "10px";
                        // Scroll to the bottom of the chat messages
                        document.getElementById("chat-messages")
                            .appendChild(pingResults);
                        document.getElementById("chat-messages")
                            .scrollTop = document.getElementById("chat-messages")
                            .scrollHeight + 10;
                    }
                    else {
                        
                    }
                }, 6000);
            }
            // Send a new chat message when the user presses "Enter"
            document.getElementById("chat-input")
                .addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault(); // Prevent the page from refreshing
                        const messageText = document.getElementById("chat-input")
                            .value;
                        // Create a link element for each URL in the message text
                        if (messageText === "") return;
                        if (Date.now() - timeSinceLastMessage < 500) return;
                        if (messageText.length > 100) {
                            alert("Message must be less than 100 characters." + " Your message is" + messageText.length + " characters.");
                            return;
                        }
                        if (messageText == "/ping") {
                            pingServer(true);
                            document.getElementById("chat-input")
                                .value = "";
                            return;
                        }
                        if (messageText === "/data") {
                            getDevData();
                            document.getElementById("chat-input")
                                .value = "";
                            return;
                        }
                        if (messageText === "/data") return;

                        const message = {
                            text: messageText,
                            sender: username,
                            date: Date.now(),
                        };
                        timeSinceLastMessage = Date.now();
                        chatMessagesRef.push(message);
                        currentUserRef.child("messages")
                            .push(message);
                        document.getElementById("chat-input")
                            .value = "";
                        document.getElementById("chat-messages")
                            .scrollTop = document.getElementById("chat-messages")
                            .scrollHeight; // Scroll to the bottom of the chat
                        document.getElementById("chat-send")
                            .classList.add("pressed");
                        setTimeout(() => {
                            document.getElementById("chat-send")
                                .classList.remove("pressed");
                        }, 200);
                    }
                });
            // Send a new chat message
            document.getElementById("chat-send")
                .addEventListener("click", () => {
                    event.preventDefault(); // Prevent the page from refreshing
                    const messageText = document.getElementById("chat-input")
                        .value;
                    if (messageText === "") return;
                    if (Date.now() - timeSinceLastMessage < 500) return;
                    if (messageText.length > 100) {
                        alert("Message must be less than 100 characters." + " Your message is" + messageText.length + " characters.");
                        return;
                    }
                    if (messageText == "/ping") {
                        pingServer(true);
                        document.getElementById("chat-input")
                            .value = "";
                        return;
                    }
                    if (messageText === "/data") {
                        getDevData();
                        document.getElementById("chat-input")
                            .value = "";
                        return;
                    }
                    const message = {
                        text: messageText,
                        sender: username,
                        date: Date.now(),
                    };
                    timeSinceLastMessage = Date.now();
                    chatMessagesRef.push(message);
                    currentUserRef.child("messages")
                        .push(message);
                    document.getElementById("chat-input")
                        .value = "";
                    document.getElementById("chat-messages")
                        .scrollTop = document.getElementById("chat-messages")
                        .scrollHeight; // Scroll to the bottom of the chat
                });


        }

        updateHealth();
        updateProgressBar();

        //detect bullet collisions with walls
        bullets.forEach((bullet) => {
            if (detectBulletCollisions(bullet)) {

                scene.remove(bullet);
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        });
        //detect enemy bullet collisions with walls
        enemyBullets.forEach((enemyBullet) => {
            if (detectEnemyBulletCollisions(enemyBullet)) {
                scene.remove(enemyBullet);
                enemyBullets.splice(enemyBullets.indexOf(enemyBullet), 1);
            }
        });
        document.getElementById("money-count")
            .innerHTML = "$" + money.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        document.getElementById("shopMoneyCount")
            .innerHTML = "$" + money.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        stats.end();

        //
        //
        //
        //
        //
        //
    }

    // Hide the score counter element after 1500ms of no enemy kills
    setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastKillTime >= 2000) {
            document.getElementById("score-counter")
                .style.display = "none";
            recentScore = 0; // Reset the recent score
        }
    }, 2000);
    let recentMoney;
    // Hide the score counter element after 1500ms of no enemy kills
    setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastKillTime >= 2000) {
            document.getElementById("money-popup")
                .style.display = "none";
            recentMoney = 0; // Reset the recent score
        }
    }, 2000);



    // Create a function to check for collisions between the player and powerups
    function checkPowerupCollisions() {
        // Loop through all powerups
        for (let i = 0; i < powerups.length; i++) {
            const powerup = powerups[i];

            // Check if the player is colliding with the powerup
            if (controls.getObject()
                .position.distanceTo(powerup.position) < 1.5) {



                // Check the name of the powerup and apply its effect
                switch (powerup.name) {
                case "megaJump":
                    if (megaJump || inventorySlot2.classList.contains("inventoryAvaliable")) {
                        return;
                    }

                    inventory.push("megaJump");
                    inventorySlot2.classList.remove("inventoryCooldown");
                    inventorySlot2.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
                    inventorySlot2.classList.add("inventoryAvaliable");

                    if (megaJumpCooldown !== null) {
                        clearTimeout(megaJumpTimeoutId);
                    }

                    scene.remove(powerup);
                    powerups.splice(i, 1);
                    break;
                case "nuke":
                    if (nukeActive || inventorySlot1.classList.contains("inventoryAvaliable")) {
                        return;
                    }
                    inventory.push("nuke");
                    inventorySlot1.classList.remove("inventoryCooldown");
                    inventorySlot1.classList.add("inventoryAvaliable");
                    scene.remove(powerup);
                    powerups.splice(i, 1);

                    break;

                case "liquifyingBullets":
                    if (liquifyingBullets || inventorySlot3.classList.contains("inventoryAvaliable")) {
                        return;
                    }

                    inventory.push("liquifyingBullets");
                    inventorySlot3.classList.remove("inventoryCooldown");
                    inventorySlot3.innerHTML = '<i class="fa-solid fa-tint"></i>';
                    inventorySlot3.classList.add("inventoryAvaliable");

                    if (liquifyingBulletsTimeoutId !== null) {
                        clearTimeout(liquifyingBulletsTimeoutId);
                    }

                    scene.remove(powerup);
                    powerups.splice(i, 1);
                    break;
                case "shield":
                    if (inventorySlot5.classList.contains("inventoryAvaliable")) {
                        return;
                    }
                    inventory.push("shield");
                    inventorySlot5.classList.remove("inventoryCooldown");
                    inventorySlot5.classList.add("inventoryAvaliable");
                    scene.remove(powerup);
                    powerups.splice(i, 1);
                    updateHealth();
                    break;

                case "stealth":
                    if (stealth || inventorySlot4.classList.contains("inventoryAvaliable")) {
                        return;
                    }

                    inventory.push("stealth");
                    inventorySlot4.classList.remove("inventoryCooldown");
                    inventorySlot4.innerHTML = '<i class="fa-solid fa-user-ninja"></i>';
                    inventorySlot4.classList.add("inventoryAvaliable");

                    if (stealthTimeoutId !== null) {
                        clearTimeout(stealthTimeoutId);
                    }

                    scene.remove(powerup);
                    powerups.splice(i, 1);
                    break;
                }
            }
        }
    }


    function updateHealth() {
        if (gameOver) return;

        //change health bar color based on health
        //health bar is a class called health section

        const healthBarValue = document.getElementById("health-bar-value");
        const healthSections = healthBarValue.querySelectorAll(".health-section");
        const numSections = healthSections.length;
        const sectionWidth = 100 / numSections;
        const remainingSections = Math.floor((health / maxHealth) * numSections);
        for (let i = 0; i < numSections; i++) {
            if (i < remainingSections) {
                healthSections[i].style.width = sectionWidth + "%";
            }
            else {
                healthSections[i].style.width = "0";
            }
            //update the health bar value
            document.getElementById("health-bar-number")
                .innerHTML = '<i class="fa-solid fa-heart" style="color: #ffffff;"></i> ' + "Health: " + health;
        }


        if (health > 80) {
            for (let i = 0; i < healthSections.length; i++) {
                //healthSections[i].style.backgroundColor = "green";
            }
        }
        else if (health > 60 && health <= 80) {
            for (let i = 0; i < healthSections.length; i++) {
                // healthSections[i].style.backgroundColor = "greenyellow";
            }
        }
        else if (health > 40 && health <= 60) {
            for (let i = 0; i < healthSections.length; i++) {
                // healthSections[i].style.backgroundColor = "yellow";
            }
        }
        else if (health > 20 && health <= 40) {
            for (let i = 0; i < healthSections.length; i++) {
                //  healthSections[i].style.backgroundColor = "orange";
            }
        }
        else if (health >= 0 && health <= 20) {
            for (let i = 0; i < healthSections.length; i++) {
                //  healthSections[i].style.backgroundColor = "red";
            }
        }
    }
    setInterval(() => {
        if (!isPaused) {
            setTimeout(() => {
                //enemy collision with player
                for (let enemy of enemies) {
                    const padding = enemy.name === "lvl2" ? 0.75 : 0.5; // Add padding if enemy name is "lvl2"
                    if (enemy.position.distanceTo(controls.getObject()
                            .position) < padding) {
                        health--;
                        updateHealth();
                    }
                }
            }, 50);
        }
    }, 50);


    setInterval(() => {
        enemyNumber++;
    }, 5000);




    function updateProgressBar() {
        const progressBar = document.getElementById("dash-progress-bar");
        const progress = timeSinceLastShift;
        if (progress <= 0) {
            progressBar.style.width = "0%";
            //   progressBar.style.backgroundColor = "red";
        }
        else if (progress < 1000) {
            progressBar.style.width = "10%";
            // progressBar.style.backgroundColor = "limegreen";
        }
        else {
            const progressPercentage = Math.min(Math.floor((progress - 1000) / 500) * 10, 100) + 10;
            progressBar.style.width = `${progressPercentage}% `;
            //  progressBar.style.backgroundColor = "#4CAF50";
        }
        if (timeSinceLastShift > 5000) {
            progressBar.style.width = `${100}%`;
        }
        progressBar.style.transition = "width 0.5s ease-in-out, background-color 0.5s ease-in-out";
        progressBar.style.backgroundColor = "lightgrey"
    }

    if (!localStorage.getItem("tutorial")) {

        const popupText = document.getElementById("popup-text");
        const popupHolder = document.getElementById("popup-holder");
        if (score == 0) {
            popupText.innerHTML = "Use WASD to move";
            popupHolder.style.display = "block";
            setTimeout(() => {
                popupText.innerHTML = "Use the mouse to look around";
            }, 1500);
            setTimeout(() => {
                popupText.innerHTML = "Click to shoot";
            }, 3000);
            setTimeout(() => {
                popupText.innerHTML = "Press space to jump";
            }, 4500);
            setTimeout(() => {
                popupText.innerHTML = "Press shift to dash";
            }, 6000);
            setTimeout(() => {
                popupText.innerHTML = "Press R to reload";
            }, 7500);
            setTimeout(() => {
                popupText.innerHTML = "Press escape to pause";
            }, 9000);
            setTimeout(() => {
                popupText.innerHTML = "Good luck and get the highest score!";

            }, 10500);
            setTimeout(() => {
                popupHolder.style.display = "none";
                localStorage.setItem("tutorial", true);
            }, 13000);
        }
    }



    //on window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });



    const wKey = document.getElementById('w-key');
    const aKey = document.getElementById('a-key');
    const sKey = document.getElementById('s-key');
    const dKey = document.getElementById('d-key');
    document.addEventListener('keydown', (event) => {
        if(isPaused) return;
        switch (event.key.toLowerCase()) {
        case 'w':
            wKey.classList.add('active');
            break;
        case 'a':
            aKey.classList.add('active');
            break;
        case 's':
            sKey.classList.add('active');
            break;
        case 'd':
            dKey.classList.add('active');
            break;
        case 'h':
            document.getElementById("round-popup")
                .classList.add('fade-out');

        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {
        case 'w':
            wKey.classList.remove('active');
            break;
        case 'a':
            aKey.classList.remove('active');
            break;
        case 's':
            sKey.classList.remove('active');
            break;
        case 'd':
            dKey.classList.remove('active');
            break;
        }
    });

    //=======================================================>>>>>>>>>>>>>> SHOP CODE 
    //
    //
    const shop = document.getElementById("shop");
    const shopClose = document.getElementById("shop-close");
    const weaponTab = document.getElementById("weapon-tab");
    const playerTab = document.getElementById("player-tab");
    const powerupsTab = document.getElementById("powerups-tab");
    const weaponUpgrades = document.getElementById("weapon-upgrades");
    const playerUpgrades = document.getElementById("player-upgrades");
    const shopManualButton = document.getElementById("shopButton");
    const powerupsUpgrades = document.getElementById("powerups-upgrades");

    function openShop() {
        shop.classList.add("active");
      

    }

    function closeShop() {
        if (!shop.classList.contains("fading-out")) {
            shop.classList.add("fading-out");
            setTimeout(() => {
                shop.classList.remove("active");
                shop.classList.remove("fading-out");
                document.getElementById("pause-button")
                    .disabled = false;

            }, 1000);
        }
    }

    function openShop() {
        if (!shop.classList.contains("active") && !shop.classList.contains("fading-out")) {
            shop.classList.add("active");
            shop.classList.add("fading-in");
            //disable manual pause button
            document.getElementById("pause-button")
                .disabled = true;

            setTimeout(() => {
                shop.classList.remove("fading-in");

            }, 1000);
        }
    }

    function switchTab(tab) {
        if (tab === "weapon") {
            weaponTab.classList.add("active");
            playerTab.classList.remove("active");
            powerupsTab.classList.remove("active");
            weaponUpgrades.style.display = "block";
            playerUpgrades.style.display = "none";
            weaponUpgrades.style.animation = "fade-in 1s ease-in-out";
            playerUpgrades.style.animation = "none";
            powerupsUpgrades.style.display = "none";
        }
        else if (tab === "player") {
            weaponTab.classList.remove("active");
            playerTab.classList.add("active");
            powerupsTab.classList.remove("active");
            weaponUpgrades.style.display = "none";
            playerUpgrades.style.display = "block";
            playerUpgrades.style.animation = "fade-in 1s ease-in-out";
            weaponUpgrades.style.animation = "none";
            powerupsUpgrades.style.display = "none";
        }
        else if (tab === "powerups") {
            weaponTab.classList.remove("active");
            playerTab.classList.remove("active");
            powerupsTab.classList.add("active");
            powerupsUpgrades.style.animation = "fade-in 1s ease-in-out";
            powerupsUpgrades.style.display = "block";
            weaponUpgrades.style.display = "none";
            playerUpgrades.style.display = "none";
            playerUpgrades.style.animation = "none";
            weaponUpgrades.style.animation = "none";

        }
    }

    shopClose.addEventListener("click", () => {
        closeShop();
        pauseGame();
        toggleEventListeners();




        document.addEventListener("click", lockControls);
    });
    if (coolPineapplePizza == true) {
        let shopOpen = false;
        let intervalId = null;
        document.addEventListener("keydown", (event) => {
            if (event.key === "b" || event.key === "B") {
                if (gameOver) return;
                if (!gameLoaded) return;
        toggleEventListeners();
                if (shop.classList.contains("active")) {
                    if (!shopOpen) {
                        shopOpen = true;
                        pauseGame();
                        document.addEventListener("click", lockControls);
                        document.exitPointerLock();
                    }
                    else {
                        shopOpen = false;
                    }
                    closeShop();
                }
                else {
                    openShop();
                    pauseGame();
                    document.removeEventListener("click", lockControls);
                    document.exitPointerLock();
                }
            }
        });

        intervalId = setInterval(() => {
            if (!shop.classList.contains("active")) {
                shopOpen = false;
            }
        }, 250);
    }
    weaponTab.addEventListener("click", () => {
        switchTab("weapon");
    });
    playerTab.addEventListener("click", () => {
        switchTab("player");
    });
    powerupsTab.addEventListener("click", () => {
        switchTab("powerups");
    });

    shopManualButton.addEventListener("click", () => {
        toggleEventListeners()
        if (shop.classList.contains("active")) {
            closeShop();
            pauseGame();
            document.addEventListener("click", lockControls);
            //unfocus element
            shopManualButton.blur();
        }
        else {
            openShop();
            pauseGame();
            document.removeEventListener("click", lockControls);
            document.exitPointerLock();
        }
    });

    if (gameOver) {
        document.getElementById("fps-counter")
            .style.display = "none";
    }


    // Create an array to hold the powerup objects


    // Create an array of powerup names
    const powerupNames = [
        'megaJump', 'megaJump', 'megaJump', 'megaJump', 'megaJump',
        'liquifyingBullets',
        'shield', 'shield', 'shield', 'shield', 'shield', 'shield', 'shield',
        'nuke', 'nuke',
        'stealth', 'stealth', 'stealth', 'stealth', 'stealth', 'stealth',

    ];

    // Create a function to spawn a powerup at a random position with a random name
    function spawnPowerup() {
        if(round < 5) return;
        //Generate a random position for the powerup
        const x = Math.random() * 300 - 150; // Random x position between -200 and 200
        const y = 1;
        const z = Math.random() * 200 - 100 // Random z position between -200 and 200
            //
            //
            //const x = Math.random() * 10; // test spawning
            //const y = 1;
            //const z = Math.random() * 10 // 
            // Create a new powerup object
        const powerup = new THREE.Group();

        // Create the vertical part of the plus sign
        const verticalPart = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 1, 0.2),
            new THREE.MeshStandardMaterial({
                color: 0xF3A7B5, // Set the color to light pink

                transparent: true, // Make the material transparent
                opacity: 1 // Set the opacity to 1
            })
        );
        verticalPart.position.set(0, 0.4, 0);
        powerup.add(verticalPart);

        // Create the horizontal part of the plus sign
        const horizontalPart = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.2, 0.2),
            new THREE.MeshStandardMaterial({
                color: 0xF3A7B5, // Set the color to light pink

                transparent: true, // Make the material transparent
                opacity: 1 // Set the opacity to 1
            })
        );
        horizontalPart.position.set(0, 0.4, 0);
        powerup.add(horizontalPart);

        // Set the position of the powerup
        powerup.position.set(x, y, z);

        // Assign a random name to the powerup
        const randomIndex = Math.floor(Math.random() * powerupNames.length);
        const name = powerupNames[randomIndex];
        powerup.name = name;


        // Color the powerup based on its name
        if (name === "megaJump") {
            verticalPart.material.color.set(0xff69b4); // Pink
            horizontalPart.material.color.set(0xff69b4); // Pink

        }
        else if (name === "liquifyingBullets") {
            verticalPart.material.color.set(0x39ff14); // Neon green
            horizontalPart.material.color.set(0x39ff14); // Neon green
        }
        else if (name === "shield") {
            verticalPart.material.color.set(0x00ffff); // Cyan
            horizontalPart.material.color.set(0x00ffff); // Cyan
        }
        else if (name === "nuke") {
            verticalPart.material.color.set(0xff0000); // Red
            horizontalPart.material.color.set(0xff0000); // Red
        }
        else if (name === "stealth") {
            //white 
            verticalPart.material.color.set(0xffffff); // White
            horizontalPart.material.color.set(0xffffff); // White
        }

        // Add the powerup to the scene
        scene.add(powerup);

        // Add the powerup to the powerups array
        powerups.push(powerup);
        //max powerups of 1000
        if (powerups.length > 10) {
            scene.remove(powerups[0]);
            powerups.splice(0, 1);
        }

    }


    setInterval(() => {
        //25% chance to call spawnPowerup
        if (Math.random() < 0.25) {
            spawnPowerup();
        }
        if (userDifficulty > 7.5) {


            if (Math.random() < 0.85) {
                spawnPowerup();
            }
        }

    }, 5000);

    //spawn nuke that kills all enemies 
    function nuke() {
        nukeActive = true;
        setTimeout(() => {
            //remove all enemies from scene
            //for loop to remove all enemies from scene
            for (let enemy of enemies) {
                //depending on enemy type, give score
                if (enemy.name === "lvl2") {
                    score += 2;
                    document.getElementById("score-value")
                        .innerHTML = score;
                    recentScore += 2; // Update the recent score
                    money += 50;
                    recentMoney += 50; // Update the recent money
                    document.getElementById("score-counter")
                        .style.display = "block";
                    document.getElementById("score-counter")
                        .innerHTML = "+" + recentScore;
                    document.getElementById("score-value")
                        .innerHTML = score;
                    document.getElementById("money-popup")
                        .style.display = "block";
                    document.getElementById("money-popup")
                        .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;
                    document.getElementById("money-popup")
                        .style.display = "block";

                }
                else {
                    score++;
                    document.getElementById("score-value")
                        .innerHTML = score;
                    recentScore++; // Update the recent score
                    money += 35;
                    recentMoney += 35; // Update the recent money
                    document.getElementById("score-counter")
                        .style.display = "block";
                    document.getElementById("score-counter")
                        .innerHTML = "+" + recentScore;
                    document.getElementById("score-value")
                        .innerHTML = score;
                    document.getElementById("money-popup")
                        .style.display = "block";
                    document.getElementById("money-popup")
                        .innerHTML = '<i class="fa-solid fa-money-bill-1-wave"></i> +' + recentMoney;
                    document.getElementById("money-popup")
                        .style.display = "block";

                }
                scene.remove(enemy);
            }
            for (let enemyBullet of enemyBullets) {
                scene.remove(enemyBullet);
            }
            enemies = [];
            enemyBullets = [];


            //add shake effect
            document.body.classList.add("shake");
            setTimeout(() => {
                document.body.classList.remove("shake");
            }, 1000);
            nukeActive = false;
        }, 2000);
    }


    //=======================================================>>>>>>>>>>>>>> Inventory CODE + Shop Logic
    //
    //
    //INVENTORY VARIABLES ====>>>>>>>>
    //
    //
    inventorySlot1 = document.getElementById("inventory-slot-1");
    inventorySlot2 = document.getElementById("inventory-slot-2");
    inventorySlot3 = document.getElementById("inventory-slot-3");
    inventorySlot4 = document.getElementById("inventory-slot-4");
    inventorySlot5 = document.getElementById("inventory-slot-5");
    //POWERUPS VARIABLES ====>>>>>>>>
    //
    //
    // ========================>>>>>>>>
    const nukeCost = 2500;
    const nukeDuration = 2500 //animation duration
        // ========================>>>>>>>>
    const megaJumpCost = 1550;
    const megaJumpDuration = 10000;
    const megaJumpCooldown = 15000;
    let hasBoughtMegaJump = false;
    // ========================>>>>>>>>
    const liquifyingBulletsCost = 5000;
    const liquifyingBulletsCooldown = 60000;
    const liquifyingBulletsDuration = 30000;
    let hasBoughtLiquifyingBullets = false;
    // ========================>>>>>>>>
    const stealthCost = 1200;
    const stealthDuration = 5000;
    const stealthCooldown = 30000;
    let hasBoughtStealth = false;
    // ========================>>>>>>>>
    const shieldCost = 750;
    const shieldDuration = 1000 //animation duration
        // ========================>>>>>>>>
        //
        //
    const inventory = [];
    //
    //
    //POWERUPS LOGIC ====>>>>>>>>
    //
    //
    document.addEventListener("keydown", (event) => {
        if (isPaused) return;
        if (gameOver) return;
        //
        //
        if (event.key === "1") {
            if (!inventory.includes("nuke")) {
                inventorySlot1.classList.add("shake");
                setTimeout(() => {
                    inventorySlot1.classList.remove("shake");
                }, 1000);
                return;
            }

            inventorySlot1.classList.add("inventoryActive");
            inventorySlot1.classList.remove("inventoryAvaliable");


            nuke();

            inventory.splice(inventory.indexOf("nuke"), 1);


            nukeBuy.value = "Buy";
            document.getElementById("nuke")
                .classList.remove("inventoryBought");



            setTimeout(() => {
                inventorySlot1.style.backgroundColor = "rgba(255, 255, 255, 0.216);"
                inventorySlot1.classList.remove("inventoryActive");
            }, nukeDuration);
        }
        else if (event.key === "1" && nukeActive) {
            inventorySlot1.classList.add("shake");
            setTimeout(() => {
                inventorySlot1.classList.remove("shake");
            }, 1500);
        }
        //
        //
        if (event.key === "2" && !megaJump) {
            if (!inventory.includes("megaJump")) {
                inventorySlot2.classList.add("shake");
                setTimeout(() => {
                    inventorySlot2.classList.remove("shake");
                }, 1000);
                return;
            }

            inventorySlot2.classList.remove("inventoryCooldown");
            inventorySlot2.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
            inventorySlot2.classList.add("inventoryActive");
            inventorySlot2.classList.remove("inventoryAvaliable");

            megaJump = true;
            inventory.splice(inventory.indexOf("megaJump"), 1);

            if (hasBoughtMegaJump) {
                megaJumpBuy.value = "Purchased";
            }

            megaJumpBuy.style.backgroundColor = "#4CAF50";

            setTimeout(() => {
                inventorySlot2.style.backgroundColor = "rgba(255, 255, 255, 0.216);"
                megaJump = false;
                inventorySlot2.classList.remove("inventoryActive");
                inventorySlot2.innerHTML = '<i class="fa-solid fa-clock"></i>';
                inventorySlot2.classList.add('inventoryCooldown');
                megaJumpTimeoutId = setTimeout(() => {
                    if (hasBoughtMegaJump) {
                        // add mega jump back to inventory
                        inventory.push("megaJump");
                        inventorySlot2.classList.add("inventoryAvaliable");
                    }
                    inventorySlot2.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
                    inventorySlot2.classList.remove('inventoryCooldown');
                }, megaJumpCooldown);
            }, megaJumpDuration);
        }
        else if (event.key === "2" && megaJump) {
            inventorySlot2.classList.add("shake");
            setTimeout(() => {
                inventorySlot2.classList.remove("shake");
            }, 1500);
        }
        if (event.key === "3") {
            if (!inventory.includes("liquifyingBullets")) {
                inventorySlot3.classList.add("shake");
                setTimeout(() => {
                    inventorySlot3.classList.remove("shake");
                }, 1000);
                return;
            }

            inventorySlot3.classList.remove("inventoryCooldown");
            inventorySlot3.innerHTML = '<i class="fa-solid fa-fire"></i>';
            inventorySlot3.classList.add("inventoryActive");
            inventorySlot3.classList.remove("inventoryAvaliable");

            liquifyingBullets = true;
            inventory.splice(inventory.indexOf("liquifyingBullets"), 1);

            if (hasBoughtLiquifyingBullets) {
                liquifyingBulletsBuy.value = "Purchased";
            }

            liquifyingBulletsBuy.style.backgroundColor = "#4CAF50";

            setTimeout(() => {
                inventorySlot3.style.backgroundColor = "rgba(255, 255, 255, 0.216);"
                liquifyingBullets = false;
                inventorySlot3.classList.remove("inventoryActive");
                inventorySlot3.innerHTML = '<i class="fa-solid fa-clock"></i>';
                inventorySlot3.classList.add('inventoryCooldown');
                liquifyingBulletsTimeoutId = setTimeout(() => {
                    if (hasBoughtLiquifyingBullets) {
                        // add liquifying bullets back to inventory
                        inventory.push("liquifyingBullets");
                        inventorySlot3.classList.add("inventoryAvaliable");
                    }
                    inventorySlot3.innerHTML = '<i class="fa-solid fa-fire"></i>';
                    inventorySlot3.classList.remove('inventoryCooldown');
                }, liquifyingBulletsCooldown);
            }, liquifyingBulletsDuration);
        }
        else if (event.key === "3" && liquifyingBullets) {
            inventorySlot3.classList.add("shake");
            setTimeout(() => {
                inventorySlot3.classList.remove("shake");
            }, 1500);
        }
        //
        //
        if (event.key === "4") {
            if (!inventory.includes("stealth")) {
                inventorySlot4.classList.add("shake");
                setTimeout(() => {
                    inventorySlot4.classList.remove("shake");
                }, 1000);
                return;
            }

            inventorySlot4.classList.remove("inventoryCooldown");
            inventorySlot4.innerHTML = '<i class="fa-solid fa-user-ninja"></i>';
            inventorySlot4.classList.add("inventoryActive");
            inventorySlot4.classList.remove("inventoryAvaliable");

            stealth = true;
            inventory.splice(inventory.indexOf("stealth"), 1);

            if (hasBoughtStealth) {
                stealthBuy.value = "Purchased";
            }

            stealthBuy.style.backgroundColor = "#4CAF50";

            setTimeout(() => {
                inventorySlot4.style.backgroundColor = "rgba(255, 255, 255, 0.216);"
                stealth = false;
                inventorySlot4.classList.remove("inventoryActive");
                inventorySlot4.innerHTML = '<i class="fa-solid fa-clock"></i>';
                inventorySlot4.classList.add('inventoryCooldown');
                stealthTimeoutId = setTimeout(() => {
                    if (hasBoughtStealth) {
                        // add liquifying bullets back to inventory
                        inventory.push("stealth");
                        inventorySlot4.classList.add("inventoryAvaliable");
                    }
                    inventorySlot4.innerHTML = '<i class="fa-solid fa-user-ninja"></i>';
                    inventorySlot4.classList.remove('inventoryCooldown');
                }, stealthCooldown);
            }, stealthDuration);
        }
        else if (event.key === "4" && stealth) {
            inventorySlot4.classList.add("shake");
            setTimeout(() => {
                inventorySlot4.classList.remove("shake");
            }, 1500);
        }
        //
        //

        if (event.key === "5") {
            if (!inventory.includes("shield") || health == maxHealth) {
                inventorySlot5.classList.add("shake");
                setTimeout(() => {
                    inventorySlot5.classList.remove("shake");
                }, 1000);
                return;
            }

            inventorySlot5.classList.add("inventoryActive");
            inventorySlot5.classList.remove("inventoryAvaliable");
            inventorySlot5.classList.remove("inventoryBought");

            shield = true;
            health = maxHealth;
            inventory.splice(inventory.indexOf("shield"), 1);


            shieldBuy.value = "Buy";
            document.getElementById("shield")
                .classList.remove("inventoryBought");



            setTimeout(() => {
                inventorySlot5.style.backgroundColor = "rgba(255, 255, 255, 0.216);"
                inventorySlot5.classList.remove("inventoryActive");
            }, shieldDuration);
        }
        else if (event.key === "5" && shieldActive) {
            inventorySlot5.classList.add("shake");
            setTimeout(() => {
                inventorySlot5.classList.remove("shake");
            }, 1500);
        }


    });


    //POWERUPS BUTTONS ====>>>>>>>>
    //
    //
    const nukeBuy = document.getElementById("buyNuke");
    const megaJumpBuy = document.getElementById("buyMegaJump");
    const liquifyingBulletsBuy = document.getElementById("buyLiquifyingBullets");
    const stealthBuy = document.getElementById("buyStealth");
    const shieldBuy = document.getElementById("buyShield");
    //
    //
    //POWERUPS BUTTONS LOGIC ====>>>>>>>>
    //
    //
    //
    nukeBuy.addEventListener("click", () => {


        if (inventorySlot1.classList.contains("inventoryAvaliable")) {
            nukeBuy.value = "Already Purchased";
            nukeBuy.style.backgroundColor = "red";
            document.getElementById("nuke")
                .classList.add("shake");
            setTimeout(() => {
                nukeBuy.value = "Purchased";
                nukeBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("nuke")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (money >= nukeCost) {
            money -= nukeCost;
            if (!inventory.includes("nuke")) {
                inventory.push("nuke");
            }
            inventorySlot1.classList.add("inventoryAvaliable");
            nukeBuy.value = "Purchased";
            document.getElementById("nuke")
                .classList.add("inventoryBought");

            document.getElementById("money-count")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            document.getElementById("shopMoneyCount")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }
        else {
            nukeBuy.style.backgroundColor = "red";
            nukeBuy.classList.add("shake");
            nukeBuy.value = "Not Enough Money";
            setTimeout(() => {
                nukeBuy.style.backgroundColor = "#4CAF50";
                nukeBuy.classList.remove("shake");
                if (inventorySlot5.classList.contains("inventoryAvaliable")) {
                    nukeBuy.value = "Purchased";
                }
                else {
                    nukeBuy.value = "Buy";
                }
            }, 1000);
        }
    });
    //
    //

    megaJumpBuy.addEventListener("click", () => {
        if (megaJump) {
            megaJumpBuy.value = "Please Wait";
            megaJumpBuy.style.backgroundColor = "red";
            document.getElementById("mega-jump")
                .classList.add("shake");
            setTimeout(() => {
                if (hasBoughtMegaJump) {
                    megaJumpBuy.value = "Purchased";
                }
                else {
                    megaJumpBuy.value = "Buy";
                }
                megaJumpBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("mega-jump")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (hasBoughtMegaJump) {
            megaJumpBuy.value = "Already Purchased";
            megaJumpBuy.style.backgroundColor = "red";
            document.getElementById("mega-jump")
                .classList.add("shake");
            setTimeout(() => {
                megaJumpBuy.value = "Purchased";
                megaJumpBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("mega-jump")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (money >= megaJumpCost) {
            inventorySlot2.classList.remove("inventoryCooldown");
            inventorySlot2.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
            money -= megaJumpCost;
            hasBoughtMegaJump = true;

            if (!inventory.includes("megaJump")) {
                inventory.push("megaJump");
            }

            inventorySlot2.classList.add("inventoryAvaliable");
            megaJumpBuy.value = "Purchased";
            document.getElementById("mega-jump")
                .classList.add("inventoryBought");

            document.getElementById("money-count")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            document.getElementById("shopMoneyCount")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }
        else {
            megaJumpBuy.style.backgroundColor = "red";
            megaJumpBuy.classList.add("shake");
            megaJumpBuy.value = "Not Enough Money";
            setTimeout(() => {
                megaJumpBuy.style.backgroundColor = "#4CAF50";
                megaJumpBuy.classList.remove("shake");
                if (hasBoughtMegaJump) {
                    megaJumpBuy.value = "Purchased";
                }
                else {
                    megaJumpBuy.value = "Buy";
                }
            }, 1000);
        }
    });

    liquifyingBulletsBuy.addEventListener("click", () => {
        if (liquifyingBullets) {
            liquifyingBulletsBuy.value = "Please Wait";
            liquifyingBulletsBuy.style.backgroundColor = "red";
            document.getElementById("liquifying-bullets")
                .classList.add("shake");
            setTimeout(() => {
                if (hasBoughtLiquifyingBullets) {
                    liquifyingBulletsBuy.value = "Purchased";
                }
                else {
                    liquifyingBulletsBuy.value = "Buy";
                }
                liquifyingBulletsBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("liquifying-bullets")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (hasBoughtLiquifyingBullets) {
            liquifyingBulletsBuy.value = "Already Purchased";
            liquifyingBulletsBuy.style.backgroundColor = "red";
            document.getElementById("liquifying-bullets")
                .classList.add("shake");
            setTimeout(() => {
                liquifyingBulletsBuy.value = "Purchased";
                liquifyingBulletsBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("liquifying-bullets")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (money >= liquifyingBulletsCost) {
            money -= liquifyingBulletsCost;
            hasBoughtLiquifyingBullets = true;

            if (!inventory.includes("liquifyingBullets")) {
                inventory.push("liquifyingBullets");
            }

            inventorySlot3.classList.add("inventoryAvaliable");
            liquifyingBulletsBuy.value = "Purchased";
            document.getElementById("liquifying-bullets")
                .classList.add("inventoryBought");

            document.getElementById("money-count")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            document.getElementById("shopMoneyCount")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }
        else {
            liquifyingBulletsBuy.style.backgroundColor = "red";
            liquifyingBulletsBuy.classList.add("shake");
            liquifyingBulletsBuy.value = "Not Enough Money";
            setTimeout(() => {
                liquifyingBulletsBuy.style.backgroundColor = "#4CAF50";
                liquifyingBulletsBuy.classList.remove("shake");
                if (hasBoughtLiquifyingBullets) {
                    liquifyingBulletsBuy.value = "Purchased";
                }
                else {
                    liquifyingBulletsBuy.value = "Buy";
                }
            }, 1000);
        }
    });

    stealthBuy.addEventListener("click", () => {
        if (stealth) {
            stealthBuy.value = "Please Wait";
            stealthBuy.style.backgroundColor = "red";
            document.getElementById("stealth")
                .classList.add("shake");
            setTimeout(() => {
                if (hasBoughtStealth) {
                    stealthBuy.value = "Purchased";
                }
                else {
                    stealthBuy.value = "Buy";
                }
                stealthBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("stealth")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (hasBoughtStealth) {
            stealthBuy.value = "Already Purchased";
            stealthBuy.style.backgroundColor = "red";
            document.getElementById("stealth")
                .classList.add("shake");
            setTimeout(() => {
                stealthBuy.value = "Purchased";
                stealthBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("stealth")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (money >= stealthCost) {
            money -= stealthCost;
            hasBoughtStealth = true;

            if (!inventory.includes("stealth")) {
                inventory.push("stealth");
            }

            inventorySlot4.classList.add("inventoryAvaliable");
            stealthBuy.value = "Purchased";
            document.getElementById("stealth")
                .classList.add("inventoryBought");

            document.getElementById("money-count")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            document.getElementById("shopMoneyCount")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }
        else {
            stealthBuy.style.backgroundColor = "red";
            stealthBuy.classList.add("shake");
            stealthBuy.value = "Not Enough Money";
            setTimeout(() => {
                stealthBuy.style.backgroundColor = "#4CAF50";
                stealthBuy.classList.remove("shake");
                if (hasBoughtStealth) {
                    stealthBuy.value = "Purchased";
                }
                else {
                    stealthBuy.value = "Buy";
                }
            }, 1000);
        }
    });




    shieldBuy.addEventListener("click", () => {


        if (inventorySlot5.classList.contains("inventoryAvaliable")) {
            shieldBuy.value = "Already Purchased";
            shieldBuy.style.backgroundColor = "red";
            document.getElementById("shield")
                .classList.add("shake");
            setTimeout(() => {
                shieldBuy.value = "Purchased";
                shieldBuy.style.backgroundColor = "#4CAF50";
                document.getElementById("shield")
                    .classList.remove("shake");
            }, 1000);
            return;
        }

        if (money >= shieldCost) {
            money -= shieldCost;
            if (!inventory.includes("shield")) {
                inventory.push("shield");
            }
            inventorySlot5.classList.add("inventoryAvaliable");
            shieldBuy.value = "Purchased";
            document.getElementById("shield")
                .classList.add("inventoryBought");

            document.getElementById("money-count")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            document.getElementById("shopMoneyCount")
                .innerHTML = "$" + money.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
        }
        else {
            shieldBuy.style.backgroundColor = "red";
            shieldBuy.classList.add("shake");
            shieldBuy.value = "Not Enough Money";
            setTimeout(() => {
                shieldBuy.style.backgroundColor = "#4CAF50";
                shieldBuy.classList.remove("shake");
                if (inventorySlot5.classList.contains("inventoryAvaliable")) {
                    shieldBuy.value = "Purchased";
                }
                else {
                    shieldBuy.value = "Buy";
                }
            }, 1000);
        }
    });
    //
    //
    //
    //
    //OTHER SHOP BUY CODE:
    const buyExtendedAmmo = document.getElementById("buyExtendedAmmo");
    let ammoLevel = 1;
    let extendedAmmoCost = 550;
    let maxAmmoLevel = false;
    //
    //
    const buyMoreDamage = document.getElementById("buyMoreDamage");
    let damageLevel = 1;
    let moreDamageCost = 230;
    let maxDamageLevel = false;
    //
    //
    const buyFasterMovement = document.getElementById("buyFasterMovement");
    let movementLevel = 1;
    let fasterMovementCost = 500;
    let maxMovementLevel = false;
    //
    //
    const buyMoreHealth = document.getElementById("buyMoreHealth");
    let healthLevel = 1;
    let moreHealthCost = 1000;
    let maxHealthLevel = false;
    //
    //
    buyExtendedAmmo.addEventListener("click", () => {

        if (maxAmmoLevel) {
            buyExtendedAmmo.classList.add("shake");
            buyExtendedAmmo.style.backgroundColor = "red";
            buyExtendedAmmo.value = "Max Level";
            setTimeout(() => {
                buyExtendedAmmo.classList.remove("shake");
                buyExtendedAmmo.style.backgroundColor = "#4CAF50";
            }, 1000);
        }
        if (money < extendedAmmoCost) {
            buyExtendedAmmo.classList.add("shake");
            buyExtendedAmmo.style.backgroundColor = "red";
            buyExtendedAmmo.value = "Not Enough Money";
            setTimeout(() => {
                buyExtendedAmmo.classList.remove("shake");
                buyExtendedAmmo.style.backgroundColor = "#4CAF50";
                buyExtendedAmmo.value = "Buy";
            }, 1000);
            return;
        }
        if (ammoLevel == 1) {
            if (money >= extendedAmmoCost) {
                money -= extendedAmmoCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                ammoLevel = 2;
                maxAmmo = 13;
                document.getElementById("currentAmmo")
                    .innerHTML = maxAmmo;
                document.getElementById("ammoLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                extendedAmmoCost += 550;
                document.getElementById("shopAmmoCost")
                    .innerHTML = "$" + extendedAmmoCost;
                document.getElementById("shopUpgradeAmmoCount")
                    .innerHTML = "+7:";
                buyExtendedAmmo.value = "Purchased"
                setTimeout(() => {
                    buyExtendedAmmo.value = "Buy";
                }, 500);
            }
        }
        else if (ammoLevel == 2) {
            if (money >= extendedAmmoCost) {
                money -= extendedAmmoCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                ammoLevel = 3;
                maxAmmo = 20;
                document.getElementById("currentAmmo")
                    .innerHTML = maxAmmo;
                document.getElementById("ammoLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                extendedAmmoCost += 1550;
                document.getElementById("shopAmmoCost")
                    .innerHTML = "$" + extendedAmmoCost;
                document.getElementById("shopUpgradeAmmoCount")
                    .innerHTML = "+10:";
                buyExtendedAmmo.value = "Purchased"
                setTimeout(() => {
                    buyExtendedAmmo.value = "Buy";
                }, 500);
            }
        }
        else if (ammoLevel == 3) {
            if (money >= extendedAmmoCost) {
                money -= extendedAmmoCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                ammoLevel = 4;
                maxAmmo = 30;
                document.getElementById("currentAmmo")
                    .innerHTML = maxAmmo;
                document.getElementById("ammoLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                extendedAmmoCost += 2550;
                document.getElementById("shopAmmoCost")
                    .innerHTML = "$" + extendedAmmoCost;
                document.getElementById("shopUpgradeAmmoCount")
                    .innerHTML = "+15:";
                buyExtendedAmmo.value = "Purchased"
                setTimeout(() => {
                    buyExtendedAmmo.value = "Buy";
                }, 500);
            }
        }
        else if (ammoLevel == 4) {
            if (money >= extendedAmmoCost) {
                money -= extendedAmmoCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                ammoLevel = 5;
                maxAmmo = 45;
                document.getElementById("currentAmmo")
                    .innerHTML = maxAmmo;
                document.getElementById("ammoLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                document.getElementById("ammoLevel")
                    .style.color = "gold";

                document.getElementById("shopAmmoCost")
                    .innerHTML = "";
                document.getElementById("shopUpgradeAmmoCount")
                    .innerHTML = "";
                document.getElementById("more-ammo")
                    .style.color = "gold";
                buyExtendedAmmo.value = "Max Level"
                maxAmmoLevel = true;
                document.getElementById("more-ammo")
                    .classList.add("shopMaxLevel");
                setTimeout(() => {
                    buyExtendedAmmo.value = "Max Level";

                }, 1000);

            }
        }
    });

    buyMoreDamage.addEventListener("click", () => {

        if (maxDamageLevel) {
            buyMoreDamage.classList.add("shake");
            buyMoreDamage.style.backgroundColor = "red";
            buyMoreDamage.value = "Max Level";
            setTimeout(() => {
                buyMoreDamage.classList.remove("shake");
                buyMoreDamage.style.backgroundColor = "#4CAF50";
            }, 1000);
        }
        if (money < moreDamageCost) {
            buyMoreDamage.style.backgroundColor = "red";
            buyMoreDamage.classList.add("shake");
            buyMoreDamage.value = "Not Enough Money";
            setTimeout(() => {
                buyMoreDamage.style.backgroundColor = "#4CAF50";
                buyMoreDamage.classList.remove("shake");
                if (damageLevel == 1) {
                    buyMoreDamage.value = "Buy";
                }
                else if (damageLevel == 2) {
                    buyMoreDamage.value = "Buy";
                }
                else if (damageLevel == 3) {
                    buyMoreDamage.value = "Buy";
                }
                else if (damageLevel == 4) {
                    buyMoreDamage.value = "Buy";
                }
            }, 1000);
        }
        if (damageLevel == 1) {
            if (money >= moreDamageCost) {
                money -= moreDamageCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                damageLevel = 2;
                bulletDammage = 12;
                document.getElementById("currentDamage")
                    .innerHTML = bulletDammage;
                document.getElementById("damageLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                moreDamageCost += 230;
                document.getElementById("shopDamageCost")
                    .innerHTML = "$" + moreDamageCost;
                document.getElementById("shopUpgradeDamageCount")
                    .innerHTML = "+3:";
                buyMoreDamage.value = "Purchased"
                setTimeout(() => {
                    buyMoreDamage.value = "Buy";
                }, 500);
            }
        }
        else if (damageLevel == 2) {
            if (money >= moreDamageCost) {
                money -= moreDamageCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                damageLevel = 3;
                bulletDammage = 15;
                document.getElementById("currentDamage")
                    .innerHTML = bulletDammage;
                document.getElementById("damageLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                moreDamageCost += 750;
                document.getElementById("shopDamageCost")
                    .innerHTML = "$" + moreDamageCost;
                document.getElementById("shopUpgradeDamageCount")
                    .innerHTML = "+4:";
                buyMoreDamage.value = "Purchased"
                setTimeout(() => {
                    buyMoreDamage.value = "Buy";
                }, 500);
            }
        }
        else if (damageLevel == 3) {
            if (money >= moreDamageCost) {
                money -= moreDamageCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                damageLevel = 4;
                bulletDammage = 19;
                document.getElementById("currentDamage")
                    .innerHTML = bulletDammage;
                document.getElementById("damageLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                moreDamageCost += 1500;
                document.getElementById("shopDamageCost")
                    .innerHTML = "$" + moreDamageCost;
                document.getElementById("shopUpgradeDamageCount")
                    .innerHTML = "+5:";
                buyMoreDamage.value = "Purchased"
                setTimeout(() => {
                    buyMoreDamage.value = "Buy";
                }, 500);
            }
        }
        else if (damageLevel == 4) {
            if (money >= moreDamageCost) {
                money -= moreDamageCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                damageLevel = 5;
                bulletDammage = 24;
                document.getElementById("currentDamage")
                    .innerHTML = bulletDammage;
                document.getElementById("damageLevel")
                    .innerHTML += '<i class="fa-solid fa-star"></i>'
                document.getElementById("shopDamageCost")
                    .innerHTML = "";
                document.getElementById("shopUpgradeDamageCount")
                    .innerHTML = "";
                buyMoreDamage.value = "Max Level"
                maxDamageLevel = true;
                document.getElementById("more-damage")
                    .style.color = "gold";
                document.getElementById("more-damage")
                    .classList.add("shopMaxLevel");
                setTimeout(() => {
                    buyMoreDamage.value = "Max Level";

                }, 1000);
            }
        }

    });
    buyFasterMovement.addEventListener("click", () => {

        if (maxMovementLevel) {
            buyFasterMovement.classList.add("shake");
            buyFasterMovement.style.backgroundColor = "red";
            buyFasterMovement.value = "Max Level";
            setTimeout(() => {
                buyFasterMovement.classList.remove("shake");
                buyFasterMovement.style.backgroundColor = "#4CAF50";
            }, 1000);
        }
        if (money < fasterMovementCost) {
            buyFasterMovement.style.backgroundColor = "red";
            buyFasterMovement.classList.add("shake");
            buyFasterMovement.value = "Not Enough Money";
            setTimeout(() => {
                buyFasterMovement.style.backgroundColor = "#4CAF50";
                buyFasterMovement.classList.remove("shake");
                if (maxMovementLevel) {
                    buyFasterMovement.value = "Max Level";
                }
                else {
                    buyFasterMovement.value = "Buy";
                }
            }, 1000);
            return;
        }
        if (movementLevel == 1) {
            if (money >= fasterMovementCost) {
                money -= fasterMovementCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                maxSpeed = 0.09
                dashSpeed = maxSpeed + 0.18
                movementLevel = 2;
                fasterMovementCost += 1550;
                document.getElementById("movementLevel")
                    .innerHTML += '<i class="fa-solid fa-person-running"></i>'
                document.getElementById("currentMovement")
                    .innerHTML = maxSpeed;
                document.getElementById("shopFasterMovementCost")
                    .innerHTML = "$" + fasterMovementCost;
                document.getElementById("shopUpgradeFasterMovementCount")
                    .innerHTML = "+0.05:";
                buyFasterMovement.value = "Purchased"
                setTimeout(() => {
                    buyFasterMovement.value = "Buy";
                }, 500);
            }
        }
        else if (movementLevel == 2) {
            if (money >= fasterMovementCost) {
                money -= fasterMovementCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                maxSpeed = 0.14
                dashSpeed = maxSpeed + 0.18
                movementLevel = 3;
                fasterMovementCost += 2550;
                document.getElementById("movementLevel")
                    .innerHTML += '<i class="fa-solid fa-person-running"></i>'
                document.getElementById("currentMovement")
                    .innerHTML = maxSpeed;
                document.getElementById("shopFasterMovementCost")
                    .innerHTML = "$" + fasterMovementCost;
                document.getElementById("shopUpgradeFasterMovementCount")
                    .innerHTML = "+0.03:";
                buyFasterMovement.value = "Purchased"
                setTimeout(() => {
                    buyFasterMovement.value = "Buy";
                }, 500);
            }
        }
        else if (movementLevel == 3) {
            if (money >= fasterMovementCost) {
                money -= fasterMovementCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                maxSpeed = 0.17
                dashSpeed = maxSpeed + 0.18
                movementLevel = 4;
                fasterMovementCost += 3550;
                document.getElementById("movementLevel")
                    .innerHTML += '<i class="fa-solid fa-person-running"></i>'
                document.getElementById("currentMovement")
                    .innerHTML = maxSpeed;
                document.getElementById("shopFasterMovementCost")
                    .innerHTML = "$" + fasterMovementCost;
                document.getElementById("shopUpgradeFasterMovementCount")
                    .innerHTML = "+0.03:";
                buyFasterMovement.value = "Purchased"
                setTimeout(() => {
                    buyFasterMovement.value = "Buy";
                }, 500);
            }
        }
        else if (movementLevel == 4) {
            if (money >= fasterMovementCost) {
                money -= fasterMovementCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });

                maxSpeed = 0.2
                dashSpeed = maxSpeed + 0.18
                movementLevel = 5;
                document.getElementById("movementLevel")
                    .innerHTML += '<i class="fa-solid fa-person-running"></i>'
                document.getElementById("currentMovement")
                    .innerHTML = maxSpeed;
                document.getElementById("shopFasterMovementCost")
                    .innerHTML = " ";
                document.getElementById("shopUpgradeFasterMovementCount")
                    .innerHTML = " ";
                buyFasterMovement.value = "Max Level"
                maxMovementLevel = true;
                document.getElementById("faster-movement")
                    .style.color = "gold";
                document.getElementById("faster-movement")
                    .classList.add("shopMaxLevel");
                setTimeout(() => {
                    buyFasterMovement.value = "Max Level";

                }, 1000);
            }
        }

    });


    buyMoreHealth.addEventListener("click", () => {

        if (maxHealthLevel) {
            buyMoreHealth.classList.add("shake");
            buyMoreHealth.style.backgroundColor = "red";
            buyMoreHealth.value = "Max Level";
            setTimeout(() => {
                buyMoreHealth.classList.remove("shake");
                buyMoreHealth.style.backgroundColor = "#4CAF50";
            }, 1000);
        }
        if (money < moreHealthCost) {
            buyMoreHealth.style.backgroundColor = "red";
            buyMoreHealth.classList.add("shake");
            buyMoreHealth.value = "Not Enough Money";
            setTimeout(() => {
                buyMoreHealth.style.backgroundColor = "#4CAF50";
                buyMoreHealth.classList.remove("shake");
                if (maxHealthLevel) {
                    buyMoreHealth.value = "Max Level";
                }
                else {
                    buyMoreHealth.value = "Buy";
                }
            }, 1000);
            return;
        }
        if (healthLevel == 1) {
            if (money >= moreHealthCost) {
                money -= moreHealthCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                healthLevel = 2;
                health = 125;
                maxHealth = 125;
                document.getElementById("currentHealth")
                    .innerHTML = maxHealth;
                document.getElementById("healthLevel")
                    .innerHTML += '<i class="fa-solid fa-heart"></i>'
                moreHealthCost += 1250;
                document.getElementById("shopHealthCost")
                    .innerHTML = "$" + moreHealthCost;
                document.getElementById("shopHealthCount")
                    .innerHTML = "+25:";
                buyMoreHealth.value = "Purchased";
                updateHealth();
                setTimeout(() => {
                    buyMoreHealth.value = "Buy";
                }, 500);
            }
        }
        else if (healthLevel == 2) {
            if (money >= moreHealthCost) {
                money -= moreHealthCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                healthLevel = 3;
                health = 150;
                maxHealth = 150;
                document.getElementById("currentHealth")
                    .innerHTML = maxHealth;
                document.getElementById("healthLevel")
                    .innerHTML += '<i class="fa-solid fa-heart"></i>'
                moreHealthCost += 1350
                document.getElementById("shopHealthCost")
                    .innerHTML = "$" + moreHealthCost;
                document.getElementById("shopHealthCount")
                    .innerHTML = "+25:";
                buyMoreHealth.value = "Purchased";
                updateHealth();
                setTimeout(() => {
                    buyMoreHealth.value = "Buy";
                }, 500);
            }
        }
        else if (healthLevel == 3) {
            if (money >= moreHealthCost) {
                money -= moreHealthCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                healthLevel = 4;
                health = 175;
                maxHealth = 175;
                document.getElementById("currentHealth")
                    .innerHTML = maxHealth;
                document.getElementById("healthLevel")
                    .innerHTML += '<i class="fa-solid fa-heart"></i>'
                moreHealthCost += 1550
                document.getElementById("shopHealthCost")
                    .innerHTML = "$" + moreHealthCost;
                document.getElementById("shopHealthCount")
                    .innerHTML = "+50:";
                buyMoreHealth.value = "Purchased";
                updateHealth();
                setTimeout(() => {
                    buyMoreHealth.value = "Buy";
                }, 500);
            }
        }
        else if (healthLevel == 4) {
            if (money >= moreHealthCost) {
                money -= moreHealthCost;
                document.getElementById("money-count")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                document.getElementById("shopMoneyCount")
                    .innerHTML = "$" + money.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                healthLevel = 5;
                health = 225;
                maxHealth = 225;
                document.getElementById("currentHealth")
                    .innerHTML = maxHealth;
                document.getElementById("healthLevel")
                    .innerHTML += '<i class="fa-solid fa-heart"></i>'
                document.getElementById("shopHealthCost")
                    .innerHTML = ""
                document.getElementById("shopHealthCount")
                    .innerHTML = "";
                document.getElementById("more-health")
                    .style.color = "gold";
                document.getElementById("more-health")
                    .classList.add("shopMaxLevel");
                buyMoreHealth.value = "Max Level";
                updateHealth();
                setTimeout(() => {
                    buyMoreHealth.value = "Max Level";

                }, 1000);

            }
        }

    });


    const dayRewardAmmo = document.getElementById("dayRewardAmmo");
    const dayRewardHealth = document.getElementById("dayRewardHealth");
    const dayRewardDamage = document.getElementById("dayRewardDamage");
    const dayRewardMovement = document.getElementById("dayRewardMovement");

    dayRewardAmmo.addEventListener("click", () => {
        if (dayReward == false) {
            dayRewardAmmo.classList.add("dayRewardClaimed");
            document.getElementById("dayRewardAmmoText")
                .innerHTML = ' <i class="fa-solid fa-check"></i> Claimed';
            maxAmmo = 13;
            ammoCount = 13;
            document.getElementById("currentAmmo")
                .innerHTML = maxAmmo;
            document.getElementById("ammoLevel")
                .innerHTML += '<i class="fa-solid fa-star"></i>'
            extendedAmmoCost += 550;
            document.getElementById("shopAmmoCost")
                .innerHTML = "$" + extendedAmmoCost;
            document.getElementById("shopUpgradeAmmoCount")
                .innerHTML = "+7:";
            buyExtendedAmmo.value = "Purchased"
            setTimeout(() => {
                buyExtendedAmmo.value = "Buy";
            }, 500);
            dayReward = true;
            ammoLevel = 2;
            //disable ALL other day rewards
            dayRewardHealth.classList.add("rewardDisabled");
            dayRewardDamage.classList.add("rewardDisabled");
            dayRewardMovement.classList.add("rewardDisabled");
        }
    });
    dayRewardHealth.addEventListener("click", () => {
        if (dayReward == false) {
            dayRewardHealth.classList.add("dayRewardClaimed");
            document.getElementById("dayRewardHealthText")
                .innerHTML = ' <i class="fa-solid fa-check"></i> Claimed';
            health = 125;
            maxHealth = 125;
            document.getElementById("currentHealth")
                .innerHTML = maxHealth;
            document.getElementById("healthLevel")
                .innerHTML += '<i class="fa-solid fa-heart"></i>'
            moreHealthCost += 1250;
            document.getElementById("shopHealthCost")
                .innerHTML = "$" + moreHealthCost;
            document.getElementById("shopHealthCount")
                .innerHTML = "+25:";
            buyMoreHealth.value = "Purchased";
            healthLevel = 2;
            updateHealth();
            setTimeout(() => {
                buyMoreHealth.value = "Buy";
            }, 500);
            dayReward = true;
            //disable ALL other day rewards
            dayRewardAmmo.classList.add("rewardDisabled");
            dayRewardDamage.classList.add("rewardDisabled");
            dayRewardMovement.classList.add("rewardDisabled");
        }
    });
    dayRewardDamage.addEventListener("click", () => {
        if (dayReward == false) {
            dayRewardDamage.classList.add("dayRewardClaimed");
            document.getElementById("dayRewardDamageText")
                .innerHTML = ' <i class="fa-solid fa-check"></i> Claimed';
            bulletDammage = 12;
            damageLevel = 2;
            document.getElementById("currentDamage")
                .innerHTML = bulletDammage;
            document.getElementById("damageLevel")
                .innerHTML += '<i class="fa-solid fa-star"></i>'
            moreDamageCost += 230;
            document.getElementById("shopDamageCost")
                .innerHTML = "$" + moreDamageCost;
            document.getElementById("shopUpgradeDamageCount")
                .innerHTML = "+3:";
            buyMoreDamage.value = "Purchased"
            setTimeout(() => {
                buyMoreDamage.value = "Buy";
            }, 500);
            dayReward = true;
            //disable ALL other day rewards
            dayRewardAmmo.classList.add("rewardDisabled");
            dayRewardHealth.classList.add("rewardDisabled");
            dayRewardMovement.classList.add("rewardDisabled");
        }
    });
    dayRewardMovement.addEventListener("click", () => {
        if (dayReward == false) {
            dayRewardMovement.classList.add("dayRewardClaimed");
            document.getElementById("dayRewardMovementText")
                .innerHTML = ' <i class="fa-solid fa-check"></i> Claimed';
            maxSpeed = 0.09
            movementLevel = 2;
            dashSpeed = maxSpeed + 0.18
            movementLevel = 2;
            fasterMovementCost += 1550;
            document.getElementById("movementLevel")
                .innerHTML += '<i class="fa-solid fa-person-running"></i>'
            document.getElementById("currentMovement")
                .innerHTML = maxSpeed;
            document.getElementById("shopFasterMovementCost")
                .innerHTML = "$" + fasterMovementCost;
            document.getElementById("shopUpgradeFasterMovementCount")
                .innerHTML = "+0.05:";
            buyFasterMovement.value = "Purchased"
            setTimeout(() => {
                buyFasterMovement.value = "Buy";
            }, 500);
            dayReward = true;
            //disable ALL other day rewards
            dayRewardAmmo.classList.add("rewardDisabled");
            dayRewardHealth.classList.add("rewardDisabled");
            dayRewardDamage.classList.add("rewardDisabled");
        }
    });

}
