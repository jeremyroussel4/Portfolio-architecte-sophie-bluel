let works = [];

export async function loadWorks() {
  console.log("[MODEL] Chargement des travaux depuis l'API");

  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();

  console.log("[MODEL] Travaux reçus :", works);
  return works;
}

export async function loginUser(email, password) {
  console.log("[MODEL] Envoi de la requête de connexion pour :", email);

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

  console.log("[MODEL] Statut de la réponse de connexion :", response.status);

  return await response.json();
}

