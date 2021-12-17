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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//mon travail ------------------------------------------------

// close modal form when click on X
const close = document.querySelector(".close");
close.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// variables
const validationFormulaire = document.getElementById("form"); //on pointe le formulaire global
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const anniversaire = document.getElementById("birthdate");

const termes = document.getElementById("checkbox1");

//evenement sur le click
validationFormulaire.addEventListener("submit", (e) => {
  e.preventDefault(); //prevenir du changement de page au submit
});

//écoute du champ Prénom et vérification de la bonne saisie avec regex
document.getElementById("first").addEventListener("input", (e) => {
  let erreurPrenom = document.getElementById("erreurPrenom"); //pointe le "span" ajouté à l'html
  let regexPrenom = /^[A-Za-zÀ-ÿ-']{2,20}$/; //de 2 à 20 caractères, n'accepte pas les espaces
  let prenomValue = e.target.value;

  if (prenomValue === "") {
    erreurPrenom.innerHTML = "Veuillez saisir au minimum 2 caractères.";
  } else if (regexPrenom.test(prenomValue) == false) {
    erreurPrenom.innerHTML = "Format incorrect";
  } else {
    erreurPrenom.innerHTML = "";
  }
});

//écoute du champ Nom et vérification de la bonne saisie avec regex
document.getElementById("last").addEventListener("input", (e) => {
  let erreurNom = document.getElementById("erreurNom");
  let regexNom = /^[A-Za-zÀ-ÿ-']{2,20}$/;
  let nomValue = e.target.value;

  if (nomValue === "") {
    erreurNom.innerHTML = "Veuillez saisir au minimum 2 caractères.";
  } else if (regexNom.test(nomValue) == false) {
    erreurNom.innerHTML = "Format incorrect";
  } else {
    erreurNom.innerHTML = "";
  }
});

//écoute du champ email et vérification de la bonne saisie avec regex
document.getElementById("email").addEventListener("input", (e) => {
  let erreurMail = document.getElementById("erreurMail");
  let regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RFC 5322
  let mailValue = e.target.value;

  if (mailValue === "") {
    erreurMail.innerHTML = "Veuillez saisir un email valide";
  } else if (regexMail.test(mailValue) == false) {
    erreurMail.innerHTML = "Format incorrect";
  } else {
    erreurMail.innerHTML = "";
  }
});

/*//verification de la saisie de la date de naissance
document.getElementById("birthdate").addEventListener("input", (e) => {
  let erreurBirthdate = document.getElementById("erreurBirthdate");
  let regexAnniversaire =
    /"^(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}$"/;
  let anniversaireValue = e.target.value;

  if (anniversaireValue === "") {
    erreurBirthdate.innerHTML = "Veuillez saisir un email valide";
  } else if (regexAnniversaire.test(mailValue) == false) {
    erreurBirthdate.innerHTML = "Format incorrect";
  } else {
    erreurBirthdate.innerHTML = "";
  }
});*/

// Verification conditions d'utilisation est coché
document.getElementById("checkbox1").addEventListener("click", (e) => {
  if (!termes.checked) {
    erreurTermes.innerHTML = "Veuillez accepter les conditions d'utilisation";
  } else {
    erreurTermes.innerHTML = "";
  }
});
