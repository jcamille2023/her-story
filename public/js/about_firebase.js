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

get(child(dbRef, "/members/")).then((snapshot) => {
  let data = snapshot.val();
  console.log(data);
  data = Object.values(data);
  console.log(data);
  for(member of data) {
    let name = member.name;
    let role = member.role;
    let description = member.bio;
    let img_url = member.img_url;
    show_member(name,description,img_url,role);
  }
});

