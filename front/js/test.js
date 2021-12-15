
//=================================================
//               ____ Formulaire  ____
//=================================================

const form = document.querySelector('.cart__order__form');

// Fonctions de vérification des champs via RegExp par input

function validEmail(inputEmail){
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testEmail = emailRegExp.test(inputEmail.value);
    let errMsg = document.querySelector('#emailErrorMsg');
    if(testEmail) {
        errMsg.textContent = "ok c'est bon";
    } else {
        errMsg.textContent = " alerte c'est pas bon ";
    }
}


// Event listeners sur changement des inputs 
let email = document.querySelector('#email');

// email.addEventListener("change", validEmail(form.email));
email.addEventListener('change', function(){
    console.log(email.value);
})