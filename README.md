# OpenClassrooms - Portfolio architecte Sophie Bluel

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenClassrooms](https://img.shields.io/badge/OpenClassrooms-7451EB?style=for-the-badge&logo=openclassrooms&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

## 📖 Description

Portfolio architecte Sophie Bluel est le septième projet de la formation Développeur Web OpenClassrooms.

L'objectif est de rendre dynamique le site de l'architecte d'intérieur Sophie Bluel en utilisant JavaScript et en communiquant avec une API.

Le projet comprend également la création d'une page de connexion administrateur ainsi que d'une interface permettant de gérer les travaux de l'architecte.

L'organisation du Frontend s'inspire du modèle MVC afin de séparer les responsabilités :

* `main.js` démarre l'application
* `controller.js` coordonne l'application et met à jour le DOM
* `worksService.js` communique avec l'API pour charger, ajouter et supprimer les travaux
* `authService.js` gère le token, l'authentification et la déconnexion
* les fichiers HTML et CSS représentent la partie visible de l'application

## 🚀 Technologies

HTML5
CSS3
JavaScript
Node.js
API REST
Git
GitHub

## 🎯 Compétences développées

* Manipuler les éléments du DOM avec JavaScript
* Gérer les événements utilisateurs
* Récupérer et afficher des données provenant d'une API
* Utiliser des formulaires en JavaScript
* Gérer une authentification avec un token
* Créer une interface dynamique sans rechargement de la page
* Communiquer avec une API
* Versionner un projet avec Git et GitHub

## 📂 Installation

Clonez le dépôt :

```bash
git clone git@github.com:jeremyroussel4/Portfolio-architecte-sophie-bluel.git
```

### Backend

Ouvrez un terminal dans le dossier `Backend` :

```bash
npm install
```

Puis lancez le serveur :

```bash
npm start
```

### Frontend

Ouvrez le dossier `Frontend` dans VS Code.

Lancez `index.html` avec l'extension **Live Server**.

## 📁 Structure du projet

```text
.
├── Backend/
│   ├── README.md
│   └── ...
├── FrontEnd/
│   ├── index.html
│   ├── login.html
│   └── assets/
│       ├── main.js
│       ├── controller.js
│       ├── worksService.js
│       ├── authService.js
│       └── style.css
├── .gitignore
└── README.md
```

## 👨‍💻 Auteur

Jeremy Roussel

Projet réalisé dans le cadre de la formation Développeur Web OpenClassrooms.
