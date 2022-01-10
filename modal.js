function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements : on pointe les éléments du DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");
const form = document.getElementById("reserve"); //on pointe le formulaire global //const form = document.forms["modalForm"];
const firstName = document.querySelector("input[name=first]");
const lastName = document.querySelector("input[name=last]");
const email = document.querySelector("input[name=email]");
const birthdate = document.querySelector("input[name=birthdate]");
const quantity = document.querySelector("input[name=quantity]");
const city = document.querySelectorAll("input[type=radio]");
const termes = document.querySelector("input[type=checkbox]");
const modalThanks = document.querySelector("#thanks");
const closeThanks = document.querySelector(".closeThanks");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal for
function launchModal() {
  modalbg.style.display = "block";
  modalThanks.style.display = "none"; //le modalThanks n'apparait pas à l'ouverture du formulaire
  let inputs = Array.from(document.querySelectorAll(".input-validate")); //effacer le contour vert des champs
  inputs.forEach((input) => input.classList.remove("input-validate"));
  form.style.display = "block"; // apparition du corps du formulaire
}

//fermeture du formulaire
function closeFormModal() {
  modalbg.style.display = "none";
}

// fermeture du formulaire avec la X
closeModal.addEventListener("click", closeFormModal);

//Evenements
firstName.addEventListener("input", firstValidation);
lastName.addEventListener("input", lastValidation);
email.addEventListener("input", mailValidation);
birthdate.addEventListener("input", birthdateValidation);
quantity.addEventListener("input", quantityValidation);
termes.addEventListener("input", termesValidation);
closeThanks.addEventListener("click", closeFormModal);

for (i = 0; i < city.length; i++) {
  city[i].addEventListener("change", citiesValidation); //evenement sur chaque bouton ville
}
//[].slice.call(city).forEach(city => city.addEventListener('change', citiesValidation))//une autre façon de faire

