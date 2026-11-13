# Wayorbi — vision produit et règles d'implémentation

## Objectif

Construire un **réseau social du voyage**, et non un simple moteur de réservation ou une collection de belles photos. Le contenu principal est le **carnet de voyage** : récit structuré qui relie expériences vécues, itinéraires, transports, budgets, conseils, moments visuels et contexte.

Le site fourni est un **site vitrine avec simulations interactives**. Une future application connectée devra être construite séparément ou en ajoutant une véritable architecture backend. Ne jamais présenter un prototype local comme un réseau social opérationnel.

## Design

- Palette cyan / bleu / violet et univers élégant, lumineux, immersif, lisible.
- Animation originale du globe et de l'avion intégrée dès l'accueil.
- Design original ; ne pas reproduire le code, les textes ou les assets de Polarsteps.
- Accessibilité mobile, clavier, contraste, réduction des mouvements ; vidéo contrôlable.

## Expérience principale

### Accueil

Stories, voyageurs à découvrir, comptes suivis (« À la une »), carnets publics populaires, invitations à explorer et créer.

### Explorer

Recherche de destinations, profils, carnets et conseils ; filtres d'intérêts ; suggestions personnalisées. Inspirations enregistrables.

### Carnets

- Couverture, titre, description, destination, durée et dates, personnes, type d'expérience (détente / nature & aventure / découverte & tourisme), rythme.
- Budget total, catégories de dépenses et hypothèses utiles.
- Étapes ordonnées, itinéraire, mode de transport par étape et par expérience.
- Expériences regroupant gastronomie, activités, visites, culture, transports, conseils et médias.
- Projet originel : six médias minimum pour les expériences de la création complète.
- Création en deux étapes, sauvegarde en brouillon avant publication.
- Possibilité d'enregistrer les carnets utiles et d'en discuter.

### Profils

Bannière, biographie, ville/pays, compteurs, stories 24 h, stories à la une, type d'expérience, conseils, carnets publiés/enregistrés, brouillons, activité récente. Profil public/privé, règles de visibilité explicites.

### Communauté

Suivis/abonnements, réactions et recommandations, messages individuels et groupes, vocaux, photos et vidéos. Notifications renvoyant à l'élément concerné.

### Travel DNA

Filtres : budget, rythme, type de voyageur, rencontres, envies, transport, destination, objectif principal. Une future IA doit personnaliser de manière transparente sans prétendre qu'une recommandation statique est issue de données utilisateur réelles.

### Phase de test

Bêta concept-test publique accessible via lien `https://wayorbi-concept-test.pages.dev/`, annoncée jusqu'au 1er décembre 2026. Parcours guidé en **cinq missions** et exploration libre. Retours constructifs, tests sérieux ; les missions exactes sont définies dans la maquette, ne pas les inventer dans le site vitrine.

## Sécurité, données et honnêteté

- Pas de faux profils ou de statistiques présentés comme des comptes réels.
- Pas de formulaire qui promet un enregistrement sans stockage effectif.
- Pas d'authentification, messagerie, upload ou publication factices décrits comme fonctionnels.
- Pour une production réelle : base de données, schéma, contrôle d'accès et RLS, modération, suppression et export, stockage médias, politiques de confidentialité, conformité RGPD, sécurité des secrets, tests.
- Pas de données sensibles dans le code, pas de clés d'API exposées au navigateur.

## Priorités de livraison recommandées

1. Site vitrine riche, fidèle au concept, avec pages et démos fonctionnelles locales (**livré dans cette version**).
2. Recherche utilisateurs et consolidation des retours du concept test.
3. Maquettes responsive et parcours utilisateurs complets.
4. Backend : comptes, profils, visibilité, carnet/étape/expérience, médias, budgets, abonnements.
5. Fonctions communautaires : enregistrement, messages, notifications, stories.
6. Travel DNA personnalisé, journalisation et respect de la vie privée.
7. Tests réels de bout en bout et déploiement contrôlé.
