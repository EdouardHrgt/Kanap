
    /*
    dataList.colors.forEach(color =>{
        let newOption = document.createElement("option");
        newOption.innerHTML = `${color}`;
        newOption.value = `${color}`;
        let parentNode = document.querySelector("option");
        parentNode.appendChild(newOption);
    })
    */
    
    /*
    let parentNode = document.querySelector('option');
    let productColors = dataList.colors;
    productColors.forEach(function(color, i){
        let optionNode = `<option value="${productColors[i]}">${productColors[i]}</option>`;
        console.log(optionNode);
        parentNode.appendChild(optionNode);
    })
    */


    
// Récupération des options choisies (coleur + prix)
let quantity = document.querySelector('#quantity').value;
console.log(quantity);
let colorChoice = document.querySelector('#colors').value;
console.log(colorChoice);
function getColorChoice(){
    let colorSelection = document.querySelector('#colors').value;
    console.log(colorSelection);
    return colorSelection;
}

// Enregistrer dans le local storage les entrées users sous forme d'objet 
// Sur le bouton je crée:
// un EventListener avec un preventDefault()
// Paste les valeurs des inputs dans mon objet userCart
// Sauvegarde dans le local storage
/*
let userCart= {
    id : productID,
    color : 'red',
    quantity : 2,
}
*/