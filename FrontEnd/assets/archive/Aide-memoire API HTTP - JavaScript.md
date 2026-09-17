# Aide-memoire API HTTP avec JavaScript

> Reference rapide pour communiquer avec une API depuis le navigateur.

## 1. Les elements d'une requete

| Element | Question | Exemple |
|---|---|---|
| URL | Quelle ressource appeler ? | `http://localhost:5678/api/works` |
| Methode | Quelle action effectuer ? | `GET`, `POST`, `PUT`, `DELETE` |
| Headers | Quel est le format ou le droit d'acces ? | `Content-Type`, `Authorization` |
| Body | Quelles donnees envoyer ? | `JSON.stringify(donnees)` |

## 2. Requete GET - recuperer des donnees

```javascript
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

console.log(works);
```

### Avec une verification du statut

```javascript
const response = await fetch(url);

if (!response.ok) {
	throw new Error(`Erreur HTTP : ${response.status}`);
}

const data = await response.json();
```

`response.ok` vaut `true` pour une reponse entre `200` et `299`.

## 3. Requete POST - envoyer du JSON

```javascript
const donnees = {
	email: email,
	password: password
};

const response = await fetch(url, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(donnees)
});

const resultat = await response.json();
```

### A retenir

- `method` indique l'action.
- `headers` indique le format du body.
- `JSON.stringify()` transforme un objet JavaScript en texte JSON.
- `response.json()` transforme la reponse JSON en objet JavaScript.

## 4. Requete POST avec authentification

Quand l'API demande un token, on l'ajoute dans le header `Authorization`.

```javascript
const token = localStorage.getItem("token");

const response = await fetch(url, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	},
	body: JSON.stringify(donnees)
});
```

Le mot `Bearer` est suivi d'un espace puis du token.

## 5. Requete DELETE - supprimer une ressource

```javascript
const token = localStorage.getItem("token");

const response = await fetch(`${url}/${id}`, {
	method: "DELETE",
	headers: {
		"Authorization": `Bearer ${token}`
	}
});

if (!response.ok) {
	throw new Error(`Suppression impossible : ${response.status}`);
}
```

## 6. Requete PUT ou PATCH - modifier une ressource

```javascript
const response = await fetch(`${url}/${id}`, {
	method: "PUT",
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	},
	body: JSON.stringify(donneesModifiees)
});
```

- `PUT` remplace generalement une ressource.
- `PATCH` modifie seulement une partie de la ressource.
- L'API precise lequel utiliser.

## 7. Envoyer un formulaire avec un fichier

Pour une image, ne pas utiliser `JSON.stringify()` pour le fichier. Utiliser `FormData`.

```javascript
const formData = new FormData();
formData.append("title", titre);
formData.append("category", categoryId);
formData.append("image", fichier);

const response = await fetch(url, {
	method: "POST",
	headers: {
		"Authorization": `Bearer ${token}`
	},
	body: formData
});
```

Important : avec `FormData`, ne pas ajouter manuellement :

```javascript
"Content-Type": "multipart/form-data"
```

Le navigateur ajoute lui-meme le bon `Content-Type` avec la boundary necessaire.

## 8. Recuperer et afficher une image

### Image fournie par une URL

```javascript
const image = document.createElement("img");
image.src = work.imageUrl;
image.alt = work.title;
gallery.appendChild(image);
```

### Image choisie dans un input file avant envoi

```javascript
const fichier = input.files[0];
const imageUrl = URL.createObjectURL(fichier);
preview.src = imageUrl;
```

La preview locale ne remplace pas l'envoi a l'API. Il faut ensuite envoyer le fichier avec `FormData`.

## 9. Lire un input et envoyer un formulaire

```javascript
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const valeur = form.querySelector("[name=title]").value;
	console.log(valeur);
});
```

`preventDefault()` empeche le rechargement automatique de la page.

## 10. Reponse de connexion et token

Une API de connexion peut renvoyer :

```javascript
{
	userId: 1,
	token: "..."
}
```

Pour conserver le token :

```javascript
localStorage.setItem("token", resultat.token);
```

Pour le recuperer :

```javascript
const token = localStorage.getItem("token");
```

Pour le supprimer lors de la deconnexion :

```javascript
localStorage.removeItem("token");
```

Pour verifier s'il existe :

```javascript
const token = localStorage.getItem("token");

if (token) {
	console.log("Utilisateur connecte");
}
```

