//Récupération du panier depuis le Local Storage
const basket = JSON.parse(localStorage.getItem("BASKET"));

// Affichage du prix total + quantité totale
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let priceSumDisplay = 0;
let quantitySumDisplay = 0;

function displayTotals(article) {
  let priceSumDisplay = basket
    .map((article) => parseInt(article.totalPrice))
    .reduce((a, b) => a + b);
  totalPrice.innerHTML = priceSumDisplay;
  let quantitySumDisplay = basket
    .map((article) => parseInt(article.quantity))
    .reduce((a, b) => a + b);
  totalQuantity.innerHTML = quantitySumDisplay;
}

// Suppression d'un article
function deleteArticle(i) {
  basket.splice(i, 1);
  localStorage.setItem("BASKET", JSON.stringify(basket));
  location.reload();
}

// Insertion du contenu HTML
if (basket == null) {
  console.log("panier vide; il n'y a rien a afficher");
} else {
  basket.forEach((article) => {
    document.querySelector(
      "#cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
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
  });
}

// changement de quantité d'un article
const selectQuantity = document.querySelectorAll(".itemQuantity");

selectQuantity.forEach(function (quantity, i) {
  quantity.addEventListener("change", () => {
    if (quantity.value <= 0) {
      deleteArticle(i);
    } else {
      let newArticlePrice = String(quantity.value * basket[i].price);
      let newArticleQuantity = quantity.value;

      let displayNewPrice = document.querySelectorAll("#article__price");
      let displayNewQuantity = document.querySelectorAll(
        ".cart__item__content__settings__quantity p"
      );

      displayNewPrice[i].textContent = newArticlePrice + " €";
      displayNewQuantity[i].textContent = "Qté : " + newArticleQuantity;

      basket[i].quantity = quantity.value;
      basket[i].totalPrice = newArticlePrice;
      localStorage.setItem("BASKET", JSON.stringify(basket));
    }

    // Recalcul des totaux affichés lors de l'update du formulaire
    priceSumDisplay = 0;
    quantitySumDisplay = 0;

    basket.forEach((article) => {
      displayTotals(article);
    });
  });
});

// Bouton Suppression d'un article
const deleteBtn = document.querySelectorAll(".deleteItem");

deleteBtn.forEach(function (btn, i) {
  btn.addEventListener("click", () => {
    deleteArticle(i);
  });
});

// Contrôle du formulaire via Regex
const form = document.querySelector(".cart__order__form");
const regexArray = [
  /^[a-zA-Z\u00C0-\u00FF]*$/,
  /^[a-zA-Z0-9\u00C0-\u00FF\s,'-]*$/,
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
];

function validForm(elmt, i, domElmt, msg) {
  const testValue = regexArray[i].test(elmt.value);
  regexArray[i].test("²");
  const errorMsg = document.querySelector(domElmt);

  if (testValue && elmt.value != "") {
    errorMsg.textContent = "";
    return true;
  } else {
    errorMsg.textContent = msg;
    return false;
  }
}

// Vérification des champs du formulaire
form.firstName.addEventListener("change", () => {
  validForm(
    form.firstName,
    0,
    "#firstNameErrorMsg",
    "Veuillez renseigner votre Prénom"
  );
});

form.lastName.addEventListener("change", () => {
  validForm(
    form.lastName,
    0,
    "#lastNameErrorMsg",
    "Veuillez renseigner votre Nom"
  );
});

form.address.addEventListener("change", () => {
  validForm(
    form.address,
    1,
    "#addressErrorMsg",
    "Veuillez renseigner votre Adresse"
  );
});

form.city.addEventListener("change", () => {
  validForm(form.city, 2, "#cityErrorMsg", "Veuillez renseigner votre Ville");
});

form.email.addEventListener("change", () => {
  validForm(
    form.email,
    3,
    "#emailErrorMsg",
    "Veuillez renseigner un Email valide"
  );
});

// Bouton SUBMIT
const submitBtn = document.querySelector("#order");

submitBtn.addEventListener("click", (e) => {
  const testValid =
    validForm(
      form.firstName,
      0,
      "#firstNameErrorMsg",
      "Veuillez renseigner votre Prénom"
    ) &&
    validForm(
      form.lastName,
      0,
      "#lastNameErrorMsg",
      "Veuillez renseigner votre Nom"
    ) &&
    validForm(
      form.address,
      1,
      "#addressErrorMsg",
      "Veuillez renseigner votre Adresse"
    ) &&
    validForm(
      form.city,
      2,
      "#cityErrorMsg",
      "Veuillez renseigner votre Ville"
    ) &&
    validForm(
      form.email,
      3,
      "#emailErrorMsg",
      "Veuillez renseigner un Email valide"
    );
  e.preventDefault();

  if (testValid) {
    if (basket == null) {
      console.log("Le panier est null !");
    } else if (basket.length == 0) {
      console.log("Le panier est vide !");
    } else {
      const products = [];
      basket.forEach((article) => {
        products.push(article.id);
      });
      const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
      };
      const order = {
        products,
        contact,
      };

      // récupération de l'Id commande par l'API
      const postOptions = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", postOptions)
        .then((res) => {
          return res.json();
        })
        .then((dataList) => {
          localStorage.setItem("orderId", JSON.stringify(dataList.orderId));
          document.location.href = `confirmation.html?id=${dataList.orderId}`;
        })
        .catch((error) => {
          console.log(`ERREUR requete POST : ${error}`);
        });
    }
  } else {
    console.log("formulaire incomplet !");
  }
});
