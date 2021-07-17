'use strict';

const UI = {
    productsContainer: document.getElementById('products-container'),
    btnAddProduct: document.querySelector('button'),
    btnSave: document.querySelector('.button-save')
};

const unicId = () => Math.floor(Math.random() * 99999) + Date.now();

class Product {
    constructor(name, price, description, key) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.key = key;
    }
}


// for field edit
let prevSelectedField = null;
let prevSelectedInput = null;


// default products
let productsTmpArr = [
    new Product('Milk', 30, 'White fluid from cow', unicId()),
    new Product('Apple', 18, 'Fruit from tree', unicId()),
    new Product('Bread', 15, 'Food made from flour', unicId())
];

// get products from localStorage 
let localStorageProducts = [];
for(let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    localStorageProducts.push(value);
}


// set default products from localStorage if localStorage isn't empty. else set from productsTmpArr and add to localStorage
if(localStorageProducts.length != 0) {
    // update productsTmpArr with data from localStorage
    productsTmpArr = localStorageProducts;
    addDefaultProducts(productsTmpArr);
}
else {
    addDefaultProducts(productsTmpArr, true);
}


// save changes for editing
document.onkeydown = function(e) {
    if(e.ctrlKey == true && e.code == "KeyS") {
        e.preventDefault();
        if(prevSelectedInput != null) {
            if(isInputsValid([prevSelectedInput])) {
                // hide input / show div
                prevSelectedField.innerText = prevSelectedInput.value;
                prevSelectedField.classList.remove('hidden');
                prevSelectedInput.classList.add('hidden');


                // save changed field to localStorage
                let product = prevSelectedInput.parentNode;
                // each product has class named as id (this class has idx = 1)
                let key = product.classList[1];
                let srchObj = productsTmpArr.find(item => item.key == key);
                console.log(key);
                console.log(srchObj);

                // find out which field was edited
                if(prevSelectedInput.classList.contains('input-name')) {
                    srchObj.name = prevSelectedInput.value;
                }
                if(prevSelectedInput.classList.contains('input-price')) {
                    srchObj.price = prevSelectedInput.value;
                }
                if(prevSelectedInput.classList.contains('input-description')) {
                    srchObj.description = prevSelectedInput.value;
                }

                // rewrite obj
                localStorage.setItem(key, JSON.stringify(srchObj));
            }
        }
    }
};


// add new product
UI.btnAddProduct.onclick = function() {
    // you can add another product only after save this one
    UI.btnAddProduct.classList.add('hidden');

    // create empty product
    let newProductKey = unicId();
    let emptyProduct = new Product();
    emptyProduct.key = newProductKey;
    let newProduct = createProduct(emptyProduct);
    
    // hide divs
    let divs = newProduct.querySelectorAll('.product-item');
    divs.forEach(element => {
            element.classList.add('hidden');
    });

    
    // show inputs and add placeholder to them for input convenience
    let divInputs = newProduct.querySelectorAll('.product-input');
    for(let i = 0 ; i < divInputs.length; i++) {
        divInputs[i].classList.remove('hidden');

        if(divInputs[i].classList.contains('input-name')) {
            divInputs[i].setAttribute('placeholder', 'Name');
        }
        if(divInputs[i].classList.contains('input-price')) {
            divInputs[i].setAttribute('placeholder', 'Price');
        }
        if(divInputs[i].classList.contains('input-description')) {
            divInputs[i].setAttribute('placeholder', 'Description');
        }
    }

    // add temporary btnSave to product 
    newProduct.style.height = '250px'; // make temporary place for btn
    let btnSave = document.createElement('button');
    btnSave.classList.add('button-save');
    btnSave.innerText = 'save';

    btnSave.onclick = function() {
        if(isInputsValid(divInputs)) {
            // show divs / hide inputs
            divInputs.forEach(element => {
                element.classList.add('hidden');
            });

            
            // also create obj to save a new product to localStorage
            let newProductObj = new Product();
            for(let i = 0 ; i < divInputs.length; i++) {
                if(divInputs[i].classList.contains('input-name')) {
                    newProductObj.name = divInputs[i].value;
                }
                if(divInputs[i].classList.contains('input-price')) {
                    newProductObj.price = divInputs[i].value;
                }
                if(divInputs[i].classList.contains('input-description')) {
                    newProductObj.description = divInputs[i].value;
                }

                divs[i].innerText = divInputs[i].value;
                divs[i].classList.remove('hidden');
            }

            // remove button, set normal product height, show btnAddProduct
            newProduct.removeChild(btnSave);
            newProduct.style.height = '200px';
            UI.btnAddProduct.classList.remove('hidden');           

            
            newProductObj.key = newProductKey;

            // add new product into productsTmpArr to get possibility edit it later
            productsTmpArr.push(newProductObj);

            // save to object and to local storage
            localStorage.setItem(newProductKey, JSON.stringify(newProductObj));
        }
    };


    newProduct.appendChild(btnSave);
    UI.productsContainer.appendChild(newProduct);
}






