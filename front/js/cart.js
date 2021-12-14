//==============================================================================
// Afficher les produits selectionnés avec leurs options ( couleur, quantité)
// Modifier la quantité ou supprimer un produit
// Total du panier se met à jour
// inputs users vérifiés
//==============================================================================

//Récupération du Local Storage
const basket = JSON.parse(localStorage.getItem("BASKET"));

// Ajouts de tous les articles à la page HTML
basket.forEach(article =>{
    document.querySelector('#cart__items').innerHTML +=
    `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
        <div class="cart__item__img">
            <img src="../images/logo.png" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${article.color}</p>
                <p>42,00 €</p>
            </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${article.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
     </article>`;
})


// Event listener du click pour suppression des articles
const deleteBtn = document.querySelectorAll('.deleteItem');
deleteBtn.forEach(btn =>{
    btn.addEventListener("click", () => {
        console.log('je supprime un article');
    })
})

// event listener sur le changement de quantité
const selectQuantity = document.querySelectorAll('.itemQuantity');
selectQuantity.forEach(quantity => {
    quantity.addEventListener("change", () => {
        console.log(`Je change la quantité à : ${quantity.value}`);
    })
})


// Calculer le prix de chaque article en fonction de la quantité 

// Calculer le montant total du panier


//=================================================
//               ____ Formulaire  ____
//=================================================