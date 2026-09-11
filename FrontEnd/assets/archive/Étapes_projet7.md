Étapes
Avant de commencer, il est essentiel de prendre connaissance des différents éléments du projet mis à disposition, et d’installer tous les éléments nécessaires au bon démarrage du projet. 

 

Avant de démarrer cette étape, je dois avoir :

Terminé les cours JavaScript associés au projet.

Terminé les cours Git et Github associés au projet.

Installé Node.js et npm sur mon ordinateur. 

Une fois cette étape terminée, je devrais avoir :

Installé le back-end et le front-end du site.

Recommandations : 

Analysez en détail les différents éléments de l’énoncé : prenez connaissance du Kanban et du code mis à votre disposition, et n’hésitez pas à prendre des notes si nécessaire.

Clonez le repo GitHub.

Suivez le ReadMe pour l’installation des dépendances du dossier Backend pour l’installation des dépendances.

Lancez le back-end du projet et découvrez la documentation Swagger de l’API.

Faites un test de la route de récupération des travaux de l’architecte, via Swagger ou un outil comme Postman, afin de connaître des données existantes en base de données.

Points de vigilance :

Afin de pouvoir faire fonctionner le back-end, vous devez avoir à disposition Node.js et npm sur votre ordinateur. 

Ressources :

En plus du cours, vous pouvez suivre les vidéos de la chaîne Youtube du mentor et référent technique du parcours Testeur Logiciel sur Git : GIT, LA BASE ! - #1/14 - Introduction de la playlist 

Site de Node.js

Documenter une API avec Swagger : Le tutoriel ici montre comment créer une documentation d’API avec Swagger. Cette ressource va vous aider à  comprendre le principe  de fonctionnement de Swagger pour voir comment bien utiliser le document fourni avec le back-end.

Maintenant que tout est en place, vous pouvez mettre en place le versioning de votre projet avec git et préparer votre dépôt distant sur Github.


Si vous avez cloné le dépôt du projet

N’oubliez pas supprimer la référence du dépôt Github d’origine.

Créez votre dépôt Github.

Ajouter la référence de ce dépôt distant dans votre projet local.

Si vous avez directement téléchargé le projet

Initialisez votre versioning local.

Faites le premier commit.

Créez votre dépôt distant sur Github.

Ajoutez la référence de ce dépôt à votre projet local.

Une fois cette étape terminée, je devrais avoir

Mon projet local avec git initialisé et donc un versioning préparé.

Mon dépôt distant sur Github.

Points de vigilance :

Si vous avez cloné le dépôt d’origine pensez à supprimer la référence du dépôt Github.

Ressources :

 Tutoriel sur les bases de Git et Github du mentor et référent technique du parcours Testeur Logiciel. 

Maintenant que tout est en place, vous pouvez commencer par ajouter le contenu dynamique du site.

Utilisez fetch et récupérez les données provenant du back-end et les ajouter dynamiquement sur la page d’accueil.


Avant de démarrer cette étape, je dois avoir :

Installé l’environnement de développement.

Testé que je récupère bien les informations du back-end (par exemple avec Postman ou Swagger).

Une fois cette étape terminée, je devrais avoir :

La galerie fonctionnelle affichée avec la liste des travaux provenant du back-end.

Recommandations : 

Faites l’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte. 

Utilisez JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré. 

Supprimez du code HTML les travaux qui étaient présents. Il ne doit vous rester que le contenu que vous avez ajouté dynamiquement grâce à JavaScript.

Ressources :

Le chapitre “Envoyez une requête depuis le navigateur” du cours “Créez des pages web dynamiques avec JavaScript” vous indiquera comment utiliser “fetch” pour faire vos appels API.

Le chapitre “Créez un nouvel élément dans une page web” du cours “Apprenez à programmer avec JavaScript” vous aidera à ajouter les éléments dans la galerie.

Ajoutez maintenant les filtres pour afficher les travaux par catégorie


Avant de démarrer cette étape, je dois avoir 

Tous les projets s’affichant dans la galerie en provenance du back-end.

Une fois cette étape terminée, je devrais avoir 

Les filtres s’afficher au-dessus de la galerie, avec le bouton Tous et les autres boutons correspondant aux catégories présentent dans l’API

Le style des boutons correspond à celui de la maquette

 Points de vigilance 

