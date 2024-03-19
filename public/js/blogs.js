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
get(child(dbRef, "/posts/Blog")).then((snapshot) => {
  let data = snapshot.val();
  data = Object.values(data);
  for(let post of data) {
    get(child(dbRef, "users/" + post.creator)).then((udata) => {
        udata = udata.val();
        let name = udata.name;
        let container = document.createElement('div');
        container.setAttribute('class','blog');
        let img = document.createElement('img');
        // will add img code later
        let h1 = document.createElement('h1');
        let author = document.createElement('p');
        let description = document.createElement('p');
        h1.textContent = post.title;
        author.textContent = name;
        description.textContent = post.description;
        container.addEventListener('click', () => {
          window.location.href = "read.html?type=blog&key="+key;
        });
        container.appendChild(h1);
        container.appendChild(author);
        container.appendChild(description);
        let element = document.getElementById('blogs');
        element.appendChild(container);


    });
  }
});

/* <div class="blog">
                    Example format for a blog post  
                    <img src="{source of blog post image}">
                    <h1>Blog post name</h1>
                    <p>author</p>
                    <p>Short description</p>
                </div> */




