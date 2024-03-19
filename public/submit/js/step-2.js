import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  import {WebWrite} from 'https://jcamille2023.github.io/webwrite/webwrite.js';
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
  let elements = WebWrite();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const dbRef = ref(getDatabase());
  

function logout() {
  signOut(auth).then(() => {
  console.log("User is signed out.");
  window.location.href = "https://herstory-9142d.firebaseapp.com";
  }).catch((error) => {
  // An error happened.
  });
}
window.logout = logout;

function submit_5(key) {
    document.getElementById("text-container").innerHTML += "<p>Submission key: " + key + "</p>";
  };

function submit_4() {
  document.getElementById("text-container").innerHTML = "<h1>Congrats!</h1>";
  document.getElementById("text-container").innerHTML += "<p>Your submission has been processed. </p>";
  document.getElementById("text-container").innerHTML += "<p>You can sign out using the sign out button in the top right corner.</p>";
  document.getElementById("input-container").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png' height='100px' width='100px'>";
  }
  

function submit() {
    let content = elements[1];
    content = content.innerHTML;
    let url = new URL(window.location.href);
    let key1 = url.searchParams.get('key1');
    let key2 = url.searchParams.get('key2');
    let type = url.searchParams.get('type');
    let key1ref = ref(database, '/posts/' + type + '/' + key1 + '/content');
    let key2ref = ref(database, '/users/' + uid + '/posts/' + key2 + '/content');
    set(key1ref, {content: content});
    set(key2ref, {content: content});
    submit_4();
    submit_5(key1);
}
window.submit = submit;


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    window.user = user;
    uid = user.uid;
    console.log(uid);
    console.log(user);
    document.getElementById("display_name").innerHTML = user.displayName;
    // Text regarding submission files
    document.getElementById("text-container").innerHTML = "<h1>Write your post</h1>";
    document.getElementById("text-container").innerHTML += "<p>Write the post that will be submitted here.</p>";
    document.getElementById("text-container").innerHTML += "<p>Do not include the title, or a section for the author's name. Proceed with the post from the first paragraph.";

    // Submission files
    
    document.getElementById("input-container").appendChild(elements[0]);
    let button = document.createElement('button');
    button.textContent = "Submit";
    button.addEventListener('click', submit);
    document.getElementById("input-container").appendChild(button);
    
    
    // ...
  } else {
    // User is signed out
    console.log("User is signed out");
    window.location.href = '/';
    // ...
  }
});