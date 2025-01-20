// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
//     authDomain: "contactus-a9d19.firebaseapp.com",
//     projectId: "contactus-a9d19",
//     storageBucket: "contactus-a9d19.firebasestorage.app",
//     messagingSenderId: "290565306453",
//     appId: "1:290565306453:web:0995f78c2a17d582903cdc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export {
//     firebaseConfig,
//     collection,
//     addDoc,
//     db
// }

/////////////////////////////////////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
    authDomain: "contactus-a9d19.firebaseapp.com",
    databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
    projectId: "contactus-a9d19",
    storageBucket: "contactus-a9d19.firebasestorage.app",
    messagingSenderId: "290565306453",
    appId: "1:290565306453:web:0995f78c2a17d582903cdc"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';

export {
    firebaseConfig,
    db,
    app,
    auth,
    provider,
    ref,
    set

}


// function getdata(){
//     let name=document.getElementById("FullName").value;
//     let email=document.getElementById("Email").value;
//     let msg=document.getElementById("msg").value;
//     return name,email,msg;
// }

