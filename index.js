// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAKApYyM5YXbNprLBjy0CdyC6E0v15P0Kw",
  authDomain: "aslprojectloginregister.firebaseapp.com",
  projectId: "aslprojectloginregister",
  storageBucket: "aslprojectloginregister.appspot.com",
  messagingSenderId: "917405783455",
  appId: "1:917405783455:web:b1a54914475685209219aa",
  measurementId: "G-C2DC5T5LW0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  purpose = document.getElementById('purpose').value

  // Validate input fields
  if (validate_email(email) == false)
  {
    alert('Please check your email!!')
      return
      // Don't continue running the code
  }
  else if(validate_password(password) == false) 
  {
    alert('Please check your password!!')
      return
  }
  if (validate_field(full_name) == false || validate_field(role) == false || validate_field(purpose) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
          // Declare user variable
          var user = auth.currentUser;

          // Add this user to Firebase Database
          var database_ref = database.ref();

          // Create User data with both date and time
          var user_data = {
              email: email,
              full_name: full_name,
              role: role,
              purpose: purpose,
              last_login: new Date().toLocaleString() // Include both date and time
          };

          // Push to Firebase Database
          database_ref.child('users/' + user.uid).set(user_data);

          // Done
          alert('User Created!!');
      })
      .catch(function (error) {
          // Firebase will use this to alert of its errors
          var error_code = error.code
          var error_message = error.message

          alert(error_message)
      })
}

// ... (rest of the code remains unchanged)


// Set up our login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) === false || validate_password(password) === false) {
    alert('Email or Password is Outta Line!!');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Retrieve user data from Firebase Database
      var database_ref = database.ref('users/' + user.uid);
      database_ref.once('value', function(snapshot) {
        var userData = snapshot.val();
        var role = userData.role;

        // Redirect based on role
        if (role === 'Doctor') {
          // Redirect to doctor homepage
          window.location.href = "doctor_homepage.html";
        } else if (role === 'Patient') {
          // Redirect to patient homepage
          window.location.href = "homepage.html";
        } else {
          // Handle other roles or scenarios
          alert("Unknown role: " + role);
        }
      });
    })
    .catch(function (error) {
      // Firebase will use this to alert its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}


  




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

function redirect_to_login ()
{
  window.location.href = "login.html";
}
function redirect_to_register ()
{
  window.location.href = "register.html";
}
