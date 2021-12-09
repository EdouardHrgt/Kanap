// Afficher tous les produits  avec les infos suivantes :
// Image + Nom + Description
//==============================================================================
//==============================================================================

// Requête GET sur l'api + Ajout des 8 objets reçus sur la page HTML.
fetch('http://localhost:3000/api/products')
.then(function(res){
    return res.json();
})
.then(function(dataList){
    dataList.forEach(data => {
      console.log(data._id);
      document.querySelector("#items").innerHTML += `<a href="./product.html?id=${data._id}">
      <article>
        <img
          src="${data.imageUrl}"
          alt="${data.altTxt}"
        />
        <h3 class="productName">Kanap ${data.name}</h3>
        <p class="productDescription">${data.description}</p>
      </article>
    </a>`;  
    })
})
.catch(function(error){
  console.log(`ERREUR requête API : ${error}`);
})