// functions
function addDefaultProducts(products, addToLocalStorage = false) {
    for(let i = 0 ; i < products.length; i++) {
        UI.productsContainer.appendChild(createProduct(products[i]));
        if(addToLocalStorage) {
            localStorage.setItem(products[i].key, JSON.stringify(products[i]));
        }
    }
}

function createHtmlElement(tag, classList, innerText = '') {
    let newElement = document.createElement(tag);
    for(let i = 0 ; i < classList.length; i++) {
        newElement.classList.add(classList[i]);
    }
    if(tag === 'input') {
        newElement.setAttribute('value', `${innerText}`);
        newElement.setAttribute('maxlength', '16');
    }
    else if(innerText != '') {
        if(tag === 'textarea') {
            newElement.setAttribute('maxlength', '32');
        }
        newElement.innerText = innerText;
    }
    return newElement;
}

function createProduct(product) {
    // main element
    let divParent = createHtmlElement('div', ['product', `${product.key}`]);
    // name field
    let divName = createHtmlElement('div', ['product-item', 'product-name'], product.name);
    // price field
    let divPrice = createHtmlElement('div', ['product-item', 'product-price'], product.price);
    // description field
    let divDescription = createHtmlElement('div', ['product-item', 'product-description'], product.description);


    // create inputs the same way for every field (but hide these elements)
    let inputName = createHtmlElement('input', ['product-input', 'input-name', 'hidden'], product.name);
    let inputPrice = createHtmlElement('input', ['product-input', 'input-price', 'hidden'], product.price);
    let inputDescription = createHtmlElement('textarea', ['product-input', 'input-description', 'hidden'], product.description);
    

    // set events and add to divParent (to product) all these elements
    let divFields = [divName, divPrice, divDescription];
    let divInputs = [inputName, inputPrice, inputDescription];

    for(let i = 0 ; i < divFields.length; i++) {
        divFields[i].ondblclick = function() {
            divFields[i].classList.add('hidden');
            divInputs[i].classList.remove('hidden');

            // at the same time it's possible to choose only one field to edit
            if(prevSelectedField != null && prevSelectedField != divFields[i]) {
                prevSelectedField.classList.remove('hidden');
                prevSelectedInput.classList.add('hidden');
            }
            prevSelectedField = divFields[i];
            prevSelectedInput = divInputs[i];
        };

        divParent.appendChild(divFields[i]);
        divParent.appendChild(divInputs[i]);  
    }

    return divParent;
}

function isFieldEmpty(str) {
    return str.length == 0;
}

function isInputsValid(inputs) {
    for(let i = 0 ; i < inputs.length; i++) {
        if(inputs[i].classList.contains('input-name')) {
            if(isFieldEmpty(inputs[i].value)) {
                alert('Product name can\'t be empty');
                return false;
            }
        }
        if(inputs[i].classList.contains('input-price')) {
            if(isFieldEmpty(inputs[i].value)) {
                alert('Product price can\'t be empty');
                return false;
            }
            if(!Number(inputs[i].value)) {
                alert('Product price is not a number');
                return false;
            }
        }
        if(inputs[i].classList.contains('input-description')) {
            if(isFieldEmpty(inputs[i].value)) {
                alert('Product description can\'t be empty');
                return false;
            }
        }
    }
    return true;
}

