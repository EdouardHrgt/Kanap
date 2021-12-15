const form = document.querySelector('.cart__order__form');

// ***** Events des INPUTS *****
// Prénom
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});
// Nom
form.lastName.addEventListener('change', function() {
    validLastName(this);
});
// Adresse 
form.address.addEventListener('change', function() {
    validAddress(this);
});
// Ville 
form.city.addEventListener('change', function() {
    validCity(this);
});
// Email
form.email.addEventListener('change', function() {
    validEmail(this);
});

// ***** Validation REGEXP *****
// Prénom
const validFirstName = function(inputFirstName) {
    let firstNameRegExp = /^[a-zA-Z\u00C0-\u00FF]*$/;
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    let errorMsg = document.querySelector('#firstNameErrorMsg');
    if(testFirstName) {
       errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Les caractères spéciaux et les chiffres ne sont pas valides";
    }
};
// Nom
const validLastName = function(inputLastName) {
    let lastNameRegExp = /^[a-zA-Z\u00C0-\u00FF]*$/;
    let testLastName = lastNameRegExp.test(inputLastName.value);
    let errorMsg = document.querySelector('#lastNameErrorMsg');
    if(testLastName) {
       errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Les caractères spéciaux et les chiffres ne sont pas valides";
    }
};
// Adresse
const validAddress = function(inputAddress) {
    let addressRegExp = /^[a-zA-Z0-9\s,'-]*$/;
    let testAddress = addressRegExp.test(inputAddress.value);
    let errorMsg = document.querySelector('#addressErrorMsg');
    if(testAddress) {
       errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Les caractères spéciaux ne sont pas valides";
    }
};
// Ville
const validCity = function(inputCity) {
    let cityRegExp = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    let testCity = cityRegExp.test(inputCity.value);
    let errorMsg = document.querySelector('#cityErrorMsg');
    if(testCity) {
       errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Les caractères spéciaux et les chiffres ne sont pas valides";
    }
};
// Email
const validEmail = function(inputEmail) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testEmail = emailRegExp.test(inputEmail.value);
    let errorMsg = document.querySelector('#emailErrorMsg');
    if(testEmail) {
       errorMsg.textContent = "";
    } else {
        errorMsg.textContent = "Merci d'utiliser un Email valide";
    }
};

// ***** Bouton SUBMIT *****
const submitBtn = document.querySelector('#order');

submitBtn.addEventListener("click", function(e){
    e.preventDefault();
    console.log('je submit le panier');
})