//validation du champ prénom
function firstValidation() {
  let regexName = /^[A-Za-zÀ-ÿ-']{2,20}$/;
  //console.log(firstName.value);

  if (firstName.value === "") {
    firstName.classList.add("input-error");
    firstName.classList.remove("input-validate");
    firstError.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    return false;
  } else if (regexName.test(firstName.value) === false) {
    firstName.classList.add("input-error");
    firstName.classList.remove("input-validate");
    firstError.innerHTML = "Format incorrect.";
    return false;
  } else {
    firstName.classList.remove("input-error");
    firstName.classList.add("input-validate");
    firstError.innerHTML = "";
    return true;
  }
}

//vérification de la bonne saisie du champ nom avec regex
function lastValidation() {
  let regexName = /^[A-Za-zÀ-ÿ-']{2,20}$/;
  //console.log(lastName.value);

  if (lastName.value.trim() === "") {
    lastName.classList.add("input-error");
    lastName.classList.remove("input-validate");
    lastError.innerHTML = "Veuillez saisir au minimum 2 caractères.";
    return false;
  } else if (regexName.test(lastName.value) == false) {
    lastName.classList.add("input-error");
    lastName.classList.remove("input-validate");
    lastError.innerHTML = "Format incorrect";
    return false;
  } else {
    lastName.classList.remove("input-error");
    lastName.classList.add("input-validate");
    lastError.innerHTML = "";
    return true;
  }
}

// vérification de la bonne saisie du champ email avec regex
function mailValidation() {
  //console.log(email.value);
  let regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RFC 5322

  if (email.value.trim() === "") {
    email.classList.add("input-error");
    email.classList.remove("input-validate");
    emailError.innerHTML = "Veuillez saisir votre adresse mail";
    return false;
  } else if (regexMail.test(email.value) == false) {
    email.classList.add("input-error");
    email.classList.remove("input-validate");
    emailError.innerHTML = "Format incorrect";
    return false;
  } else {
    email.classList.remove("input-error");
    email.classList.add("input-validate");
    emailError.innerHTML = "";
    return true;
  }
}

//verification de la saisie de la date de naissance
function birthdateValidation() {
  let birthdateRegex =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  //console.log(birthdate.value); //Verifier la valeur saisie

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
  if (birthdate.value.trim() === "" || msUserBthd > msToday) {
    birthdate.classList.add("input-error");
    birthdate.classList.remove("input-validate");
    birthdateError.innerHTML = "Veuillez saisir une date valide";
    return false;
  } else if (birthdate.value.match(birthdateRegex) == false) {
    birthdate.classList.add("input-error");
    birthdate.classList.remove("input-validate");
    birthdateError.innerHTML = "Veuillez saisir une date valide";
    return false;

    // si l'utilisateur est âgé de moins de 15 ans à la date d'inscription
  } else if (userAge < 15) {
    birthdate.classList.add("input-error");
    birthdate.classList.remove("input-validate");
    birthdateError.innerHTML = "Age minimum requis 15 ans";
    return false;
  } else {
    birthdate.classList.remove("input-error");
    birthdate.classList.add("input-validate");
    birthdateError.innerHTML = "";
    return true;
  }
}

// Verification quantité participations
function quantityValidation() {
  //console.log(quantity.value);

  if (((quantity.value === "") != quantity.value < 0) != quantity.value > 99) {
    quantity.classList.add("input-error");
    quantity.classList.remove("input-validate");
    quantityError.innerHTML = "Veuillez choisir un nombre de 0 à 99";
    return false;
  } else {
    quantity.classList.remove("input-error");
    quantity.classList.add("input-validate");
    quantityError.innerHTML = "";
    return true;
  }
}

// verification des radios villes
function citiesValidation() {
  console.log(city.value);

  for (let i = 0; i < city.length; i++) {
    //boucle qui vérifie chaque bouton radio
    if (city[i].checked) {
      cityError.innerHTML = "Vous avez choisi " + city[i].value; //on retourne la valeur choisie
      cityError.style.color = "#279e7a";
      return true;
    }
  }
  cityError.innerHTML = "Veuillez choisir une ville";
  return false;
}

// Verification conditions d'utilisation est coché
function termesValidation() {
  //console.log(termes.value);

  if (!termes.checked) {
    conditionError.innerHTML = "Veuillez accepter les conditions d'utilisation";
    return false;
  } else {
    conditionError.innerHTML = "";
    return true;
  }
}

//validation du formulaire global-------------------------------------
//evenement sur le submit et on prévient l'envoi en cas d'erreur
form.addEventListener("submit", (e) => {
  e.preventDefault();
  globalValidation();
});

function globalValidation() {
  // Vérifier que chaque champ est rempli et valide(moyen de repère du champ invalide)

  let validation = true;
  if (!firstValidation()) {
    console.log("%cprénom non valide", "color: #e74c3c");
    validation = false;
  }
  if (!lastValidation()) {
    console.log("%cnom non valide", "color: #e67e22");
    validation = false;
  }
  if (!mailValidation()) {
    console.log("%cmail non valide", "color: #3498db");
    validation = false;
  }
  if (!birthdateValidation()) {
    console.log("%cdate de naissance non valide", "color: #e74c3c");
    validation = false;
  }

  if (!quantityValidation()) {
    console.log("%cnombre d'évènements non valide", "color: #9b59b6");
    validation = false;
  }

  if (!citiesValidation()) {
    console.log("%caucune ville cochée", "color: #1abc9c");
    validation = false;
  }

  if (!termesValidation()) {
    console.log("case conditions d'utilisation non cochée");
    validation = false;
  }

  if (validation === true) {
    formError.innerHTML = ""; // si le formulaire est bien rempli, pas de message d'erreur
    form.reset(); // le formulaire s'efface
    form.style.display = "none"; // Ferme la modale si OK
    openThanksModal(); // Afficher la modale de remerciement si OK, fonction en dessous
  } else {
    formError.innerHTML = "Veuillez renseigner tous les champs"; // Afficher les erreurs si pas OK
  }
}
//ouverture de la modale Thanks si formulaire ok
function openThanksModal() {
  modalThanks.style.display = "block";
}
