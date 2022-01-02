// Affichage du numéro de commande sur la page
function displayOrderId(){

const orderId = JSON.parse(localStorage.getItem("orderId"));
const displayId = document.querySelector('#orderId');
const errMsg = document.querySelector('.confirmation p');

if(orderId){
    displayId.textContent = String(orderId);
} else {
    errMsg.textContent = "Vous n'avez pas passé commande !";
    setTimeout(console.log("Y s'passe un truc au bout de 5s"), 5000);
    }
    //document.location.href = "index.html"
};

displayOrderId();

// Suppression du Local Storage
function clearStorage(){
    localStorage.removeItem("orderId");
    localStorage.removeItem("BASKET");
};
clearStorage();