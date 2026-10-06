import { loginUser } from "./authService.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  // L'envoi est géré par fetch() plutôt que par la soumission HTML classique.
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const validationMessage = !email || !password
    ? "Veuillez remplir tous les champs."
    : "";

  if (validationMessage) {
    alert(validationMessage);
    return;
  }

  try {
    const user = await loginUser(email, password);

    if (user && user.token) {
      localStorage.setItem("token", user.token);
      window.location.href = "index.html";
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  } catch (error) {
    console.error(error);
    alert("Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
  }
});
