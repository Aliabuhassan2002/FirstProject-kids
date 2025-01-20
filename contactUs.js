import {

    set,
    ref,
    db
} from "./firebaseConfig.js"

let btn = document.getElementById("dataForm");
// btn.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     try {
//         const docRef = await addDoc(collection(db, "comments"), {
//             name: namee,
//             email: emaill,
//             msg: msgg
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })
////////////////////////////////////////////////

function writeUserData(userId, name, email, message) {

    set(ref(db, 'comments/' + userId), {
        username: name,
        email: email,
        msg: message
    }).then(() => {
        alert('successfully sent');
    }).catch((error) => {
        alert(error);
    })
}
btn.addEventListener('submit', (event) => {
    event.preventDefault();

    let namee = document.getElementById("FullName").value;
    let emaill = document.getElementById("Email").value;
    let msgg = document.getElementById("msg").value;

    let userId = new Date().getTime().toString();
    writeUserData(userId, namee, emaill, msgg);




})

const logo = document.querySelector('.logo');
const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
    icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
    icon.style.color = '#FF69B4';
});
let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";