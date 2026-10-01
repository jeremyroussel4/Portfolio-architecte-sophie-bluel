export async function loadWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  const works = await response.json();

  return works;
}

export async function loginUser(email, password) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await response.json();
}

export async function deleteWork(workId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("La suppression du travail a échoué.");
  }

  return response;
}

export async function addWork(formData) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Le navigateur définit automatiquement le Content-Type multipart pour FormData.
    body: formData,
  });

  if (!response.ok) {
    throw new Error("L'ajout du travail a échoué.");
  }

  // On récupère le nouveau travail renvoyé par l'API.
  return await response.json();
}

