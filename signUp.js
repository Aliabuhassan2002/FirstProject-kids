import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.appspot.com",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.appspot.com",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
auth.languageCode = "en";


// Handle regular email/password signup
// Handle regular email/password signup
let button = document.getElementById("authh");






button.addEventListener("click", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const terms = document.getElementById("terms").checked;


  const nameRegex = /^[A-Za-z\s]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameRegex.test(name)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Name',
      text: 'Please enter a valid name (3-30 characters).'
    });
    return;
  } else if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.'
    });
    return;
  } else if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Password must be at least 8 characters long and include letters, numbers, and at least one special character.'
    });
    return;
  } else if (!terms) {
    Swal.fire({
      icon: 'warning',
      title: 'Terms and Policy',
      text: 'You must agree to the terms and policy.'
    });
    return;
  } else {
    Swal.fire({
      title: 'Creating your account...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name })
          .then(() => {
            localStorage.setItem("username", name);
            Swal.fire({
              icon: 'success',
              title: `Welcome, ${name}!`,
              text: 'Your account has been created successfully.',
              confirmButtonText: 'Continue'
            }).then(()=>{
              window.location.href = "index.html";

            })
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      });
  }
});

// Google Sign-Up
const googleButton = document.getElementById("google-signin");

googleButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      localStorage.setItem("username", user.displayName);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
      alert("Google Sign-In failed: " + error.message);
    });
});

// Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.displayName);
  } else {
    console.log("No user is signed in.");
  }
});

















// return;
//     } else if (!emailRegex.test(email)) {

//   return;
// } else if (!passwordRegex.test(password)) {

//   return;
// } else if (!terms) {

//   return;
// } else {


//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       localStorage.setItem("username", name);
//       .then(() => {
//         window.location.href = "index.html";
//       });
//     })
//     .catch((error) => {
//       const errorMessage = error.message;
      
//     });
// }