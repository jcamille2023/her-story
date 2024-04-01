import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, set, ref, onValue, get, child, push } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {WebWrite} from 'https://jcamille2023.github.io/webwrite/webwrite_oop.js';

const firebaseConfig = {
    apiKey: "AIzaSyCjNvzBC-xVZ0tW14acmAhLLH-kjizRIG4",
    authDomain: "herstory-9124d.firebaseapp.com",
    projectId: "herstory-9124d",
    storageBucket: "herstory-9124d.appspot.com",
    messagingSenderId: "266596236872",
    appId: "1:266596236872:web:e80ff220069219a3bd627d",
    measurementId: "G-9WV20CMFLM"
};

   
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const dbRef = ref(database);
let webwrite = new WebWrite();
let container = document.getElementById('submit-container');
let creator = {};
let ref1, ref2, ref3;
onAuthStateChanged(auth, (user) => {
    if(user) {
        let url = new URL(window.location.href);
        let params = url.searchParams;
        if(params['key'] && params['type']) {
            let key = params['key'];
            let type = params['type'];
            ref1 = ref('/users/' + uid + "/posts/" + key);
            ref2 = ref('/posts/' + type + '/' + key);
            ref3 = ref('content/' + key);
            valid(key);
        }
        else {
            container.innerHTML += "<h1>There has been an error. Please try again</h1>";
        }
        landing_page();
    }
});
function invalid() {
    let container = document.getElementById('input-container');
    let user = auth.currentUser;
  
    container.innerHTML = '';
  
    let ele1 = document.createElement('p');
    ele1.textContent = "Name";
    container.appendChild(ele1);
  
    
    let name_input = document.createElement('input');
    name_input.setAttribute('type','text');
    name_input.value = user.displayName;
    container.appendChild(name_input);
  
    let ele2 = document.createElement('p');
    ele2.textContent = "Email";
    container.appendChild(ele2);
    
    let email_input = document.createElement('input');
    email_input.setAttribute('type','text');
    email_input.value = user.email;
    container.appendChild(email_input);
  
    let submit_button = document.createElement('button');
    submit_button.textContent = 'Submit';
    submit_button.addEventListener('click', () => {
      creator.name = name_input.value;
      creator.email = email.input.value;
      valid();
    })
    container.appendChild(submit_button);
  }
  window.invalid = invalid;
  
async function valid(key) {
    let user = auth.currentUser;
    let uid = user.uid;
    let post = await(get(child(dbRef, "/users/" + uid + "/posts/" + key)));
    post = post.val();
    if(Object.values(creator).length < 1) {
      creator.name = post.creator;
      creator.email = user.email;
    }
    let container = document.getElementById('input-container');
    container.innerHTML = "";

    let ele1 = document.createElement('p');
    ele1.textContent = 'Title of post';
    container.appendChild(ele1);

    let input = document.createElement('input');
    input.setAttribute('type','text');
    input.value = post.title;
    
    container.appendChild(input);

    let ele2 = document.createElement('p');
    ele2.textContent = 'Write a brief description of your post.';
    container.appendChild(ele2);


    let description = document.createElement('textarea');
    description.value = post.description;
    container.appendChild(description);

    let ele3 = document.createElement('p');
    ele3.textContent = 'The type of post cannot be modified at this time.';
    container.appendChild(ele3);

   

    let submit_button = document.createElement('button');
    submit_button.textContent = 'Submit';
    submit_button.addEventListener('click', () => {
            post.creator = creator.name;
            post.title = input.value;
            post.description = description.value;
            write_content(post);
    });
    container.appendChild(submit_button);
}
window.valid = valid;

async function write_content(post) {
    let content = await get(child(dbRef,'/content/' + post.key));
    content = content.val();
    let container = document.getElementById('submit-container');
    container.innerHTML = '';

    let title = document.createElement('h1');
    title.textContent = 'Write your post';
    container.appendChild(title);

    let detail1 = document.createElement('p');
    detail1.textContent = 'Write the post that will be submitted here.';
    container.appendChild(detail1);

    let detail2 = document.createElement('p');
    detail2.textContent = "Do not include the title, or a section for the author's name. Proceed with the post from the first paragraph."
    container.appendChild(detail2);

    container.appendChild(webwrite.container);
    let write_container = webwrite.text_container;
    write_container.appendChild(content.content);

    let submit_button = document.createElement('button');
    submit_button.textContent = 'Submit';
    submit_button.addEventListener('click', () => {
        post.content = webwrite.content();
        submit(post);
    });
    container.appendChild(submit_button);
}

function submit(post) {    
    console.log(post.content);
    let content = post.content;
    console.log(content);
    console.log(post);
    let user = auth.currentUser;
    let submit_container = document.getElementById("submit-container");
    //let type = types[0].value == 'blog' ? 'blog' : 'interview'; // gets the type of post
    let new_post_ref = ref(database, '/posts/' + post.type + '/' + post.key); 
    let new_user_post_ref = ref(database, 'users/' + user.uid + '/posts/' + post.key); 
    let user_post = post;
    delete user_post['content'];
    set(ref(database, 'content/' + post.key),{content: content});
    set(new_post_ref, user_post).then(() => {
        set(new_user_post_ref, user_post).then(() => {
            let key = new_post_ref.key;
            submit_container.innerHTML = "<h1>Congrats!</h1>";
            submit_container.innerHTML += "<p>Your submission has been processed. </p>";
            submit_container.innerHTML += "<p>You can sign out using the sign out button in the top right corner.</p>";
            submit_container.innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png' height='100px' width='100px'>";
            submit_container.innerHTML += "<p>Submission key: " + key + "</p>";
        });
    });

}