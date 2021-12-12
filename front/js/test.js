//============================================
// Local storage 
//============================================

// Enregistrer le panier dans L-S
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Récupérer depuis le L-S
function getBasket(){
   return  JSON.parse(localStorage.getItem("basket"));
}


//Ajouter un produit au panier
function addBasket(product){
    let basket = getBasket();
    basket.push(product);
    saveBasket(basket);
}


