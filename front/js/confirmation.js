// Affichage de la commande sur la page HTML
function displayOrderId(){
const orderId = JSON.parse(localStorage.getItem("orderId"));
const idHtmlDisplay = document.querySelector('#orderId');
if(orderId){
    idHtmlDisplay.textContent = String(orderId);
} else {
    idHtmlDisplay.textContent = "Commande vide :-( ";
    }
};
displayOrderId();

// Suppression du Local Storage
function clearStorage(){
    //Supprimer chaque élément un par un et pas via "localStorage.clear()"
    localStorage.removeItem("orderId");
    localStorage.removeItem("BASKET");
};
clearStorage();