## 11. Gerer les erreurs

```javascript
try {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Erreur HTTP : ${response.status}`);
	}

	const data = await response.json();
	console.log(data);
} catch (error) {
	console.error("La requete a echoue :", error);
}
```

### Statuts courants

| Statut | Signification |
|---|---|
| `200` | Requete reussie |
| `201` | Ressource creee |
| `400` | Requete incorrecte |
| `401` | Non autorise ou token invalide |
| `403` | Acces interdit |
| `404` | Ressource non trouvee |
| `500` | Erreur serveur |

## 12. Les methodes du localStorage

| Methode | Role | Exemple |
|---|---|---|
| `setItem` | Enregistrer | `localStorage.setItem("token", valeur)` |
| `getItem` | Lire | `localStorage.getItem("token")` |
| `removeItem` | Supprimer une cle | `localStorage.removeItem("token")` |
| `clear` | Tout supprimer | `localStorage.clear()` |

Attention : `localStorage` stocke du texte. Pour un objet complet :

```javascript
localStorage.setItem("works", JSON.stringify(works));
const works = JSON.parse(localStorage.getItem("works"));
```

## 13. Diagnostiquer une requete

### Dans la console

```javascript
console.log("URL :", url);
console.log("Statut :", response.status);
console.log("Reponse :", data);
```

Ne jamais afficher le mot de passe ni publier un token complet.

### Dans l'onglet Network

Verifier :

- l'URL ;
- la methode HTTP ;
- le statut ;
- les Request Headers ;
- le Request Payload ;
- la Response.

### Dans Swagger

1. ouvrir `/api-docs/` ;
2. cliquer sur **Try it out** ;
3. remplir le body JSON ;
4. cliquer sur **Execute** ;
5. comparer la requete Swagger avec celle du navigateur.

Pour une route protegee :

1. obtenir le token avec la route de connexion ;
2. cliquer sur **Authorize** ;
3. saisir `Bearer` suivi du token ;
4. tester la route protegee.

## 14. Methode de travail recommandee

1. Lire la documentation de l'endpoint.
2. Identifier la methode HTTP.
3. Identifier les champs obligatoires.
4. Tester la route dans Swagger ou avec curl.
5. Reproduire la requete avec `fetch`.
6. Afficher temporairement le statut et la reponse.
7. Verifier `response.ok`.
8. Traiter la reponse avec `response.json()`.
9. Mettre a jour le DOM.
10. Ajouter ensuite la gestion des erreurs.

## 15. Exemple curl pour comparer

### GET

```bash
curl http://localhost:5678/api/works
```

### POST JSON

```bash
curl -X POST \
  http://localhost:5678/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sophie.bluel@test.tld","password":"S0phie"}'
```

### DELETE avec token

```bash
curl -X DELETE \
  http://localhost:5678/api/works/1 \
  -H "Authorization: Bearer TON_TOKEN"
```

## 16. Checklist avant de demander de l'aide

- [ ] Le backend est-il demarre ?
- [ ] L'URL est-elle exacte ?
- [ ] La methode HTTP est-elle correcte ?
- [ ] Les noms des champs correspondent-ils a la documentation ?
- [ ] Le body est-il transforme avec `JSON.stringify()` ?
- [ ] Le `Content-Type` est-il correct ?
- [ ] Un token est-il necessaire ?
- [ ] Le header `Authorization` est-il present ?
- [ ] Ai-je verifie `response.status` et `response.ok` ?
- [ ] Ai-je regarde l'onglet Network ?
- [ ] Ai-je compare avec Swagger ?

## Sources

- [Cours OpenClassrooms - API HTTP](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript)
- [Envoyer une requete depuis le navigateur](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911151-envoyez-une-requete-depuis-le-navigateur)
- [Traiter la reponse du serveur](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911177-traitez-la-reponse-du-serveur)
- [Sauvegarder des donnees avec une API HTTP](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911191-sauvegardez-les-donnees-grace-a-une-api-http)
- [Sauvegarder des donnees dans le localStorage](https://openclassrooms.com/fr/courses/7697016-creez-des-pages-web-dynamiques-avec-javascript/7911201-sauvegardez-les-donnees-dans-le-localstorage)
- [MDN - Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [MDN - FormData](https://developer.mozilla.org/fr/docs/Web/API/FormData)
