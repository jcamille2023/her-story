import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getDatabase, set, ref, onValue, get, child, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const database = getDatabase();
const dbRef = ref(database);


// loads current header and logo in page
get(child(dbRef, "/assets/")).then((snapshot) => {
  let data = snapshot.val();
  console.log(data);
  let headers = document.getElementsByClassName("header");
  for(let header of headers) {
    header.style.backgroundImage = "url('" + data.banner + "')"; 
  }
  let logos = document.getElementsByClassName("logo");
  for(let logo of logos) {
    logo.src = data.logo;
  }
});

// loads current page links
get(child(dbRef, "/urls/")).then((snapshot) => {
    let data = snapshot.val();
    data = Object.values(data);
    add_links(data);
  });



