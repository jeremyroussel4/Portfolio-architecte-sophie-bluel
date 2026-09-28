// Tableau local qui mémorise les travaux reçus du backend.
let works = [];

// Le model demande les travaux au backend et renvoie les données au controller.
export async function loadWorks() {
  console.log("[MODEL] Chargement des travaux depuis l'API");

  // fetch() envoie une requête HTTP. Sans options, fetch utilise la méthode GET.
  const response = await fetch("http://localhost:5678/api/works");

  // response.json() transforme la réponse JSON en objets JavaScript.
  // await attend que le serveur ait fini de répondre.
  works = await response.json();

  console.log("[MODEL] Travaux reçus :", works);

  // return renvoie les travaux à la fonction qui a appelé loadWorks().
  return works;
}

// Le model envoie l'email et le mot de passe à l'API de connexion.
export async function loginUser(email, password) {
  console.log("[MODEL] Envoi de la requête de connexion pour :", email);

  // POST sert à envoyer des informations au backend.
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      // Le backend sait que les données envoyées sont au format JSON.
      "Content-Type": "application/json",
    },
    // JSON.stringify transforme un objet JavaScript en texte JSON.
    body: JSON.stringify({
      email,
      password,
    }),
  });

  console.log("[MODEL] Statut de la réponse de connexion :", response.status);

  // Le serveur renvoie généralement le token dans une réponse JSON.
  return await response.json();
}

// Le model supprime un travail dans l'API grâce à son identifiant.
export async function deleteWork(workId) {
  // Le token a été enregistré dans le navigateur après la connexion.
  const token = localStorage.getItem("token");

  // L'id est placé dans l'URL pour désigner le travail à supprimer.
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    // DELETE demande au backend de supprimer la ressource ciblée.
    method: "DELETE",
    headers: {
      // Bearer indique que le token sert à authentifier la requête.
      Authorization: `Bearer ${token}`,
    },
  });

  // response.ok vaut true pour une réponse HTTP réussie.
  if (!response.ok) {
    // throw arrête la fonction et transmet l'erreur au controller.
    throw new Error("La suppression du travail a échoué.");
  }

  // Le controller sait que la suppression a réussi.
  return response;
}

// Le model ajoute un travail dans l'API grâce aux données du formulaire.
export async function addWork(formData) {
  // On récupère le token pour prouver que l'utilisateur est connecté.
  const token = localStorage.getItem("token");

  // FormData contient l'image, le titre et l'id de la catégorie.
  const response = await fetch("http://localhost:5678/api/works", {
    // POST crée une nouvelle ressource dans l'API.
    method: "POST",
    headers: {
      // Le backend vérifie que l'utilisateur est connecté.
      Authorization: `Bearer ${token}`,
    },
    // Le navigateur construit automatiquement le Content-Type pour le fichier.
    body: formData,
  });

  // response.ok vaut false si l'API refuse la création.
  if (!response.ok) {
    throw new Error("L'ajout du travail a échoué.");
  }

  // On récupère le nouveau travail renvoyé par l'API.
  return await response.json();
}

