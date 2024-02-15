// Firebase configuration
var firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Register function
function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var full_name = document.getElementById('full_name').value;
  var role = document.getElementById('role').value;

  if (!validate_email(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!validate_password(password)) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  if (!validate_field(full_name)) {
    alert('Please enter your full name.');
    return;
  }
  if (!validate_field(role)) {
    alert('Please enter your role.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;

      var user_data = {
        email: email,
        full_name: full_name,
        role: role,
        last_login: new Date().toLocaleString()
      };

      database.ref('users/' + user.uid).set(user_data)
        .then(function() {
          alert('User Created!! You can now login');
          redirect_to_login();
        })
        .catch(function(error) {
          alert('Error saving user data: ' + error.message);
        });
    })
    .catch(function (error) {
      alert('Error creating user: ' + error.message);
    });
}

// Login function
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is invalid!');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref('users/' + user.uid);

      database_ref.update({
        last_login: new Date().toLocaleString()
      })
      .then(function() {
        database_ref.once('value')
          .then(function(snapshot) {
            var userData = snapshot.val();
            var role = userData.role;

            if (role === 'Doctor' || role === 'doctor') {
              window.location.href = "doctor_homepage.html";
            } else if (role === 'Patient' || role === 'patient') {
              window.location.href = "homepage.html";
            } else {
              alert("Unknown role: " + role);
            }
          })
          .catch(function(error) {
            alert('Error retrieving user data: ' + error.message);
          });
      })
      .catch(function(error) {
        alert('Error updating last login: ' + error.message);
      });
    })
    .catch(function (error) {
      alert('Error signing in: ' + error.message);
    });
}

// Validation functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field.trim() !== '';
}

// Redirect functions
function redirect_to_login() {
  window.location.href = "login.html";
}

function redirect_to_register() {
  window.location.href = "register.html";
}
