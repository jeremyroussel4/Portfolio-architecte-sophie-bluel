export async function loginUser(email, password) {
  // Les identifiants sont envoyés au backend avec une requête POST.
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

  // La réponse JSON contient notamment le token après une connexion réussie.
  return await response.json();
}

export function getToken() {
  // Le token est conservé entre les pages grâce au stockage local du navigateur.
  return localStorage.getItem("token");
}

export function logoutUser() {
  // Supprimer le token déconnecte l'utilisateur côté frontend.
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

export function isAuthenticated() {
  // Boolean transforme la présence ou l'absence du token en true ou false.
  return Boolean(getToken());
}