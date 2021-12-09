//classe produits
class PRODUCT {
    constructor(colors, _id, name, price, imageUrl, description, altTxt) {
        this.colors = colors;
        this._id = _id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.altTxt = altTxt;
    }
}

// Requête GET API
fetch('http://localhost:3000/api/products')
.then(function(response){
    return response.json();
})
.then(function(jsonListProduct){
    for(let jsonProduct of jsonListProduct){
        let product = new PRODUCT(jsonProduct);
        document.querySelector('#items').innerHTML += 
        `<a href="./product.html?id=42">
            <article>
                <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
         </a>`;
    }
})
.catch(function(error){
    console.log(`Erreur requête de l'api : ${error}`);
})