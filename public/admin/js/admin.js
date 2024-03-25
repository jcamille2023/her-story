import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, set, ref, onValue, get, child, push, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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
const dbRef = ref(getDatabase());
let container = document.getElementById('admin_container');

function logout() {
  signOut(auth).then(() => {
  console.log("User is signed out.");
  window.location.href = "https://herstory-9142d.firebaseapp.com";
  }).catch((error) => {
  // An error happened.
  });
}
window.logout = logout;


function landingPage() {
    let user = auth.currentUser;
    document.getElementById("display_name").innerHTML = "Hi, " + user.displayName + "!";
    document.getElementById("display_name").innerHTML += "<br><a href='javascript:logout()'>Logout</a>";
    

    let pg_title = document.createElement('h1');
    pg_title.textContent = 'Manage your site';
    container.appendChild(pg_title);

    let options = document.createElement('div');

    let new_post = document.createElement('button');
    new_post.textContent = 'Make a new post';
    new_post.addEventListener('click', () => {
        window.location.href = '../submit';
    });
    options.appendChild(new_post);

    let manage_posts = document.createElement('button');
    manage_posts.textContent = 'Manage your existing posts';

    manage_posts.addEventListener('click', posts_menu);
    
    let new_section = document.createElement('button');
    new_section.textContent = 'Add a new section to your page';
    new_section.addEventListener('click',() => {window.location.href = './create'});
    options.appendChild(new_post);
    options.appendChild(manage_posts);
    options.appendChild(new_section);

    container.appendChild(options);
}

function create_section() {

}

function post_handler(snapshot) {
    console.log(snapshot);
    console.log(snapshot.val());
    return snapshot.val();
}

function delete_post(reference) {
    remove(reference);
}

async function posts_menu() {
    container.innerHTML = "";
    let user = auth.currentUser;
    let uid = user.uid;

    let posts = await get(child(dbRef, "/users/" + uid + "/posts/")).then(post_handler);
  
    posts = Object.values(posts);
    let title = document.createElement('h1');
    title.textContent = "Manage your posts";
    container.appendChild(title);

    let list_of_posts = document.createElement('div');
    list_of_posts.style.display = 'grid';
    container.appendChild(list_of_posts);
    for(let post of posts) {
        console.log(post);
        let post_container = document.createElement('div');
        post_container.style.backgroundColor = 'black';
        post_container.style.color = 'white';
        
        let post_title = document.createElement('h4');
        post_title.textContent = post.title;

        let delete_button = document.createElement('button');
        delete_button.textContent = 'Remove post';
        delete_button.addEventListener('click', () => {
            window.location.href = './remove.html?key='+key;
        });

        let edit_button = document.createElement('button');
        edit_button.textContent = 'Edit post';
        edit_button.addEventListener('click', () => {
            window.location.href = './edit.html?key='+post.key+"&type="+post.type;       
        });

        post_container.appendChild(post_title);
        post_container.appendChild(delete_button);
        post_container.appendChild(edit_button)

        list_of_posts.appendChild(post_container);
    }
    let exit_button = document.createElement('button');
    exit_button.textContent = "Back to main menu";
    exit_button.addEventListener('click', landingPage);
    container.appendChild(exit_button);
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
    landingPage();
} else {
  // User is signed out
  console.log("User is signed out");
  window.location.href = '/';
  // ...
}
});