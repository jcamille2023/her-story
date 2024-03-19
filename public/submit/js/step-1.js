import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, set, ref, onValue, get, child, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var user;
var uid;
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCjNvzBC-xVZ0tW14acmAhLLH-kjizRIG4",
authDomain: "herstory-9124d.firebaseapp.com",
projectId: "herstory-9124d",
storageBucket: "herstory-9124d.appspot.com",
messagingSenderId: "266596236872",
appId: "1:266596236872:web:e80ff220069219a3bd627d",
measurementId: "G-9WV20CMFLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let container = document.getElementById("input-container");

function logout() {
signOut(auth).then(() => {
console.log("User is signed out.");
window.location.href = "https://herstory-9142d.firebaseapp.com";
}).catch((error) => {
// An error happened.
});
}
window.logout = logout;

function submit() {
    let types = document.getElementsByName('format'); //
    let type = types[0].value == 'blog' ? 'blog' : 'interview'; // gets the type of post
    let posts_ref = ref(database, 'posts/' + type); // gets the reference to the folder with the type of post
    let user_posts_ref = ref(database, 'users/' + uid + '/posts/'); // gets the reference to the user post folder
    let new_post_ref = push(posts_ref); // both create a new post in each folder
    let new_user_post_ref = push(user_posts_ref);
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    set(new_post_ref, { //sets the initial data for the new post
        creator: uid,
        title: title,
        description: description,
    }).then(() => {
    let key1 = new_post_ref.key;
    set(new_user_post_ref, {
        creator: uid,
        title: title,
        description: description,
        }).then(() => {
            let key2 = new_user_post_ref.key;
            window.location.href = "step-2.html?key1="+key1+"&key2="+key2;
        });
    
    });

}
window.submit = submit;

function valid() {
    container.innerHTML = "";
    container.innerHTML += "<p>Title of post</p>";
    container.innerHTML += '<input id="title" type="text" name="title"></input>';
    container.innerHTML += "<p>Write a brief description of your post.</p>";
    container.innerHTML += '<textarea id="description"></textarea>';
    container.innerHTML += "<p>Blog post or interview?</p>";
    container.innerHTML += '<input id="format_1" type="radio" name="format" value="Blog">Blog</input>';
    container.innerHTML += '<input id="format_2" type="radio" name="format" value="Interview">Interview</input>';
    container.innerHTML += '<button id="submit" onclick=submit()>Submit</input>';
}
window.valid = valid;

onAuthStateChanged(auth, (user) => {
if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  window.user = user;
  uid = user.uid;
  console.log(uid);
  console.log(user);
  set(ref(database, 'users/' + uid), {
    name: user.displayName,
    email: user.email,
  });
  document.getElementById("display_name").innerHTML = user.displayName;
  // Basic text to submit a new post
  document.getElementById("text-container").innerHTML = "<h1>Let's get started!</h1>";
  document.getElementById("text-container").innerHTML += "<br><h2>Basic Info</h2>";
  document.getElementById("text-container").innerHTML += "<br>";
  document.getElementById("text-container").innerHTML += "<p>Let's confirm a few details about your post.</p>";
  // Details
  var name_text = document.createElement("p");
  name_text.textContent = "Name: " + user.displayName;
  container.appendChild(name_text);
  var email_text = document.createElement("p");
  email_text.textContent = "Email: " + user.email;
  container.appendChild(email_text);
  container.innerHTML += "<p>Is this information valid?</p>";
  container.innerHTML += '<table><tr><td><button onclick="valid()">Yes</button></td><td><button onclick="invalid()">No</button></td></tr></table>';
  
  
  // ...
} else {
  // User is signed out
  console.log("User is signed out");
  window.location.href = '/';
  // ...
}
});