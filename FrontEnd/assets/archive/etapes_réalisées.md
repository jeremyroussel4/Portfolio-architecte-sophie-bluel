Etape 2 Contenu dynamique de la galerie : terminé
Le projet :

appelle l’API http://localhost:5678/api/works ;
récupère les travaux avec fetch ;
génère dynamiquement les éléments figure, img et figcaption ;
affiche les projets dans la galerie ;
ne contient plus de projets écrits directement dans le HTML.
Cette partie est maintenant organisée en MVC avec :

main.js : démarrage ;
controller.js : coordination et affichage ;
model.js : appel API et état des travaux ;
index.html : DOM initial.

*Étape suivante*
La prochaine étape est :

Ajouter les filtres par catégorie
Il faudra :

récupérer les catégories présentes dans les données de l’API ;
afficher les boutons de filtre au-dessus de la galerie ;
ajouter le bouton Tous ;
filtrer les travaux au clic ;
conserver l’affichage par défaut de tous les travaux.
Étapes encore à réaliser

**Après les filtres, il restera :**

intégrer la page de connexion ;
rendre la connexion fonctionnelle ;
gérer le mode édition ;
gérer la déconnexion ;
créer la fenêtre modale ;
supprimer des travaux via l’API ;
ajouter un nouveau travail avec preview ;
actualiser dynamiquement la galerie après ajout ;
tester l’ensemble avant soutenance.