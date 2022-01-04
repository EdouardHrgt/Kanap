// Affichage du numéro de commande sur la page
function displayOrderId() {
  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const displayId = document.querySelector("#orderId");
  const errMsg = document.querySelector(".confirmation p");

  if (orderId) {
    displayId.textContent = String(orderId);
  } else {
    errMsg.textContent = "Vous n'avez pas encore passé commande !";
  }
}

displayOrderId();

// Suppression du Local Storage
function clearStorage() {
  localStorage.removeItem("orderId");
  localStorage.removeItem("BASKET");
}
clearStorage();
