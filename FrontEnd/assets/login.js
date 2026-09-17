import { loginUser } from "./model.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = await loginUser(email, password);

  if (user && user.token) {
    localStorage.setItem("token", user.token);
    window.location.href = "index.html";
  } else {
    alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
  }
});
