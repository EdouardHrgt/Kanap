//Récupération du panier depuis le Local Storage
const basket = JSON.parse(localStorage.getItem("BASKET"));

// Ajouts de tous les articles à la page HTML
basket.forEach(article =>{
    document.querySelector('#cart__items').innerHTML +=
    `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
        <div class="cart__item__img">
            <img src="${article.image}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${article.color}</p>
                <p id="article__price">${article.totalPrice} €</p>
            </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${article.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
     </article>`;
})

function sum(){
    basket.forEach(article =>{
        let totalSum = parseFloat(article.totalPrice + article.totalPrice);
        console.log(totalSum);
    })
}
sum();
// Affiche du prix total du panier
let totalPrice = document.querySelector('#totalPrice');
// console.log(totalPrice.innerHTML);


// changement de quantité d'un article
const selectQuantity = document.querySelectorAll('.itemQuantity');

selectQuantity.forEach(function(quantity, i){
    quantity.addEventListener("change", () =>{
        if(quantity.value <= 0){
            //Je supprime l'article
            console.log(`Article : ${basket[i].name} supprimé du panier`);
        } else {
            let newArticlePrice = quantity.value * basket[i].price;
            document.querySelector('#article__price').textContent = newArticlePrice + ' €';
            console.log(`prix changé pour ${basket[i].name}`);
        }

    })
})

// Suppression d'un article
const deleteBtn = document.querySelectorAll('.deleteItem');

deleteBtn.forEach(function(btn, i){
btn.addEventListener("click", () => {
    console.log(`Article : ${basket[i].name} supprimé !`);
    delete basket[i];
    console.log(basket);
    saveToBasket(basket);
    })
    /* Besoin de :
    - Supprimer un objet ciblé de l'array panier
    - sauvegarder le nouveau panier (avec x objets en moins) dans le local storage
    - Mettre à jour la page pour afficher le HTML sans les anciens articles (pas besoin si local storage update ? *********)
    */
})

// Enregistrement du panier dans le local storage
function saveToBasket(basketArray){
    localStorage.setItem("BASKET", JSON.stringify(basketArray));
}

// récupération du local storage
function getFromBasket(){
    return localStorage.getItem("BASKET");
}


