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
const auth = firebase.auth();
const database = firebase.database();

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

      var database_ref = database.ref('users/' + user.uid);

      var user_data = {
        email: email,
        full_name: full_name,
        role: role,
        last_login: new Date().toLocaleString()
      };

      database_ref.set(user_data);

      alert('User Created!! You can now login');
      redirect_to_login();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
    });
}

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

function redirect_to_login() {
  window.location.href = "login.html";
}

function redirect_to_register() {
  window.location.href = "register.html";
}
