import { loadWorks } from "./model.js";

export async function startApplication() {
  console.log("[CONTROLLER] Démarrage et demande des travaux au model");

  const token = localStorage.getItem("token");
  console.log("[CONTROLLER] Utilisateur connecté :", Boolean(token));

  const works = await loadWorks();

  console.log("[CONTROLLER] Travaux reçus, mise à jour du DOM");
  createFilters(works);
  displayWorks(works);
}

function createFilters(works) {
  const filters = document.querySelector(".filters");
  const allButton = document.createElement("button");
  const categories = [...new Set(works.map((work) => work.category.name))];

  allButton.classList.add("button");
  allButton.classList.add("active");
  allButton.textContent = "Tous";
  filters.appendChild(allButton);

  allButton.addEventListener("click", function () {
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });
    allButton.classList.add("active");
    displayWorks(works);
  });

  categories.forEach(function (category) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = category;
    filters.appendChild(button);

    button.addEventListener("click", function () {
      const buttons = document.querySelectorAll(".filters button");
      buttons.forEach(function (button) {
        button.classList.remove("active");
      });
      button.classList.add("active");
      const filteredWorks = works.filter(
        work => work.category.name === category
      );
      displayWorks(filteredWorks);
    });
  });
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  // Clear the gallery
  gallery.innerHTML = "";

  works.forEach(function (work) {
    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const image = document.createElement("img");
    figure.appendChild(image);

    image.src = work.imageUrl;
    image.alt = work.title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);
  });

  console.log("[DOM] Galerie mise à jour avec", works.length, "travaux");
}
