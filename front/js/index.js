// Requête GET sur l'api + Ajout des 8 objets reçus sur la page HTML.
fetch('http://localhost:3000/api/products')
.then(res =>{
    return res.json();
})
.then(dataList =>{
    dataList.forEach(data => {
      document.querySelector("#items").innerHTML += 
      `<a href="./product.html?id=${data._id}">
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
.catch(error =>{
  console.log(`ERREUR Page 1 : ${error}`);
})