Il est important de garder une option de menu permettant d’afficher tous les travaux, comme par défaut. 

Recommandation
L’exercice ici est similaire à la récupération des travaux. Basez-vous sur ce que vous avez fait précédemment.


Maintenant que tout est en place, vous pouvez commencer à travailler sur le comportement et la fonctionnalité de filtre des travaux en affichage.


Recommandations : 

Il y a plusieurs façons ici d’implémenter les filtres. En analysant les informations à votre disposition, tentez de répondre aux questions suivantes pour implémenter les catégories : 

Ai-je suffisamment d’informations dans les données reçues ?

Dois-je faire un autre appel à l’API ?

Au clic sur un élément du menu de catégories, filtrer les travaux selon le filtre sélectionné. Cela sous-entend que vous pouvez identifier la catégorie à partir du clic.

Maintenant que l’affichage du contenu est dynamique, il est temps de mettre en place les éléments nécessaires pour administrer le site. On commencera par la page de connexion.

 

Avant d'interagir avec le site, il faut pouvoir s’y connecter ; pour cela, intégrer la page de connexion en suivant le design de la maquette.

 

Avant de démarrer cette étape, je dois avoir :

La page d’accueil avec la galerie fonctionnelle et filtrable par catégorie.

Une fois cette étape terminée, je devrais avoir :

La page de login intégrée mais non fonctionnelle.

Recommandations : 

Avant de considérer comme conclu le travail d’intégration, demandez-vous : Est-ce que le rendu est conforme à la maquette ? 

Maintenant que la page de connexion est prête, nous allons pouvoir connecter notre utilisateur.


Avant de démarrer cette étape, je dois avoir :

 Le formulaire intégré à la page de connexion.

Une fois cette étape terminée, je devrais avoir :

Le formulaire de connexion fonctionnel avec :

Redirection vers la page d’accueil quand la connexion est confirmée.

Un message d’erreur quand les informations utilisateur / mot de passe ne sont pas correctes.  

Recommandations : 

Pour réaliser cette étape, demandez-vous :

Quel type de requête me permet d’envoyer les valeurs des entrées de mon formulaire ? 

Si la combinaison utilisateur - mot de passe est correcte, comment rediriger vers la page d’accueil et s’assurer que la configuration est maintenue ? 

Si la combinaison est fausse, comment prévenir l’utilisateur ? 

Point de vigilance  : 

Pensez à stocker le token d'authentification pour pouvoir réaliser les envois et suppressions de travaux. 

Ressources :

Le chapitre “Sauvegarder les données grâce à une API HTTP” du cours “Créez des pages web dynamiques avec JavaScript” vous aidera à envoyer une requête POST avec Fetch

Maintenant que la page de connexion est fonctionnelle et que la redirection fonctionne lorsque la connexion est faite,  nous allons pouvoir faire les modifications de la page d’accueil


Avant de démarrer cette étape, je dois avoir :

 Une connexion active

Une fois cette étape terminée, je devrais avoir :

La page d’accueil avec un affichage différent :

Le bandeau noir en haut avec la mention « mode édition »

Dans le menu de navigation l’item « login » est devenu « logout »

La déconnexion est fonctionnelle

Les filtres ne s’affichent pas

Un bouton de modification est affiché.  

 Recommandations : 

Pour réaliser cette étape, demandez-vous :

Comment afficher/cacher des éléments dynamiquement et simplement

Comment vérifier si une connexion est active ou pas 

Point de vigilance  : 

Pensez au token d’authentification que vous avez enregistré lors de la connexion

Une fois que nous avons l’utilisateur connecté, il est temps de lui donner la possibilité de gérer ses travaux.

 Commençons donc par créer notre fenêtre modale et gérer son apparition et sa disparition.


Avant de démarrer cette étape, je dois avoir :

La possibilité de me connecter comme administrateur du site.

 Une fois cette étape terminée, je devrais avoir :

La fenêtre modale fonctionnelle avec les 2 zones (une pour la gallerie permettant la suppression, l’autre pour le formulaire permettant l’ajout de travaux).

La modale doit pouvoir se déclencher au clic sur le bouton Modifier, et se refermer au clic sur la croix ou en dehors de la modale.

Lors d’un clic sur le bouton « Ajouter une photo » la zone du formulaire doit s’afficher.

