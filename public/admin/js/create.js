import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, get, child, push, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {WebWrite} from 'https://jcamille2023.github.io/WebWrite/webwrite_oop.js';
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
let webwrite = new WebWrite();

function section1() {
    let container = document.createElement('div');
    var variable = '' + 
    '<h1 style="text-align: center">About us</h1>' + 
    '        <div id="about-us">' + 
    '            <div class="logo-container">' + 
    '                <img class="logo" style="width:50vw">' + 
    '            </div>' + 
    '            <div class="description">' + 
    '                <p> HerStory is a newly established initiative that addresses the underrepresentation of women through stories, infographics, interviews, and blog posts.</p> ' + 
    '                <a href="/about.html">Learn more</a>' + 
    '            </div>' + 
    '        </div>' + 
    '';
    container.innerHTML = variable;
    return container;
}
export function newSection(container) {
    container.innerHTML = "";
    webwrite.importCode(section1(),false)
    container.appendChild(webwrite.container);

}