// information detail from product page
let proDetailsData = JSON.parse(localStorage.getItem("details"));
console.log(proDetailsData.color)
   
// =============================================================================================

  function addToCart() {
    if (proDetailsData) {
      // استرجاع المنتجات الموجودة في السلة أو إنشاء مصفوفة جديدة
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // إضافة المنتج الحالي إلى السلة
      cart.push(proDetailsData);

      // تحديث localStorage ببيانات السلة الجديدة
      localStorage.setItem("cart", JSON.stringify(cart));

      // الانتقال إلى صفحة checkout.html
      window.location.href = "checkOut.html";
    } else {
      console.error("No product details found to add to cart.");
    }
  }

  // إضافة مستمع للنقر على الزر
  document.getElementById("addToCart").addEventListener("click", addToCart);
// =========================================================================================



   // Change the color dynamically on hover(style)
   const logo = document.querySelector('.logo');
   const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
  icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
  icon.style.color = '#FF69B4';
});


// main image
function changeImage(thumbnail) {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = thumbnail.src;
}



// ===========================firebase=============================
let cardContainer = document.getElementById("cardContainer");

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
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




// add products information ضافة معلومات منتج معين إلى صفحة الويب 
if (proDetailsData) {
  // تحديث الصورة الرئيسية
  document.getElementById("mainImage").src = proDetailsData.image;

  // تحديث الصور المصغرة
  const smallImages = document.querySelectorAll("#small_img .thumbnail");
  if (proDetailsData.thumbnails && proDetailsData.thumbnails.length === smallImages.length) {
    proDetailsData.thumbnails.forEach((thumbnail, index) => {
      smallImages[index].src = thumbnail;
    });
  }

  // تحديث اسم المنتج
  // document.querySelector(".gift-info h1").textContent = proDetailsData.name;

  // تحديث التقييم
  const ratingElement = document.querySelector(".rating span:nth-child(1)");
  ratingElement.textContent = `⭐ ${proDetailsData.rating}`;

  // تحديث عدد المراجعات
  const reviewsElement = document.querySelector(".rating span:nth-child(2)");
  reviewsElement.textContent = `${proDetailsData.reviews} reviews`;

  // تحديث عدد المنتجات المباعة
  const soldElement = document.querySelector(".rating span:nth-child(3)");
  soldElement.textContent = `${proDetailsData.sold}+ sold`;

  // تحديث السعر
  document.querySelector(".price").textContent = `$${proDetailsData.price}`;

  // تحديث الوصف
  document.querySelector(".description").textContent = proDetailsData.description;
} else {
  console.error("Product details not found in localStorage.");
}


// Function to write data to Firebase==============================
function writeReviewData(name, rating, reviewText, imageUrl) {
  const reviewsRef = ref(db, 'reviews');
  const newReviewRef = push(reviewsRef);
  set(newReviewRef, {
    name: name,
    rating: rating,
    reviewText: reviewText,
    imageUrl: imageUrl || '',
    timestamp: Date.now(),


  }).then(() => {
    console.log('Review data saved successfully!');
  }).catch((error) => {
    console.error('Error saving review data:', error);
  });
}
// Function to display reviews as cards
function displayReview(review) {
  const reviewsContainer = document.getElementById('reviewsContainer');
  const reviewCard = document.createElement('div');
  reviewCard.classList.add('review-card');

  reviewCard.innerHTML = `
    <div class="review-header">
      <img src="${review.imageUrl}" alt="User Image">
      <div>
        <h5 class="reviewer-name">${review.name}</h5>
        <small class="review-date">${new Date(review.timestamp).toLocaleString()}</small>
      </div>
      <span class="rating">${'★'.repeat(review.rating)} ${review.rating}/5</span>
    </div>
    <p class="review-text">${review.reviewText}</p>
  `;

  reviewsContainer.appendChild(reviewCard);
}


// Event listener for form submission
document.getElementById('reviewForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('productName').value;
  const rating = document.querySelector(".output");
  const reviewText = document.getElementById('reviewText').value;
  const photoInput = document.getElementById('uploadPhoto');
  let imageUrl = '';
  if (photoInput.files.length > 0) {
    const photo = photoInput.files[0];
    imageUrl = URL.createObjectURL(photo);
  }

  writeReviewData(name, rating, reviewText, imageUrl);

  document.getElementById('reviewForm').reset();

  displayReview({
    name: name,
    rating: parseInt(rating),
    reviewText: reviewText,
    imageUrl: imageUrl,
    timestamp: Date.now()
  });
});




// star rating==================================
document.addEventListener('DOMContentLoaded', function () {
  // Handling star rating clicks
  document.querySelectorAll('.stars span').forEach((star) => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));
      document.querySelectorAll('.stars span').forEach((s, index) => {
        if (index < value) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
      document.querySelector('.output').textContent = `Rating is: ${value}/5`;
    });
  });
});

let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";
