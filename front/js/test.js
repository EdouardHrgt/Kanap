



// Récupération et création de l'objet ID produit
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

// Requête API sur ID produit + Ajouts des infos sur la page HTML
fetch(`http://localhost:3000/api/products/${productID}`)
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

    return findSameIndex; // = -1 si ya rien ou  n° de l'index en doublon
}

// Ajout d'un article au panier (local storage)
function addToBasket(article){
    const basket = getFromBasket();

    if(basket){
        basketArray = JSON.parse(basket);
        const sameArticleIndex = checkSameArticle(article);
        if(sameArticleIndex >= 0){
            basketArray[sameArticleIndex].quantity = String(parseFloat(basketArray[sameArticleIndex].quantity) + parseFloat(article.quantity));
        } else {
            basketArray.push(article);
        }
        saveToBasket(basketArray);
    }else{
        let basketArray = [];
        basketArray.push(article);
        saveToBasket(basketArray);
    }
}

// Création d'un article
function getProduct() {
    const quantity = document.querySelector('#quantity');
    const color = document.querySelector('#colors');
    const errorMsgDiv = document.querySelector('.item__content__settings__color');
    const errorMsg = document.createElement('p');

    if(color.value == "") {
        errorMsg.innerHTML = "Veuillez selectionner une couleur";
        errorMsg.style.backgroundColor = 'red';
        errorMsgDiv.appendChild(errorMsg);
    } else {
        let article = {
            quantity : `${quantity.value}`,
            color : `${color.value}`,
            id : `${productID}`,
            price : document.querySelector("#price").textContent
        };
        
        addToBasket(article);
    }
}

//Event Listener sur le bouton 
const btn = document.querySelector('#addToCart');
btn.addEventListener('click', getProduct);