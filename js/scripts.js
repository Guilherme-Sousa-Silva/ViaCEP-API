// Selecionando os elementos através do DOM
const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const numberInput = document.querySelector("#number");
const complementInput = document.querySelector("#complement");
const neighborhoodInput = document.querySelector("#neighborhood");
const cityInput = document.querySelector("#city");
const regionInput = document.querySelector("#region");
const formInput = document.querySelectorAll("[data-input]");
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");


// Validate CEP input 
cepInput.addEventListener("keypress", (e) => {

    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    
    // allow only numbers
    if(!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
});

// GET address event 
cepInput.addEventListener("keyup", (e) => {

    const inputValue = e.target.value;

    //check we have the correct length
    if(inputValue.length == 8) {
        getAddress(inputValue);
    }
});

// GET customer address from API
const getAddress = async (cep) => {
    toggleLoader();

    cepInput.blur();
    const apiURL = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);

    // Show error and reset Form
    if(data.erro === true){
        if (!addressInput.hasAttribute("disabled")) {
            toggleDisabled();
        }
        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido, tente novamente.");
        return;
    }

    if (addressInput.value === ""){
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;
    toggleLoader();
    
};

// Show or hide loader
const toggleLoader = () => {
    const loader = document.querySelector("#loader")

    fadeElement.classList.toggle("hide");
    loader.classList.toggle("hide");
}

// Show or hide message
const toggleMessage = (msg) => {
    const message = document.querySelector("#message");
    const messageText = document.querySelector("#message p");

    messageText.innerText = msg;

    fadeElement.classList.toggle("hide");
    message.classList.toggle("hide");
}

// Close message modal
closeButton.addEventListener("click", () => toggleMessage());

// Add or remove disabled attribute
const toggleDisabled = () => {
    if(regionInput.hasAttribute("disabled")){
        formInput.forEach((input) => {
            input.removeAttribute("disabled");
        })
    } else {
        formInput.forEach((input) => {
            input.setAttribute("disabled", "disabled");
        })
    }
}

