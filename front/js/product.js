//==============================================================================
// Afficher le produit cliqué en page 1 + ses infos
// Sauvegarder les choix des inputs Couleur + prix pour le panier ( local storage ?? )
//==============================================================================

// Récupération de l'id produit dans l'URL
const usp = new URLSearchParams(window.location.search);
const productID = usp.get("id");

// Requête API sur ID produit + Ajouts des infos sur la page HTML
fetch(`http://localhost:3000/api/products/${productID}`)
.then(function(res){
    return res.json();
})
.then(function(dataList){
    document.querySelector('.item__img').innerHTML += `<img src="${dataList.imageUrl}" alt="${dataList.altTxt}">`;
    document.querySelector('#title').textContent += dataList.name;
    document.querySelector('#price').textContent += dataList.price;
    document.querySelector('#description').textContent += dataList.description;
    // const colors = dataList.colors;
    // console.log(colors);
    // colors.forEach(color =>{
    //     document.querySelector('option').innerHTML += `<option value="${dataList.colors}">${dataList.colors}</option>`;
    // })
})
.catch(function(error){
    console.log(`ERREUR requête ID : ${error}`);
})

/*
let userCart= {
    id : productID,
    color : 'red',
    quantity : 2,
}
console.log(userCart);*/


// Enregistrer dans le local storage les entrées users sous forme d'objet 

// Sur le bouton je crée:
// un EventListener avec un preventDefault()
// Paste les valeurs des inputs dans mon objet userCart
// Sauvegarde dans le local storage
