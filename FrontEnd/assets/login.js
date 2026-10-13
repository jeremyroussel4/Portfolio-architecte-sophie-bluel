import { loginUser } from "./authService.js";

// On récupère le formulaire pour pouvoir écouter sa soumission.
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  // L'envoi est géré par fetch() plutôt que par la soumission HTML classique.
  event.preventDefault();

  // Les valeurs saisies sont récupérées pour être envoyées au backend.
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // L'opérateur ternaire permet de préparer un message si un champ est vide.
  const validationMessage = !email || !password
    ? "Veuillez remplir tous les champs."
    : "";
// Si validationMessage n'est pas vide, on affiche l'alerte et on arrête la fonction.
  if (validationMessage) {
    alert(validationMessage);
    return;
  }
 
  try { // Le bloc try/catch permet de gérer les erreurs de connexion au backend.
    // await attend la réponse du backend avant de poursuivre.
    const user = await loginUser(email, password);

    if (user && user.token) {
      // Le token prouve que l'utilisateur est connecté et est conservé pour les prochaines pages.
      localStorage.setItem("token", user.token);
      window.location.href = "index.html";
    } else {
      alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  } catch (error) {
    // Cette erreur arrive notamment si le backend ne répond pas.
    console.error(error);
    alert("Impossible de contacter le serveur. Vérifiez que le backend est lancé.");
  }
});
