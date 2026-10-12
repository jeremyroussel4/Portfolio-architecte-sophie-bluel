import { isAuthenticated, logoutUser } from "./authService.js";
import { loadWorks } from "./worksService.js";
import { initializeModal } from "./modal.js";

export async function startApplication() {
  // On attend le chargement des travaux avant de construire la page.
  const works = await loadWorks();

  // Une fois les données reçues, on initialise la galerie, les filtres et la modale.
  initializePage(works);
  initializeModal(works, displayWorks);
}

function initializePage(works) {
  // Ces fonctions utilisent les mêmes données pour afficher la page complète.
  createFilters(works);
  displayWorks(works);
  setupAdminMode();
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  // On vide la galerie avant de la remplir, notamment après un changement de filtre.
  gallery.innerHTML = "";

  // Les éléments HTML sont créés directement en JavaScript pour chaque travail.
  works.forEach((work) => {
    const { imageUrl, title } = work;
    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;
    figure.append(image, figcaption);
  });
}

function createFilters(works) {
  const filters = document.querySelector(".filters");
  const allButton = document.createElement("button");
  // map récupère les catégories, puis Set supprime les éventuels doublons.
  const categories = [...new Set(works.map((work) => work.category.name))];

  allButton.classList.add("button", "active");
  allButton.textContent = "Tous";
  filters.appendChild(allButton);

  allButton.addEventListener("click", () => {
    // Un seul bouton peut être actif à la fois.
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    allButton.classList.add("active");
    displayWorks(works);
  });

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = category;
    filters.appendChild(button);

    button.addEventListener("click", () => {
      // On retire l'état actif de tous les boutons avant de l'ajouter au bouton cliqué.
      const buttons = document.querySelectorAll(".filters button");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      button.classList.add("active");

      // filter conserve uniquement les travaux de la catégorie sélectionnée.
      const filteredWorks = works.filter(
        (work) => work.category.name === category,
      );
      displayWorks(filteredWorks);
    });
  });
}

function setupAdminMode() {
  // La présence d'un token permet de savoir si l'utilisateur est connecté.
  const isAdmin = isAuthenticated();

  // Cette classe CSS permet d'afficher ou de masquer les éléments réservés à l'administrateur.
  document.body.classList.toggle("admin-mode", isAdmin);

  const loginLink = document.querySelector(".login-link");
  // Le même lien permet de se connecter ou de se déconnecter selon l'état de l'utilisateur.
  loginLink.textContent = isAdmin ? "logout" : "login";

  if (!isAdmin) {
    return;
  }

  loginLink.href = "#";
  loginLink.addEventListener("click", (event) => {
    // On empêche le lien de recharger la page et on lance la déconnexion.
    event.preventDefault();
    logoutUser();
  });
}
