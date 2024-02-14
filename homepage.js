// Retrieve user information from Firebase
const auth = firebase.auth();
const database = firebase.database();
const user = auth.currentUser;

if (user) {
    // User is signed in
    const userId = user.uid;
    const userRef = database.ref('users/' + userId);

    // Retrieve user data from Firebase Database
    userRef.once('value')
        .then(function (snapshot) {
            const userData = snapshot.val();

            // Display user information on the homepage
            document.getElementById('user_name').innerText = 'Welcome, ' + userData.full_name + '!';
            document.getElementById('user_email').innerText = 'Email: ' + userData.email;
            document.getElementById('user_favorite_song').innerText = 'Favorite Song: ' + userData.favourite_song;
            document.getElementById('user_milk_preference').innerText = 'Milk Before Cereal: ' + userData.milk_before_cereal;
        })
        .catch(function (error) {
            console.error('Error retrieving user data:', error.message);
            // Handle the error appropriately (e.g., redirect to the login page)
            window.location.href = "index.html";
        });
} else {
    // User is not signed in, redirect to the login page
    window.location.href = "index.html";
}