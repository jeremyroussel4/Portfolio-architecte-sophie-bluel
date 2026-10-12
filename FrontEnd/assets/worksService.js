import { getToken } from "./authService.js";

export async function loadWorks() {
  // Cette requête publique récupère tous les travaux à afficher dans la galerie.
  const response = await fetch("http://localhost:5678/api/works");

  // response.ok permet de détecter une réponse HTTP en erreur.
  if (!response.ok) {
    throw new Error("Le chargement des travaux a échoué.");
  }

  return await response.json();
}

export async function deleteWork(workId) {
  // L'identifiant du travail est ajouté à l'URL pour cibler la bonne ressource.
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("La suppression du travail a échoué.");
  }

  return response;
}

export async function addWork(formData) {
  // POST est utilisé pour créer un nouveau travail.
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    // FormData contient les champs du formulaire ainsi que le fichier image.
    body: formData,
  });

  if (!response.ok) {
    throw new Error("L'ajout du travail a échoué.");
  }

  return await response.json();
}