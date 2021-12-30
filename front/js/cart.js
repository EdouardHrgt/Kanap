//Récupération du panier depuis le Local Storage
const basket = JSON.parse(localStorage.getItem("BASKET"));

// Affichage du prix total + quantité totale
let totalPrice = document.querySelector('#totalPrice');
let totalQuantity = document.querySelector('#totalQuantity');
let priceSumDisplay = 0;
let quantitySumDisplay = 0;

function displayTotals(article){
    let priceSumDisplay = basket.map(article => parseInt(article.totalPrice)).reduce((a, b) => a + b);
    totalPrice.innerHTML = priceSumDisplay;
    let quantitySumDisplay  = basket.map(article => parseInt(article.quantity)).reduce((a, b) => a + b);
    totalQuantity.innerHTML = quantitySumDisplay;
}

// Suppression d'un article
function deleteArticle(i){
    basket.splice(i, 1);
    localStorage.setItem("BASKET", JSON.stringify(basket));
    location.reload();
}

// Insertion du contenu HTML
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

     displayTotals(article);
})

// changement de quantité d'un article
const selectQuantity = document.querySelectorAll('.itemQuantity');

selectQuantity.forEach(function(quantity, i){
    quantity.addEventListener("change", () =>{
        
        if(quantity.value <= 0){
            deleteArticle(i);
        } else {
            let newArticlePrice = String(quantity.value * basket[i].price);
            let newArticleQuantity = quantity.value; 

            let displayNewPrice = document.querySelectorAll('#article__price');
            let displayNewQuantity = document.querySelectorAll('.cart__item__content__settings__quantity p');

            displayNewPrice[i].textContent = newArticlePrice + ' €';
            displayNewQuantity[i].textContent = 'Qté : ' + newArticleQuantity;

            basket[i].quantity = quantity.value;
            basket[i].totalPrice = newArticlePrice;
            localStorage.setItem("BASKET", JSON.stringify(basket));
        }

        // Recalcul des totaux affichés lors de l'update du formulaire
        priceSumDisplay = 0;
        quantitySumDisplay = 0;

        basket.forEach(article => {
            displayTotals(article);
        });
    })
})

// Bouton Suppression d'un article
const deleteBtn = document.querySelectorAll('.deleteItem');

deleteBtn.forEach(function(btn, i){
    btn.addEventListener('click', ()=> {
        deleteArticle(i);
    })
})

//.========================================================.
//                 .----- Formulaire -----.
//.========================================================.
const form = document.querySelector('.cart__order__form');
const regexArray = [/^[a-zA-Z\u00C0-\u00FF]*$/, /^[a-zA-Z0-9\s,'-]*$/, /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/];

// Prénom
form.firstName.addEventListener('change', regex1);
function regex1(){
    const regex = regexArray[0];
    const testValue = regex.test(this.value);
    const errorMsg = document.querySelector('#firstNameErrorMsg');

    if(testValue && this.value != "") {
       errorMsg.textContent = "";
       const userValue = this.value;
       return true;
    } else {
        errorMsg.textContent = "Les caractères spéciaux et les chiffres ne sont pas valides";
        tmp1 = true;
        return false;
    }
}

// Nom
form.lastName.addEventListener('change', regex2);
function regex2(){
    const regex = regexArray[0];
    const testValue = regex.test(this.value);
    const errorMsg = document.querySelector('#lastNameErrorMsg');

    if(testValue && this.value != "") {
       errorMsg.textContent = "";
       const userValue = this.value;
       return true;
    } else {
        errorMsg.textContent = "Les caractères spéciaux et les chiffres ne sont pas valides";
        return false;
    }
}

// Adresse 
form.address.addEventListener('change', regex3);
function regex3(){
    const regex = regexArray[1];
    const testValue = regex.test(this.value);
    const errorMsg = document.querySelector('#addressErrorMsg');

    if(testValue && this.value != "") {
       errorMsg.textContent = "";
       const userValue = this.value;
       return true;
    } else {
        errorMsg.textContent = "Merci d'utiliser une adresse valide";
        return false;
    }
}

// Ville 
form.city.addEventListener('change', regex4);
function regex4(){
    const regex = regexArray[2];
    const testValue = regex.test(this.value);
    const errorMsg = document.querySelector('#cityErrorMsg');

    if(testValue && this.value != "") {
       errorMsg.textContent = "";
       const userValue = this.value;
       return true;
    } else {
        errorMsg.textContent = "Veuillez renseigner votre ville";
        return false;
    }
}

// Email
form.email.addEventListener('change', regex5);
function regex5(){
    const regex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    const testValue = regex.test(this.value);
    const errorMsg = document.querySelector('#emailErrorMsg');

    if(testValue && this.value != "") {
       errorMsg.textContent = "";
       const userValue = this.value;
       return true;
    } else {
        errorMsg.textContent = "Merci d'utiliser un Email valide";
        return false;
    }
}

// Bouton SUBMIT
const submitBtn = document.querySelector('#order');

//if(regex1() && regex2() && regex3() && regex4() && regex5()){
submitBtn.addEventListener("click", e => {
    e.preventDefault();
    if(basket.length == 0) {
        console.log("Le panier est vide !");

    } else {
        
        const products = [];
        basket.forEach(article => {
            products.push(article.id);
        });
        const contact = {
            firstName : form.firstName.value,
            lastName : form.lastName.value,
            address : form.address.value,
            city : form.city.value,
            email : form.email.value
        }
        const order = {
            products,
            contact,
        };

        // récupération de l'Id commande par l'API
        const postOptions = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };
        
        fetch("http://localhost:3000/api/products/order", postOptions)
        .then(res => {
            return res.json();
        })
        .then(dataList =>{ 
            console.log(dataList.orderId);
            localStorage.setItem("orderId", JSON.stringify(dataList.orderId));
            document.location.href = "confirmation.html";
        })
        .catch(error => {
            console.log(`ERREUR requete POST : ${error}`);
        })
    }
});
/*
} else {
    console.log("le formulaire est vide !");
}*/