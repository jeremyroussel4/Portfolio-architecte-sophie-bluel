import { isAuthenticated, logoutUser } from "./authService.js";
import { loadWorks } from "./worksService.js";
import { initializeModal } from "./modal.js";

export async function startApplication() {
  const works = await loadWorks();

  initializePage(works);
  initializeModal(works, displayWorks);
}

function initializePage(works) {
  createFilters(works);
  displayWorks(works);
  setupAdminMode();
}

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

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
  const categories = [...new Set(works.map((work) => work.category.name))];

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

function setupAdminMode() {
  const isAdmin = isAuthenticated();

  document.body.classList.toggle("admin-mode", isAdmin);

  const loginLink = document.querySelector(".login-link");
  loginLink.textContent = isAdmin ? "logout" : "login";

  if (!isAdmin) {
    return;
  }

  loginLink.href = "#";
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    logoutUser();
  });
}
