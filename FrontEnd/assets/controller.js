import { addWork, deleteWork, loadWorks } from "./model.js";

// Point d'entrée : le controller récupère les données et demande au DOM de les afficher.
export async function startApplication() {
  console.log("[CONTROLLER] Démarrage et demande des travaux au model");

  const works = await loadWorks();

  createFilters(works);
  displayWorks(works);
  displayModalWorks(works);
  displayCategoryOptions(works);
  setupAdminMode();

  photoInput.addEventListener("change", updateSubmitButton);
  titleInput.addEventListener("input", updateSubmitButton);
  categorySelect.addEventListener("change", updateSubmitButton);

  photoInput.addEventListener("change", () => {
    const selectedFile = photoInput.files[0];

    if (!selectedFile) {
      photoPreview.hidden = true;
      return;
    }

    // FileReader lit le fichier choisi et permet de l'afficher avant l'envoi.
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      photoPreview.src = reader.result;
      photoPreview.hidden = false;
    });
    reader.readAsDataURL(selectedFile);
  });

  addPhotoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // FormData récupère automatiquement l'image, le titre et la catégorie du formulaire.
    const formData = new FormData(addPhotoForm);

    try {
      const newWork = await addWork(formData);
      works.push(newWork);
      displayWorks(works);
      displayModalWorks(works);
      addPhotoForm.reset();
      photoPreview.hidden = true;
      updateSubmitButton();
      addContent.hidden = true;
      modalGallery.hidden = false;
      addButton.hidden = false;
    } catch (error) {
      console.error(error);
      alert("L'ajout de la photo a échoué.");
    }
  });
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
    const { imageUrl, title } = work; // Déstructuration d’objet!!
    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;
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

// --- Gestion de la fenêtre modale ---
// On récupère les éléments HTML qui permettent d'ouvrir et de fermer la modale.
const editButton = document.querySelector(".edit-button");
const modal = document.querySelector("#edit-modal");
const closeButton = document.querySelector(".modal-close");
const addButton = document.querySelector(".modal-add-button");
const modalGallery = document.querySelector(".modal-gallery");
const modalGalleryTitle = document.querySelector(".modal-gallery-title");
const addContent = document.querySelector(".modal-add-content");
const backButton = document.querySelector(".modal-back-button");
const categorySelect = document.querySelector("#category");
const addPhotoForm = document.querySelector(".add-photo-form");
const photoInput = document.querySelector("#photo");
const photoPreview = document.querySelector(".photo-preview");
const titleInput = document.querySelector("#title");
const submitButton = document.querySelector(".modal-submit-button");

function updateSubmitButton() {
  const formIsComplete = photoInput.files.length > 0
    && titleInput.value.trim() !== ""
    && categorySelect.value !== "";

  submitButton.disabled = !formIsComplete;
}

// Réafficher la galerie et cacher la vue du formulaire.
function showGalleryView() {
  modalGalleryTitle.hidden = false;
  modalGallery.hidden = false;
  addButton.hidden = false;
  addContent.hidden = true;
}

// Nettoyer les champs et l'aperçu avant de quitter la modale.
function resetAddForm() {
  addPhotoForm.reset();
  photoPreview.hidden = true;
  updateSubmitButton();
}

// Fermer complètement la modale, quelle que soit la vue affichée.
function closeModal() {
  modal.hidden = true;
  showGalleryView();
  resetAddForm();
}

// Le lien « modifier » est un lien HTML, mais il sert ici à ouvrir la modale.
editButton.addEventListener("click", (event) => {
  event.preventDefault();
  modal.hidden = false;
});

// La croix ferme la modale et empêche le titre centré d'intercepter le clic.
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeModal();
});

// Un clic sur le fond sombre ferme la modale, mais un clic dans son contenu ne la ferme pas.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// --- Passage vers le formulaire d'ajout ---
// Pour l'instant, ce bouton change seulement de vue. L'envoi à l'API viendra ensuite.
addButton.addEventListener("click", () => {
  modalGalleryTitle.hidden = true;
  modalGallery.hidden = true;
  addButton.hidden = true;
  addContent.hidden = false;
});

backButton.addEventListener("click", (event) => {
  // La flèche revient à la galerie et nettoie le formulaire d'ajout.
  event.preventDefault();
  event.stopPropagation();
  showGalleryView();
  resetAddForm();
});

function displayModalWorks(works) {
  // Cette fonction reconstruit le contenu de la galerie de la modale.
  const modalGallery = document.querySelector(".modal-gallery");
  // Clear the modal gallery
  modalGallery.innerHTML = "";

  // version modernisée !
  works.forEach((work) => {
    // Chaque work reçu de l'API devient une figure avec une image et un bouton.
    const { id, imageUrl, title } = work;
    const figure = document.createElement("figure");
    modalGallery.appendChild(figure);

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "modal-delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Supprimer ${title}`);
    deleteButton.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
    deleteButton.addEventListener("click", async () => {
      // La confirmation évite d'envoyer une suppression accidentelle à l'API.
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");

      if (!confirmed) {
        return;
      }

      try {
        // Le model communique avec l'API ; le controller orchestre la suite.
        await deleteWork(id);
        // Après succès, on retire le work du tableau local puis on rafraîchit les deux galeries.
        const workIndex = works.findIndex((currentWork) => currentWork.id === id);
        works.splice(workIndex, 1);
        displayWorks(works);
        displayModalWorks(works);
      } catch (error) {
        console.error(error);
        alert("La suppression a échoué.");
      }
    });

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = title;
    figure.append(image, deleteButton, figcaption);
  });

  console.log("[DOM] Galerie de la modale mise à jour avec", works.length, "travaux");
}

function displayCategoryOptions(works) {
  const categories = [...new Map(
    works.map((work) => [work.category.id, work.category]),
  ).values()];

  categorySelect.innerHTML = "";

  // La première option reste vide : l'utilisateur doit choisir une catégorie.
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "";
  placeholder.disabled = true;
  placeholder.selected = true;
  categorySelect.appendChild(placeholder);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
