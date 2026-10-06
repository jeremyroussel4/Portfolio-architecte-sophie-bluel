import { isAuthenticated, logoutUser } from "./authService.js";
import { addWork, deleteWork, loadWorks } from "./worksService.js";

export async function startApplication() {
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

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      photoPreview.src = reader.result;
      photoPreview.hidden = false;
    });
    reader.readAsDataURL(selectedFile);
  });

  addPhotoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

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

function showGalleryView() {
  modalGalleryTitle.hidden = false;
  modalGallery.hidden = false;
  addButton.hidden = false;
  addContent.hidden = true;
}

function resetAddForm() {
  addPhotoForm.reset();
  photoPreview.hidden = true;
  updateSubmitButton();
}

function closeModal() {
  modal.hidden = true;
  showGalleryView();
  resetAddForm();
}

editButton.addEventListener("click", (event) => {
  event.preventDefault();
  modal.hidden = false;
});

closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeModal();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

addButton.addEventListener("click", () => {
  modalGalleryTitle.hidden = true;
  modalGallery.hidden = true;
  addButton.hidden = true;
  addContent.hidden = false;
});

backButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  showGalleryView();
  resetAddForm();
});

function displayModalWorks(works) {
  const modalGallery = document.querySelector(".modal-gallery");
  modalGallery.innerHTML = "";

  works.forEach((work) => {
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
      const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");

      if (!confirmed) {
        return;
      }

      try {
        await deleteWork(id);
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

}

function displayCategoryOptions(works) {
  const categories = [...new Map(
    works.map((work) => [work.category.id, work.category]),
  ).values()];

  categorySelect.innerHTML = "";

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
