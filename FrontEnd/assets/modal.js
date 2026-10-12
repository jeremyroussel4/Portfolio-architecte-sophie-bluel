import { addWork, deleteWork } from "./worksService.js";

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

export function initializeModal(works, onWorksChanged) {
  displayModalWorks(works, onWorksChanged);
  displayCategoryOptions(works);

  editButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModalFromButton);
  modal.addEventListener("click", closeModalFromOverlay);
  backButton.addEventListener("click", showGalleryFromButton);
  addButton.addEventListener("click", showAddView);

  photoInput.addEventListener("change", updateSubmitButton);
  titleInput.addEventListener("input", updateSubmitButton);
  categorySelect.addEventListener("change", updateSubmitButton);
  photoInput.addEventListener("change", displayPhotoPreview);
  addPhotoForm.addEventListener("submit", (event) =>
    addPhoto(event, works, onWorksChanged),
  );
}

function displayModalWorks(works, onWorksChanged) {
  modalGallery.innerHTML = "";

  works.forEach((work) => {
    const { id, imageUrl, title } = work;
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const deleteButton = document.createElement("button");
    const figcaption = document.createElement("figcaption");

    image.src = imageUrl;
    image.alt = title;

    deleteButton.className = "modal-delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Supprimer ${title}`);
    deleteButton.innerHTML =
      '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
    deleteButton.addEventListener("click", () =>
      removeWork(id, works, onWorksChanged),
    );

    figcaption.textContent = title;
    figure.append(image, deleteButton, figcaption);
    modalGallery.appendChild(figure);
  });
}

async function removeWork(workId, works, onWorksChanged) {
  const confirmed = confirm(
    "Êtes-vous sûr de vouloir supprimer cette photo ?",
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteWork(workId);
    const workIndex = works.findIndex((work) => work.id === workId);
    works.splice(workIndex, 1);
    onWorksChanged(works);
    displayModalWorks(works, onWorksChanged);
  } catch (error) {
    console.error(error);
    alert("La suppression a échoué.");
  }
}

function openModal(event) {
  event.preventDefault();
  modal.hidden = false;
}

function closeModalFromButton(event) {
  event.preventDefault();
  event.stopPropagation();
  closeModal();
}

function closeModalFromOverlay(event) {
  if (event.target === modal) {
    closeModal();
  }
}

function updateSubmitButton() {
  const formIsComplete =
    photoInput.files.length > 0 &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== "";

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

function showGalleryFromButton(event) {
  event.preventDefault();
  event.stopPropagation();
  showGalleryView();
  resetAddForm();
}

function displayCategoryOptions(works) {
  const categories = [
    ...new Map(works.map((work) => [work.category.id, work.category])).values(),
  ];

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

function showAddView() {
  modalGalleryTitle.hidden = true;
  modalGallery.hidden = true;
  addButton.hidden = true;
  addContent.hidden = false;
}

function displayPhotoPreview() {
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
}

async function addPhoto(event, works, onWorksChanged) {
  event.preventDefault();
  const formData = new FormData(addPhotoForm);

  try {
    const newWork = await addWork(formData);
    works.push(newWork);
    onWorksChanged(works);
    displayModalWorks(works, onWorksChanged);
    resetAddForm();
    showGalleryView();
  } catch (error) {
    console.error(error);
    alert("L'ajout de la photo a échoué.");
  }
}
