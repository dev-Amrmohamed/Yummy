//* HTML elements
let userName = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let age = document.querySelector("#age");
let pass = document.querySelector("#pass");
let repass = document.querySelector("#repass");
let btn = document.querySelector("#submitBtn");
let usersList = [];
//^ golbal
var myRegex = {
  userName: /^[a-zA-Z ]{3,}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
  phone: /^01[0125][0-9]{8}$/,
  age: /^(1[6-9]|[2-9][0-9])$/,
};
//# Functions

function register() {
  var users = {
    name: userName.value.trim(),
    email: email.value.trim(),
    password: pass.value.trim(),
    phone: phone.value.trim(),
    age: age.value.trim(),
  };

  if (validationInputs(users)) {
    // check if email already exists
    let exists = usersList.some((u) => u.email === users.email);
    if (exists) {
      alert("❌ This email is already registered!");
      return;
    }
    usersList.push(users);
    clearInputs();
    document.querySelector("#signupValid").classList.remove("d-none");
  }
}

function validationInputs(users) {
  var isValid = true;
  //!all empty
  //!regex
  //^ NAME
  if (myRegex.userName.test(users.name)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
    document.querySelector(".nameAlert").classList.add("d-none");
  } else {
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    document.querySelector(".nameAlert").classList.remove("d-none");
    isValid = false;
  }

  //^EMAIL
  if (myRegex.email.test(users.email)) {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
    document.querySelector(".emailAlert").classList.add("d-none");
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    document.querySelector(".emailAlert").classList.remove("d-none");
    isValid = false;
  }

  //^ PASSWORD
  if (myRegex.password.test(users.password)) {
    pass.classList.add("is-valid");
    pass.classList.remove("is-invalid");
    document.querySelector(".passwordAlert").classList.add("d-none");
  } else {
    pass.classList.remove("is-valid");
    pass.classList.add("is-invalid");
    document.querySelector(".passwordAlert").classList.remove("d-none");
    isValid = false;
  }
  //^ PASSWORD-CONFIRM
  if (pass.value !== repass.value || repass.value == "") {
    repass.classList.add("is-invalid");
    repass.classList.remove("is-valid");
    document.querySelector(".conPasswordAlert").classList.remove("d-none");
    isValid = false;
  } else {
    repass.classList.remove("is-invalid");
    repass.classList.add("is-valid");
    document.querySelector(".conPasswordAlert").classList.add("d-none");
  }
  //^ PHONE
  if (myRegex.phone.test(phone.value.trim())) {
    phone.classList.add("is-valid");
    phone.classList.remove("is-invalid");
    document.querySelector(".phoneAlert").classList.add("d-none");
  } else {
    phone.classList.remove("is-valid");
    phone.classList.add("is-invalid");
    document.querySelector(".phoneAlert").classList.remove("d-none");
    isValid = false;
  }

  //^ AGE
  if (myRegex.age.test(age.value.trim())) {
    age.classList.add("is-valid");
    age.classList.remove("is-invalid");
    document.querySelector(".ageAlert").classList.add("d-none");
  } else {
    age.classList.remove("is-valid");
    age.classList.add("is-invalid");
    document.querySelector(".ageAlert").classList.remove("d-none");
    isValid = false;
  }

  return isValid;
}

function clearInputs() {
  userName.value = "";
  email.value = "";
  phone.value = "";
  age.value = "";
  pass.value = "";
  repass.value = "";

  let inputs = [userName, email, phone, age, pass, repass];
  for (let input of inputs) {
    input.classList.remove("is-valid", "is-invalid");
  }
}
function showLoader() {
  loader.classList.remove("d-none");
}
function hideLoader() {
  loader.classList.add("d-none");
}
//& Events
btn.addEventListener("click", function () {
  showLoader();
  register();
  hideLoader();
});
