// hover logo navbar
const logo = document.querySelector('.logo');
const icon = document.querySelector('.icon');

logo.addEventListener('mouseover', () => {
  icon.style.color = '#EECAD5';
});

logo.addEventListener('mouseout', () => {
  icon.style.color = '#FF69B4';
});


// firebase==================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
  authDomain: "contactus-a9d19.firebaseapp.com",
  projectId: "contactus-a9d19",
  storageBucket: "contactus-a9d19.appspot.com",
  messagingSenderId: "290565306453",
  appId: "1:290565306453:web:0995f78c2a17d582903cdc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



// local seorage ============================================name==========
const userName = localStorage.getItem("username");

// التحقق إذا كان هناك قيمة في localStorage
if (userName) {
  document.getElementById("showName").textContent = userName;
} else {
  console.log("No username found in localStorage");
}
// Main ======================

const edit_emailBtn = document.getElementById('edit_email');
const edit_nameBtn = document.getElementById('edit_name');
const edit_passwordBtn = document.getElementById('edit_password');

const editNameForm = document.getElementById('edit-box-name');
const editEmailForm = document.getElementById('edit-box-email');
const editPasswordForm = document.getElementById('edit-box-password');




// ================= for editing ============



// l==================================name===================================

document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("username");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const nameToShow = user.displayName || userName;

      document.getElementById("showName").textContent = nameToShow;
      document.getElementById("showEmail").textContent = user.email;
      document.getElementById("showTitel").textContent = nameToShow;
      
      // إظهار أو إخفاء نموذج تعديل الاسم
      document.getElementById("edit_name").addEventListener("click", () => {
        document.getElementById("edit-box-name").style.display = "block";
      });

      // معالجة تغيير الاسم
      document.querySelector(".edit_name_btn").addEventListener("click", (event) => {
        event.preventDefault(); // منع إرسال النموذج التقليدي

        const newName = document.getElementById("newName").value;

        if (newName) {
          // تحديث الاسم في Firebase
          updateProfile(user, { displayName: newName })
            .then(() => {
              // تحديث الاسم في localStorage
              localStorage.setItem("username", newName);
              
              // تحديث الاسم في الواجهة
              document.getElementById("showName").textContent = newName;
              document.getElementById("showTitel").textContent = newName;

              // إخفاء نموذج التعديل بعد التحديث
              document.getElementById("edit-box-name").style.display = "none";
              console.log("Name updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating name:", error);
              alert("Failed to update name.");
            });
        } else {
          alert("Please enter a new name.");
        }
      });

    } 
    else {
      console.log("Please log in to edit your profile.");
    }
  });
});


//=============================================password=======================
// استماع للأحداث الخاصة بكل زر
edit_nameBtn.addEventListener('click', () => {
  // إخفاء جميع النماذج الأخرى
  editEmailForm.style.display = 'none';
  editPasswordForm.style.display = 'none';
  
  // تبديل عرض نموذج تعديل الاسم
  editNameForm.style.display = editNameForm.style.display === 'none' ? 'block' : 'none';
});

edit_emailBtn.addEventListener('click', () => {
  // إخفاء جميع النماذج الأخرى
  editNameForm.style.display = 'none';
  editPasswordForm.style.display = 'none';
  
  // تبديل عرض نموذج تعديل البريد الإلكتروني
  editEmailForm.style.display = editEmailForm.style.display === 'none' ? 'block' : 'none';
});

edit_passwordBtn.addEventListener('click', () => {
  // إخفاء جميع النماذج الأخرى
  editNameForm.style.display = 'none';
  editEmailForm.style.display = 'none';
  
  // تبديل عرض نموذج تعديل كلمة المرور
  editPasswordForm.style.display = editPasswordForm.style.display === 'none' ? 'block' : 'none';
});

// إضافة الكود الجديد (تحديث كلمة المرور) بعد هذه الأحداث لتجنب التعارض

document.querySelector(".edit_password_btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const oldPassword = document.getElementById("old_Password").value;
  const newPassword = document.getElementById("newPassword").value;
  const newPasswordConfirm = document.getElementById("newPasswordConfirm").value;
  const errorMessage = document.getElementById("error-message");

  // التحقق من تطابق كلمتي المرور الجديدة
  if (newPassword !== newPasswordConfirm) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Passwords do not match!";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  try {
    console.log("Reauthenticating user:");

    // إعداد بيانات الاعتماد لإعادة التوثيق
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    // إعادة التوثيق باستخدام كلمة المرور القديمة
    await reauthenticateWithCredential(user, credential);

    console.log("Reauthentication successful!");

    // تحديث كلمة المرور
    await updatePassword(user, newPassword);
    alert("Password updated successfully!");

    // إعادة تعيين الحقول
    document.getElementById("edit-password-form").reset();
    document.getElementById("edit-box-password").style.display = "none";
  } catch (error) {
    console.error("Error during password update:", error);
    if (error.code === "auth/wrong-password") {
      alert("The old password is incorrect. Please try again.");
    } else {
      alert("Failed to update password. Please check your details and try again.");
    }
  }
});
