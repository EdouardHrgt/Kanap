//Récupération du Local Storage
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

// Enregistrement du panier dans le local storage *************************** DOUBLON 
function saveToBasket(basketArray){
    localStorage.setItem("BASKET", JSON.stringify(basketArray));
}

// récupération du local storage ************************** DOUBLON 
function getFromBasket(){
    return localStorage.getItem("BASKET");
}
// Event listener du click pour suppression des articles
const deleteBtn = document.querySelectorAll('.deleteItem');

deleteBtn.forEach(function(btn, i){
btn.addEventListener("click", () => {
    console.log(`Article : ${basket[i].name} supprimé !`);
    delete basket[i];
    console.log(basket);
    saveToBasket(basket);
    })
})


// event listener sur le changement de quantité
const selectQuantity = document.querySelectorAll('.itemQuantity');

selectQuantity.forEach(quantity => {

    quantity.addEventListener("change", () => {

        let newArticlePrice = quantity.value * article.price;
        document.querySelector('#article__price').textContent = newArticlePrice;
        console.log(`prix changé pour ${article.name}`);
    })
})

