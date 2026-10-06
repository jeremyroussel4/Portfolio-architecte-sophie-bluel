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

export function getToken() {
  return localStorage.getItem("token");
}

export function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

export function isAuthenticated() {
  return Boolean(getToken());
}