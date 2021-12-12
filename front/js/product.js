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

// Récupérer un produit dans le Local Storage
function getFromBasket(){
   JSON.parse(localStorage.getItem("BASKET"));
 }
// Sauvegarder un produit dans le Local Storage
function saveToBasket(basket) {
    localStorage.setItem("BASKET", JSON.stringify(basket));
}
// Ajout d'un produit au panier (array)
function addToBasket(product){
    const productAdded = localStorage.getItem("BASKET");
    let basketArray = product;
    if(productAdded){
        basketArray.JSON.parse(productAdded);
        basketArray.push(product);
        localStorage.setItem('BASKET', JSON.stringify(basketArray));
    }else{
        basketArray = [];
        basketArray.push(product);
        localStorage.setItem('BASKET', JSON.stringify(basketArray));
    }
}
// Création d'un objet produit
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
        console.log(article);
        addToBasket(article);
    }
}


//Event Listener sur le bouton 
const btn = document.querySelector('#addToCart');
btn.addEventListener('click', getProduct);


/*
- Aller lire le storage
- Si il est vide je crée la clé
- S'il est pas vide j'ajoute à la clé existante un nouveau produit en index d'array
- 

*/





