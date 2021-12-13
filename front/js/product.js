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
function saveToBasket(basket){
    localStorage.setItem("BASKET", JSON.stringify(basket));
}

// Addition des articles identiques dans le local storage
function sameProductAdded(product){
 // si id pareille et couleur pareille on additionne la quantité
}

// Ajout d'un article au panier
function addToBasket(product){
    const productAdded = localStorage.getItem("BASKET");

    if(productAdded){
        basketArray = JSON.parse(productAdded);
        basketArray.push(product);
        saveToBasket(basketArray);
    }else{
        basketArray = [];
        basketArray.push(product);
        saveToBasket(basketArray);
    }
}

// Création d'un article dans le local storage
function getProduct() {
    const quantity = document.querySelector('#quantity');
    const color = document.querySelector('#colors');

    if(color.value == "") {
        alert('Veuillez choisir une couleur');
    } else {
        let article = {
            quantity : `${quantity.value}`,
            color : `${color.value}`,
            productID : `${productID}`,
            price : document.querySelector("#price").textContent
        };
        addToBasket(article);
    }
}

//Event Listener sur le bouton 
const btn = document.querySelector('#addToCart');
btn.addEventListener('click', getProduct);


