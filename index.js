import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// تهيئة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.firebasestorage.app",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// المتغيرات
let cardContainer = document.getElementById("cardContainer");

let firebaseDataArray = [];

// قراءة البيانات من Firebase
function getAllData() {
  const dbRef = ref(db); // الإشارة إلى الجذر (root)
  return get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val(); // جلب كل البيانات
        if (data.products) {
          firebaseDataArray = Object.values(data.products); // تخزين بيانات products فقط
        }
        return data;
      } else {
        console.log("No data found!");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
      throw error;
    });
}
let wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
function addToWishlist(product) {
  wishlist.push(product);
  localStorage.setItem("favorites", JSON.stringify(wishlist)); // تحديث localStorage

  alert("Added to Wishlist!");
}

console.log(wishlist);
async function fetchProductsAndLog() {
  await getAllData();
  return firebaseDataArray;
}





async function fetchAndPrint() {
  let filteredData = await fetchProductsAndLog();
  let cardContainer = document.createElement("div");
  document.body.appendChild(cardContainer);
  cardContainer.innerHTML = ""; // تأكد من تنظيف المحتوى السابق
  console.log(filteredData);
  filteredData.slice(0, 4).forEach((item) => {
    // أنشئي عنصرًا جديدًا لكل منتج
    // const productCard = document.createElement("div");
    // productCard.classList.add("product-card");
    //console.log(item);
    // أضيفي البيانات إلى العنصر
    document.getElementById("new-products").innerHTML += `
        <div id="cardItem" class="card">
        <div class="col">
          <div class="card h-100">
            <img id="imgCard" src="${item.image}" class="card-img-top" alt="Product Image">
            <div id="textCardContainer" class="card-body text-center">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">$${item.price}</span>
                <span class="text-warning">&#9733;${item.rating}</span>
              </div>
              <div>
                <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;">More Details</button>
                <button id="favoriteButton" class="btn btn-pink"  style="background-color: #f8d7da; color: #000;">Add to favorite</button>
              </div>
            </div>
          </div>
        </div>
      </div
    `;


    // أضيفي العنصر إلى الحاوية
    // cardContainer.appendChild(productCard);
  });
  filteredData.slice(5, 9).forEach((item) => {
    // أنشئي عنصرًا جديدًا لكل منتج
    // const productCard = document.createElement("div");
    // productCard.classList.add("product-card");

    // أضيفي البيانات إلى العنصر
    document.getElementById("offers-products").innerHTML += `
        <div id="cardItem" class="card">
        <div class="col">
          <div class="card h-100">
            <img id="imgCard" src="${item.image}" class="card-img-top" alt="Product Image">
            <div id="textCardContainer" class="card-body text-center">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">$${item.price}</span>
                <span class="text-warning">&#9733;${item.rating}</span>
              </div>
              <div>
                <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;">More Details</button>
                <button id="favoriteButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">Add to favorite</button>
              </div>
            </div>
          </div>
        </div>
      </div
    `;

    // أضيفي العنصر إلى الحاوية
    // cardContainer.appendChild(productCard);
  });
}



fetchProductsAndLog();

fetchAndPrint();


// const container = document.getElementById("new-products");

// // Add event listener
// const buttons = container.querySelectorAll('.favorite-button');
// buttons.forEach((button, index) => {

//   button.addEventListener('click', () => {
//     addToWishlist(filteredData[index])
//     console.log(index);
//   });
// });



// let productData = getAllData();

// get(child(dbRef, `products/`)).then((snapshot) => {
//   let data = snapshot.val();


//   if (snapshot.exists()) {


//     data.slice(0, 5).map((d) => {

//       let userId = data.userId;
//       // let dataItem = document.createElement("div");
//       // let product = data.products[userId];

//       document.getElementById("new-products").innerHTML += `
//                            <div id="cardItem" class="card">
//         <div class="col">
//           <div class="card h-100">
//             <img id="imgCard" src="${d.image}" class="card-img-top" alt="Product Image">
//             <div id="textCardContainer" class="card-body text-center">
//               <h5 class="card-title">${d.name}</h5>
//               <p class="card-text">${d.description}</p>
//               <div class="d-flex justify-content-between">
//                 <span class="fw-bold">$${d.price}</span>
//                 <span class="text-warning">&#9733;${d.rating}</span>
//               </div>
//               <div>
//                 <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;" data-id="${userId}">More Details</button>
//                 <button id="favoriteButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">Add to favorite</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`

//       // newpro.appendChild(dataItem);
//       // dataItem
//       //   .querySelector("#favoriteButton")
//       //   .addEventListener("click", () => {
//       //     addToFavorites(d);
//       //   });


//     });
//     data.slice(5, 9).map((d) => {

//       let userId = d.userId;
//       document.getElementById("offers-products").innerHTML += `
//                           <div id="cardItem" class="card">
//         <div class="col">
//           <div class="card h-100">
//             <img id="imgCard" src="${d.image}" class="card-img-top" alt="Product Image">
//             <div id="textCardContainer" class="card-body text-center">
//               <h5 class="card-title">${d.name}</h5>
//               <p class="card-text">${d.description}</p>
//               <div class="d-flex justify-content-between">
//                 <span class="fw-bold">$${d.price}</span>
//                 <span class="text-warning">&#9733;${d.rating}</span>
//               </div>
//               <div>
//                 <button id="detailsButton" class="m-1 btn btn-pink" style="background-color: #f8d7da; color: #000;" data-id="${userId}">More Details</button>
//                 <button id="favoriteButton" class="btn btn-pink" style="background-color: #f8d7da; color: #000;">Add to favorite</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`
//     });
//   } else {
//     console.log("No data available");
//   }

// }).catch((error) => {
//   console.error(error);
// });


// function retData(){
//     const dbRef=ref(db);
//     get(child(dbRef,'products/'+CnicInp.value)).then((snapshot)=>{

//         if(snapshot.exists()){
//             let name= snapshot.val().

//         }
//     })

// }
// function search_animal() {
//     document.getElementById("list").style.display = "block";
//     let input = document.getElementById('searchbar').value
//     input = input.toLowerCase();
//     let x = document.getElementsByClassName('animals');

//     for (i = 0; i < x.length; i++) {
//         if (!x[i].innerHTML.toLowerCase().includes(input)) {
//             x[i].style.display = "none";
//         }
//         else {
//             x[i].style.display = "list-item";
//         }
//     }
// }

// function addToFavorites(product) {
//   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//   favorites.push(product);

//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }
let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";