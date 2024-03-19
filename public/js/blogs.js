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
          let parser = new DOMParser();
          let body = document.body;
          let blog_container = document.createElement('div');
          let background = document.createElement('div');

          background.style.zIndex = '9';
          background.style.width = '100%';
          background.style.height = '100%';
          background.style.color = 'gray';
          background.style.opacity = '0.5';
          
          // styling for container
          blog_container.style.zIndex = '10';
          blog_container.style.backgroundColor = 'rgb(42, 8, 59)';
          blog_container.style.width = '80%';
          blog_container.style.height = '80%';
          blog_container.style.marginLeft = 'auto';
          blog_container.style.marginRight = 'auto';
          blog_container.style.color = 'white';

          // creating html from content
          let content = parser.parseFromString(post.content,'text/html');


          // creating exit button
          let exit_button = document.createElement('button');
          exit_button.style.zIndex = "11";
          exit_button.style.position = "absolute";
          exit_button.style.top = "0";
          exit_button.style.left = "0";
          exit_button.style.padding = "20px";
          exit_button.appendChild(document.createTextNode('Exit'));

          exit_button.addEventListener('click', () => {
            background.remove();
            blog_container.remove();
            exit_button.remove();
          });
          // appending details
          blog_container.appendChild(h1);
          blog_container.appendChild(author);
          blog_container.appendChild(description);
          blog_container.appendChild(content);
          body.appendChild(background);
          body.appendChild(blog_container);
          body.appendChild(exit_button);

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




