// Affichage du numéro de commande sur la page
function displayOrderId() {
  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const displayId = document.querySelector("#orderId");

  if (orderId) {
    displayId.textContent = String(orderId);
  } else {
    document.location.href = `index.html`;
  }
}

displayOrderId();

// Suppression du Local Storage
function clearStorage() {
  localStorage.removeItem("orderId");
  localStorage.removeItem("BASKET");
}
clearStorage();
