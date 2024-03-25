import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, remove} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
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
        let url = new URL(window.location.href);
        let params = url.searchParams;
        if(params['key'] && params['type']) {
            let key = params['key'];
            let type = params['type'];
            let ref1 = ref('/users/' + uid + "/posts/" + key);
            remove(ref1);
            let ref2 = ref('/posts/' + type + '/' + key);
            remove(ref2);
            container.innerHTML += "<h1>The requested submission has been removed.</h1>";
        }
        else {
            container.innerHTML += "<h1>There has been an error. Please try again</h1>";
        }
        
    } else {
      // User is signed out
      console.log("User is signed out");
      window.location.href = '/';
      // ...
    }
    });