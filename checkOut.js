document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    clearMessages([
      "cardNumberError",
      "nameOnCardError",
      "expirationError",
      "cvvError",
    ]);

    const cardNumber = document.getElementById("typeText").value;
    const nameOnCard = document.getElementById("typeName").value;
    const expiration = document.getElementById("typeExp").value;
    const cvv = document.getElementById("typeCvv").value;

    let valid = true;

    if (!validateCardNumber(cardNumber)) {
      displayMessage(
        "cardNumberError",
        "Please enter a valid card number.",
        "error"
      );
      valid = false;
    }

    if (!nameOnCard.trim()) {
      displayMessage("nameOnCardError", "Name on card is required.", "error");
      valid = false;
    }

    if (!validateExpiration(expiration)) {
      displayMessage(
        "expirationError",
        "Please enter a valid expiration date (MM/YY).",
        "error"
      );
      valid = false;
    }

    if (!validateCVV(cvv)) {
      displayMessage("cvvError", "CVV must be exactly 3 digits.", "error");
      valid = false;
    }

    if (valid) {
      const successMessage = document.getElementById("paymentSuccessMessage");
      successMessage.textContent = "Payment successful!";
      successMessage.style.display = "block";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }
  });

function displayMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.style.color = type === "error" ? "red" : "green";
}

function clearMessages(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    element.textContent = "";
  });
}

function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));
}

function validateExpiration(expiration) {
  const expPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const [month, year] = expiration.split("/").map(Number);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;
  return (
    expPattern.test(expiration) &&
    (year > currentYear || (year === currentYear && month >= currentMonth))
  );
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}
let username = localStorage.getItem("username");
document.getElementById("nav-username").textContent = username;
document.getElementById("nav-username").style.margin = "10px";