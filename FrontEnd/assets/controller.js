import { loadWorks } from "./model.js";

export async function startApplication() {
  console.log("[CONTROLLER] Démarrage et demande des travaux au model");

  const works = await loadWorks();

  createFilters(works);
  displayWorks(works);
  setupAdminMode();
}

function createFilters(works) {
  const filters = document.querySelector(".filters");
  const allButton = document.createElement("button");
  const categories = [...new Set(works.map((work) => work.category.name))];

  // version modernisée !
  allButton.classList.add("button", "active");
  allButton.textContent = "Tous";
  filters.appendChild(allButton);

  allButton.addEventListener("click", () => {
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
      const buttons = document.querySelectorAll(".filters button");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      button.classList.add("active");
      const filteredWorks = works.filter(
        (work) => work.category.name === category,
      );
      displayWorks(filteredWorks);
    });
  });
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  // Clear the gallery
  gallery.innerHTML = "";

  // version modernisée !
  works.forEach((work) => {
    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.append(image, figcaption);
  });

  console.log("[DOM] Galerie mise à jour avec", works.length, "travaux");
}

function setupAdminMode() {
  const token = localStorage.getItem("token");
  const isAdmin = Boolean(token);

  document.body.classList.toggle("admin-mode", isAdmin);

  const loginLink = document.querySelector(".login-link");

  loginLink.textContent = isAdmin ? "logout" : "login"; // un peu de ternaire !!

  if (!isAdmin) {
    return;
  }

  loginLink.href = "#";

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("token");
    window.location.href = "./login.html";
  });
}
