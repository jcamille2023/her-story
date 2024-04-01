import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, get, child, push, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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
    
    container.innerHTML = '';
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

    let new_contributor = document.createElement('button');
    new_contributor.textContent = 'Add a new site contributor';
    new_contributor.addEventListener('click', add_contributor)

    container.appendChild(options);
}


function add_contributor() {
    container.innerHTML = '';
    let heading1 = document.createElement('h1');
    heading1.textContent = 'Add a new contributor';
    let ele1 = document.createElement('p');
    ele1.textContent = 'Please note adding a new contributor here does not give them administrative or posting privileges.';

    let ele2 = document.createElement('p');
    ele2.textContent = 'Name'

    let input1 = document.createElement('input');
    input1.setAttribute('type','text');

    let ele3 = document.createElement('p');
    ele3.textContent = 'Role (i.e. Designer, Writer, etc)';

    let input2 = document.createElement('input');
    input2.setAttribute('type','text');

    let ele4 = document.createElement('p');
    ele4.textContent = 'Description';

    let bio = document.createElement('textarea');

    let ele5 = document.createElement('p');
    ele5.textContent = "Paste a link to their picture or upload (not working yet) a picture below";

    let input3 = document.createElement('input');
    input3.setAttribute('type','text');

    let submit_button = document.createElement('button');
    submit_button.addEventListener('click', () => {
        let obj = {
            name: input1.value,
            role: input2.value,
            bio: bio.value,
            img_url: input3.value,
        };
        let contributor_id = Math.floor(Math.random(10000));
        set(ref(database, '/members/' + contributor_id), obj).then(() => {
            let window_title = document.createElement('h1');
            window_title.textContent = 'Success';
            let details = document.createElement('p');
            details.textContent = 'The contributor ' + obj.name + 'has successfully been added.';
            container.innerHTML = '';
            container.appendChild(window_title);
            container.appendChild(details);
            let redirect = document.createElement('button');
            redirect.textContent = 'Back to main menu';
            redirect.addEventListener('click', landingPage);
            container.appendChild(redirect);
        }).catch((err) => {
            let window_title = document.createElement('h1');
            window_title.textContent = 'Error';
            let details = document.createElement('p');
            details.textContent = 'An error occured when adding the contributer';
            container.innerHTML = '';
            container.appendChild(window_title);
            container.appendChild(details);
            let redirect = document.createElement('button');
            redirect.textContent = 'Back to main menu';
            redirect.addEventListener('click', landingPage);
            container.appendChild(redirect);
            let error_info = document.createElement('p');
            error_info.textContent = err;
            container.appendChild(error_info);

        });
    });
}

function post_handler(snapshot) {
    console.log(snapshot);
    console.log(snapshot.val());
    return snapshot.val();
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
    list_of_posts.setAttribute('id','posts');
    container.appendChild(list_of_posts);
    for(let post of posts) {
        console.log(post);  
        let post_container = document.createElement('div');
        post_container.setAttribute('class','post');
        
        let post_title = document.createElement('h4');
        post_title.textContent = post.title;

        let delete_button = document.createElement('button');
        delete_button.textContent = 'Remove post';
        delete_button.addEventListener('click', () => {
            window.location.href = './remove.html?key='+post.key;
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
    get(child(dbRef, "/users/" + uid)).then((snapshot) => {
        if(snapshot.val() == null) {
            window.location.href = '/onboarding.html';
        }
        else {
            landingPage();
        }
    })
    
} else {
  // User is signed out
  console.log("User is signed out");
  window.location.href = '/';
  // ...
}
});