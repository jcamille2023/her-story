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

        if(params.get('key') != '') {
            let key = params.get('key');
            landing_page(key);
        }
        else {
            container.innerHTML += "<h1>There has been an error. Please try again</h1>";
        }
        
    }
});


function landing_page(key) {
    let user = auth.currentUser;
    let uid = user.uid;
      document.getElementById("display_name").innerHTML = user.displayName;
      // Basic text to submit a new post
      document.getElementById("text-container").innerHTML = "<h1>Let's get started!</h1>";
      document.getElementById("text-container").innerHTML += "<br><h2>Basic Info</h2>";
      document.getElementById("text-container").innerHTML += "<br>";
      document.getElementById("text-container").innerHTML += "<p>Let's confirm a few details about your post.</p>";
      // Details
      var name_text = document.createElement("p");
      name_text.textContent = "Name: " + user.displayName;
      document.getElementById('input-container').appendChild(name_text);
      var email_text = document.createElement("p");
      email_text.textContent = "Email: " + user.email;
      document.getElementById('input-container').appendChild(email_text);
      document.getElementById('input-container').innerHTML += "<p>Is this information valid?</p>";
      document.getElementById('input-container').innerHTML += `<table><tr><td><button onclick="valid('${key}')">Yes</button></td><td><button onclick="invalid('${key}')">No</button></td></tr></table>`;
      document.getElementById('input-container').innerHTML += "<p>Press no only if the name on your Google account is not your actual name or there are multiple authors.</p>";
      document.getElementById('input-container').innerHTML += "<br>";
      document.getElementById('input-container').innerHTML += "<p>If your Google account name is not your real name, you can add your real name to HerStory by going to the settings page.</p>";
      
}
function invalid(key) {
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
      valid(key);
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
    write_container.innerHTML += content.content;
    let children = write_container.children;
    for(let child of children) {
        child.setAttribute('contenteditable','true');
    }

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
            submit_container.innerHTML = "<h1>Success!</h1>";
            submit_container.innerHTML += "<p>Your post has been edited.</p>";
            submit_container.innerHTML += "<a href='./admin.html'>Return to admin page</a>";
            submit_container.innerHTML += "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png' height='100px' width='100px'>";
            submit_container.innerHTML += "<p>Submission key: " + key + "</p>";
        });
    });

}