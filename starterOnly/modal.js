function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeModal = document.querySelector(".close");
const formValidation = document.getElementsByTagName("reserve"); //on pointe le formulaire global
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const howMany = document.getElementsByTagName("quantity");
const birthdate = document.getElementById("birthdate");
const towns = document.getElementsByName("location");
const termes = document.getElementById("checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//mon travail ------------------------------------------------
//lier les labels aux ids dans l'html

// close modal form when click on X
closeModal.addEventListener("click", () => {
  modalbg.style.display = "none";
});

//regex
let regexNomPrenom = /^[A-Za-zÀ-ÿ-']{2,20}$/; //de 2 à 20 caractères, n'accepte pas les espaces
let regexMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RFC 5322
let birthdateRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

/*//evenement sur le click
formValidation.addEventListener("submit", (e) => {
  e.preventDefault(); //prevenir du changement de page au submit
});*/

//validation du formulaire dans sa globalité
let formError = document.getElementById("formError");
const inputs = document.querySelectorAll("input");

//console.log(inputs);

reserve.addEventListener("submit", function (e) {
  let inputs = this;

  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value === false) {
      e.preventDefault();
      console.log(inputs[i].value);
      formError = "Veuillez renseigner tous les champs";
      return false;
    }
  }
});

//vérification de la bonne saisie du champ prénom avec regex
firstName.addEventListener("input", function validationPrenom() {
  let erreurPrenom = document.getElementById("firstError"); //pointe le "span" ajouté à l'html
  //console.log(validationPrenom.target.value);

  if (firstName.value === "") {
    firstName.classList.add("input-error");
    erreurPrenom.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    return false;
  } else if (regexNomPrenom.test(firstName.value) === false) {
    firstName.classList.add("input-error");
    erreurPrenom.innerHTML = "Format incorrect.";
    return false;
  } else {
    firstName.classList.remove("input-error");
    erreurPrenom.innerHTML = "";
    return true;
  }
});

//vérification de la bonne saisie du champ nom avec regex
lastName.addEventListener("input", function validationNom() {
  let erreurNom = document.getElementById("lastError");
  //console.log(validationNom.target.value);

  if (lastName.value === "") {
    lastName.classList.add("input-error");
    erreurNom.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    return false;
  } else if (regexNomPrenom.test(lastName.value) == false) {
    lastName.classList.add("input-error");
    erreurNom.innerHTML = "Format incorrect";
    return false;
  } else {
    lastName.classList.remove("input-error");
    erreurNom.innerHTML = "";
    return true;
  }
});

// vérification de la bonne saisie du champ email avec regex
email.addEventListener("input", function mailValidation() {
  let erreurMail = document.getElementById("emailError");
  //console.log(mailValidation.target.value);

  if (email.value === "") {
    email.classList.add("input-error");
    erreurMail.innerHTML = "Veuillez saisir votre adresse mail";
    return false;
  } else if (regexMail.test(email.value) == false) {
    email.classList.add("input-error");
    erreurMail.innerHTML = "Format incorrect";
    return false;
  } else {
    email.classList.remove("input-error");
    erreurMail.innerHTML = "";
    return true;
  }
});

//verification de la saisie de la date de naissance
birthdate.addEventListener("input", function birthdateValidation() {
  let birthdateError = document.getElementById("birthdateError");
  //console.log(birthdateValidation.target.value); Verifier la valeur saisie

  let userBthd = new Date(birthdate.value); //saisie de l'utilisateur
  //console.log(userBthd);

  let msUserBthd = userBthd.getTime(); //convertion en millisecondes
  //console.log(msUserBthd);

  let today = new Date(Date.now()); //variable pour la date du jour de saisie (aujourd'hui)
  //console.log(today);

  let msToday = today.getTime(); //conversion de la date d'aujourd'hui en ms
  //console.log(msToday);

  let userAge = ~~((today - userBthd) / 31557600000); //calcul de l'age de l'utilisateur

  //si la saisie est nulle ou dépasse la date d'aujourd'hui ou le format est faux alors date invalide
  if (birthdate.value === "" || msUserBthd > msToday) {
    birthdate.classList.add("input-error");
    birthdateError.innerHTML = "Veuillez saisir une date valide";
    return false;
  } else if (birthdate.value.match(birthdateRegex) == false) {
    birthdate.classList.add("input-error");
    birthdateError.innerHTML = "Veuillez saisir une date valide";
    return false;

    // si l'utilisateur est âgé de moins de 15 ans à la date d'inscription
  } else if (userAge < 15) {
    birthdate.classList.add("input-error");
    birthdateError.innerHTML = "Age minimum requis 15 ans";
    return false;
  } else {
    birthdate.classList.remove("input-error");
    birthdateError.innerHTML = "";
    return true;
  }
});

// Verification quantité participations
quantity.addEventListener("input", function quantityValidation() {
  let quantityError = document.getElementById("quantityError");
  //console.log(quantityValidation.target.value);

  if ((quantity.value === "") != quantity.value < 0) {
    quantity.classList.add("input-error");
    quantity.classList.remove("input-validate");
    quantityError.innerHTML = "Veuillez choisir un nombre";
    return false;
  } else {
    quantity.classList.remove("input-error");
    quantity.classList.add("input-validate");
    quantityError.innerHTML = "";
    return true;
  }
});

// verification des radios lieux
let locationError = document.getElementById("locationError");

for (let i = 0; i < towns.length; i++) {
  towns[i].addEventListener("input", function locationValidation() {
    if (towns[i].checked) {
      locationError.innerHTML = "Vous avez choisi " + towns[i].value;
      let value = this.value;
      //console.log(value);
      return true;
    } else {
      locationError.innerHTML = "Veuillez choisir une ville";
      return false;
    }
  });
}

// Verification conditions d'utilisation est coché
termes.addEventListener("input", function termesValidation() {
  let conditionError = document.getElementById("conditionError");
  //console.log(termesValidation.target.value);

  if (!termes.checked) {
    conditionError.innerHTML = "Veuillez accepter les conditions d'utilisation";
    return false;
  } else {
    conditionError.innerHTML = "";
    return true;
  }
});