Lors d’un clic sur la flèche de retour (en haut à gauche) la modale affiche la zone de la galerie.

Recommandations : 

Pour bien construire la fenêtre modale, pensez à bien étudier les maquettes du site : 

Que doit contenir ma modale ? 

Quelles actions dois-je pouvoir entreprendre ? 

Quels sont les zones statiques et dynamiques de la modale ? 

Points de vigilance :

Lorsque vous créez la modale, assurez-vous que quel que soit le nombre de fois que vous ouvrez / fermez la modale, une seule modale est présente dans le code source. 

Ressources :

Tutoriel Fenêtre modale Grafikart

Dans cette étape, nous rendrons fonctionnelle la suppression des travaux, en communiquant avec l’API et en actualisant le DOM. 

 

Avant de démarrer cette étape, je dois avoir :

La fenêtre modale qui s’ouvre quand on clique sur le bouton pour ajouter un projet. Et qui se referme lorsque l’on clique en dehors de la modale.

Une fois cette étape terminée, je devrais avoir :

La possibilité de supprimer un des travaux de l’architecte.

Recommandations : 

Faites bien attention à la requête. Regardez le document Swagger et demandez-vous : comment construire ma requête fetch pour supprimer un élément ? 

Points de vigilance :

On ne devrait pas avoir besoin de recharger la page pour voir que le projet a été supprimé. Assurez-vous donc de répondre à la question suivante : 

Comment retirer des éléments du DOM après avoir reçu la confirmation de la suppression de l’entrée en base de données ?

Avant de démarrer cette étape, je dois avoir :

La fenêtre modale qui s’ouvre quand on clique sur le bouton pour ajouter un projet. Et qui se referme lorsque l’on clique en dehors de la modale.

La première page de la modale pour la suppression de travaux est fonctionnelle

Lors du clic sur le bouton « Ajouter une photo » la modale affiche la zone du formulaire d’ajout

Une fois cette étape terminée, je devrais avoir :

La sélection d’une nouvelle image déclenche une preview.

Les catégories sont récupérées dynamiquement de puis les données de l’API 

Un message d’erreur si le formulaire n’est pas correctement rempli. 

Une réponse de l’API si le formulaire est correctement envoyé.

Pour tester, si je recharge la page, le nouveau projet doit s’afficher dans la galerie de la page d’accueil

Recommandations : 

Avant d’envoyer les informations via le fetch, pensez à vérifier : 

Est-ce que j’ai bien toutes les informations nécessaires à l’envoi d’une nouvelle entrée ?

Est-ce que je vais envoyer les données, via le fetch, dans le bon format ou avec les propriétés attendue par l’API

Ressources :

Voir cette information sur l’utilisation des objets FormData pour l’envoi des données du formulaire.

Finalisons l’ajout de projet en actualisant de manière dynamique le DOM, afin d’ajouter nos travaux sans recharger la page. 

 

Avant de démarrer cette étape, je dois avoir :

Une réponse correcte de l’API quand j’envoie un nouveau projet depuis le formulaire à l’API.

Une fois cette étape terminée, je devrais avoir :

L’ajout dynamique du projet dans la galerie après l’envoi du formulaire. 

Recommandations : 

De la même manière que vous avez ajouté les projets existants du back-end au début du projet, analysez où et comment actualiser le DOM, afin d’afficher les nouveaux projets sans recharger la page.  

Points de vigilance :

N’oubliez pas d’ajouter la nouvelle image, non seulement dans le portfolio, mais également dans la galerie de la modale.  

Ressources :

Le chapitre “Créez un nouvel élément dans une page web” du cours “Apprenez à programmer avec JavaScript” vous aidera à ajouter des éléments dans le DOM.

 
Avant de démarrer cette étape, je dois avoir :

L’image qui s’ajoute au DOM.

Toutes les fonctionnalités demandées implémentées.

 Une fois cette étape terminée, je devrais avoir :

Un projet testé et validé prêt pour la soutenance.

Recommandations : 

Testez votre code en vous posant les questions suivantes : 

Comment se comportent mes formulaires si j’entre des données erronées ? 

Est-ce que le visuel correspond aux attentes de la maquette ? 

Comment la mise à jour de l’interface est-elle gérée quand je dois ajouter ou supprimer des éléments du DOM ?