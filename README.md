# Portfolio architecte Sophie Bluel

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

## À propos du projet

Ce projet est réalisé dans le cadre du septième projet de la formation Développeur Web d'OpenClassrooms.

L'objectif est de rendre dynamique le portfolio de l'architecte d'intérieur Sophie Bluel avec JavaScript et une API REST.

L'application permet notamment de :

- consulter les projets et les filtrer par catégorie ;
- se connecter à l'espace administrateur ;
- ajouter une photo avec aperçu et sélection d'une catégorie ;
- supprimer des projets depuis une modale de gestion.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (modules ES)
- Node.js
- Express
- SQLite
- API REST
- Git et GitHub

## Organisation du frontend

Le frontend est organisé en modules afin de séparer les responsabilités :

- `main.js` démarre l'application ;
- `controller.js` coordonne l'affichage de la page, les filtres et le mode administrateur ;
- `modal.js` gère l'ouverture de la modale, la galerie d'administration et le formulaire d'ajout ;
- `worksService.js` communique avec l'API pour charger, ajouter et supprimer les projets ;
- `authService.js` gère l'authentification, le token et la déconnexion.

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone git@github.com:jeremyroussel4/Portfolio-architecte-sophie-bluel.git
cd Portfolio-architecte-sophie-bluel
```

### 2. Lancer le backend

Dans un premier terminal :

```bash
cd Backend
npm install
npm start
```

L'API est alors disponible à l'adresse `http://localhost:5678`.

La documentation Swagger est accessible à l'adresse :

<http://localhost:5678/api-docs/>

### 3. Lancer le frontend

Dans un second terminal, ouvrez le dossier `FrontEnd` dans VS Code puis lancez [index.html](./FrontEnd/index.html) avec l'extension **Live Server**.

Le frontend utilise l'API locale du backend. Le backend doit donc rester lancé pendant l'utilisation de l'application.

## Compte administrateur de test

| Email | Mot de passe |
| --- | --- |
| `sophie.bluel@test.tld` | `S0phie` |

## Structure du projet

```text
.
├── Backend/
│   ├── README.md
│   ├── package.json
│   └── ...
├── FrontEnd/
│   ├── index.html
│   ├── login.html
│   └── assets/
│       ├── main.js
│       ├── controller.js
│       ├── modal.js
│       ├── worksService.js
│       ├── authService.js
│       └── style.css
├── .gitignore
└── README.md
```

## Compétences mises en pratique

- manipulation du DOM et gestion des événements ;
- consommation d'une API REST avec `fetch` ;
- création et validation de formulaires ;
- authentification avec token ;
- mise à jour de l'interface sans rechargement ;
- organisation du code en modules JavaScript ;
- utilisation de Git et GitHub.

## Auteur

Jeremy Roussel

Projet réalisé dans le cadre de la formation Développeur Web OpenClassrooms.
