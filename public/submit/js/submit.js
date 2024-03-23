import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, set, ref, onValue, get, child, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {WebWrite} from 'https://jcamille2023.github.io/webwrite/webwrite_oop.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var user;
var uid;
let post;
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
let webwrite = new WebWrite();


function logout() {
  signOut(auth).then(() => {
  console.log("User is signed out.");
  window.location.href = "https://herstory-9142d.firebaseapp.com";
  }).catch((error) => {
  // An error happened.
  });
}
window.logout = logout;

function submit(post) {
    //let type = types[0].value == 'blog' ? 'blog' : 'interview'; // gets the type of post
    let posts_ref = ref(database, 'posts/' + post.type); // gets the reference to the folder with the type of post
    let user_posts_ref = ref(database, 'users/' + uid + '/posts/'); // gets the reference to the user post folder
    let new_post_ref = push(posts_ref); // both create a new post in each folder
    let new_user_post_ref = push(user_posts_ref);
    post.key = new_post_ref.key;
    set(new_post_ref, post).then(() => {
        set(new_user_post_ref, post).then(() => {
            let key = new_post_ref.key;
            document.getElementById("text-container").innerHTML = "<h1>Congrats!</h1>";
            document.getElementById("text-container").innerHTML += "<p>Your submission has been processed. </p>";
            document.getElementById("text-container").innerHTML += "<p>You can sign out using the sign out button in the top right corner.</p>";
            document.getElementById("input-container").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png' height='100px' width='100px'>";
            document.getElementById("text-container").innerHTML += "<p>Submission key: " + key + "</p>";
        });
    });

}
window.submit = submit;

function display_step_2(post) {
    webwrite.enableImages();
    document.getElementById("text-container").innerHTML = "<h1>Write your post</h1>";
    document.getElementById("text-container").innerHTML += "<p>Write the post that will be submitted here.</p>";
    document.getElementById("text-container").innerHTML += "<p>Do not include the title, or a section for the author's name. Proceed with the post from the first paragraph.";
    document.getElementById("input-container").innerHTML = "";
    document.getElementById("input-container").appendChild(webwrite.container);
    document.getElementById("input-container").style.width = "75%";
    let button = document.createElement('button');
    button.textContent = "Submit";
    button.addEventListener('click', () => {
      post.content = webwrite.content;
      submit(post);
    });
    document.getElementById("input-container").appendChild(button);
}

function save_details() {
    let types = document.getElementsByName('format'); //
    let type;
    for(type of types) {
      if(type.checked == true) {
        type = type.value;
        break;
      }
    }
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    post = {
        type: type,
        creator: uid,
        title: title,
        description: description,
    };
    display_step_2(post);
}
window.save_details = save_details;

function valid() {
    container.innerHTML = "";
    container.innerHTML += "<p>Title of post</p>";
    container.innerHTML += '<input id="title" type="text" name="title"></input>';
    container.innerHTML += "<p>Write a brief description of your post.</p>";
    container.innerHTML += '<textarea id="description"></textarea>';
    container.innerHTML += "<p>Blog post or interview?</p>";
    container.innerHTML += '<input id="format_1" type="radio" name="format" value="Blog">Blog</input>';
    container.innerHTML += '<input id="format_2" type="radio" name="format" value="Interview">Interview</input>';
    container.innerHTML += '<button id="save_details" onclick=save_details()>Submit</input>';
}
window.valid = valid;

function invalid() {
    console.log('click');
}

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
    container.innerHTML += "<p>Press no only if the name on your Google account is not your actual name or there are multiple authors.</p>";
    container.innerHTML += "<br>";
    container.innerHTML += "<p>If your Google account name is not your real name, you can add your real name to HerStory by going to the settings page.</p>";
    
    
    // ...
} else {
  // User is signed out
  console.log("User is signed out");
  window.location.href = '/';
  // ...
}
});