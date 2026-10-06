import { getToken } from "./authService.js";

export async function loadWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  return await response.json();
}

export async function deleteWork(workId) {
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
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("L'ajout du travail a échoué.");
  }

  return await response.json();
}