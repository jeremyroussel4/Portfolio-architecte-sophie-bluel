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
  // Cette fonction relie les éléments HTML de la modale aux actions utilisateur.
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
  // On reconstruit la galerie pour qu'elle corresponde toujours aux données actuelles.
  modalGallery.innerHTML = "";

  // Chaque travail devient un élément figure avec son image, son titre et son bouton de suppression.
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
  // La confirmation évite une suppression accidentelle.
  const confirmed = confirm(
    "Êtes-vous sûr de vouloir supprimer cette photo ?",
  );

  if (!confirmed) {
    return;
  }

  try {
    // La suppression est d'abord faite dans l'API, puis dans le tableau local.
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
  // Le lien d'ouverture ne doit pas provoquer de navigation vers une autre page.
  event.preventDefault();
  modal.hidden = false;
}

function closeModalFromButton(event) {
  event.preventDefault();
  // On évite que le clic soit aussi interprété comme un clic sur l'arrière-plan.
  event.stopPropagation();
  closeModal();
}

function closeModalFromOverlay(event) {
  // La modale se ferme uniquement si l'utilisateur clique sur l'arrière-plan.
  if (event.target === modal) {
    closeModal();
  }
}

function updateSubmitButton() {
  // Le bouton reste désactivé tant que les trois champs obligatoires ne sont pas remplis.
  const formIsComplete =
    photoInput.files.length > 0 &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== "";

  submitButton.disabled = !formIsComplete;
}

function showGalleryView() {
  // Cette vue est l'écran principal de la modale, avec la liste des travaux.
  modalGalleryTitle.hidden = false;
  modalGallery.hidden = false;
  addButton.hidden = false;
  addContent.hidden = true;
}

function resetAddForm() {
  // On remet le formulaire et l'aperçu dans leur état initial.
  addPhotoForm.reset();
  photoPreview.hidden = true;
  updateSubmitButton();
}

function closeModal() {
  // Fermer la modale rétablit aussi la vue galerie pour la prochaine ouverture.
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
  // Map utilise l'identifiant comme clé afin de conserver chaque catégorie une seule fois.
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
  // On remplace la galerie par le formulaire d'ajout sans fermer la modale.
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

  // FileReader permet de lire l'image choisie et de l'afficher avant son envoi.
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    photoPreview.src = reader.result;
    photoPreview.hidden = false;
  });
  reader.readAsDataURL(selectedFile);
}

async function addPhoto(event, works, onWorksChanged) {
  // Le formulaire est envoyé avec JavaScript afin de transmettre aussi le fichier image.
  event.preventDefault();
  const formData = new FormData(addPhotoForm);

  try {
    // FormData conserve les champs et le fichier dans un format accepté par l'API.
    const newWork = await addWork(formData);
    // On met à jour l'affichage après la confirmation de l'ajout par le backend.
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
