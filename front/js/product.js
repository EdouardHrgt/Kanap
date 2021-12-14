// Récupération et création de l'objet ID produit
const usp = new URLSearchParams(window.location.search);
const articleID = usp.get("id");

// Requête API sur ID produit + Ajouts des infos sur la page HTML
fetch(`http://localhost:3000/api/products/${articleID}`)
.then(res =>{
    return res.json();
})
.then(dataList =>{
    document.querySelector('.item__img').innerHTML += `<img src="${dataList.imageUrl}" alt="${dataList.altTxt}">`;
    document.querySelector('#title').textContent += dataList.name;
    document.querySelector('#price').textContent += dataList.price;
    document.querySelector('#description').textContent += dataList.description;

    dataList.colors.forEach(color =>{
        
        let newOption = document.createElement("option");
        newOption.innerHTML = `${color}`;
        newOption.value = `${color}`;

        let parentNode = document.querySelector("#colors");
        parentNode.appendChild(newOption);
    }) 
})
.catch(error =>{
    console.log(`ERREUR Page 2 : ${error}`);
})

// Enregistrement du panier dans le local storage
function saveToBasket(basketArray){
    localStorage.setItem("BASKET", JSON.stringify(basketArray));
}

// récupération du local storage
function getFromBasket(){
    return localStorage.getItem("BASKET");
}

// vérification s'il y a un doublon dans le local storage
function checkSameArticle(article){
    const basketArray = JSON.parse(getFromBasket());

    let findSameIndex = basketArray.findIndex(object => 
        object.id == article.id && object.color == article.color
        );

    return findSameIndex;
}

// Ajout d'un article au panier du Local Storage
function addToBasket(article){
    const basket = getFromBasket();

    if (!basket) {
        let basketArray = [];
        basketArray.push(article);
        saveToBasket(basketArray);
    } else {
        basketArray = JSON.parse(basket);
        const sameArticleIndex = checkSameArticle(article);
        if (sameArticleIndex >= 0) {
            basketArray[sameArticleIndex].quantity = String(parseFloat(basketArray[sameArticleIndex].quantity) + parseFloat(article.quantity));
        } else {
            basketArray.push(article);
        }
        saveToBasket(basketArray);
    }
}

// Création d'un article + envoi au locastorage
function getArticle() {
    const quantity = document.querySelector('#quantity');
    const color = document.querySelector('#colors');

    if (color.value == "") {
        color.setCustomValidity("Veuillez selectionner une couleur");
        alert('Merci de selectionner une couleur');
    } else {
        let article = {
            id : `${articleID}`,
            name : document.querySelector('#title').textContent,
            color : `${color.value}`,
            quantity : `${quantity.value}`    
        };
        addToBasket(article);
        alert('Article ajouté au panier');
    }
}

//Event Listener sur le bouton 
const btn = document.querySelector('#addToCart');
btn.addEventListener('click', getArticle);



