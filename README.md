# Wayorbi — site vitrine interactif (version multipage)

Refonte du site de présentation de Wayorbi, conçue à partir du projet original fourni.

## Parcourir les pages

| Adresse | Contenu |
| --- | --- |
| `/` | Accueil immersif, vidéo originale du logo, démonstrations, invitation à participer |
| `/concept` | Vision, promesse et moments du voyage |
| `/carnets` | Exemple de carnet interactif et explication de la création en deux étapes |
| `/atelier` | Atelier guidé pour rédiger un brouillon **local** et exporter les données JSON |
| `/explorer` | Recherche et filtres d'itinéraires, budgets et conseils illustratifs |
| `/communaute` | Exemples de profils, stories et choix public/privé simulés |
| `/travel-dna` | Quiz interactif et propositions d'inspiration calculées localement |
| `/fonctionnalites` | Panorama détaillé des fonctionnalités prévues pour Wayorbi |
| `/beta` | Fonctionnement du test guidé et lien vers la maquette publique |
| `/faq` | Réponses sur le projet, le stade de développement et les données |
| `/credits` | Crédits des photos de voyage : lieu, auteur, licence et source de chaque image |

## Exécuter localement

**Prérequis : Node.js 22 ou compatible avec Vite 8, npm.**

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. Pour préparer une version statique :

```bash
npm run lint
npm run build
```

Déployer le contenu de `dist/` sur un hébergement permettant la redirection des routes SPA vers `index.html`. La redirection client repose sur History API.

## Principes du projet

- Identité originale Wayorbi conservée : bleu, cyan, violet, vidéo animée dans `public/assets/aistudio/`.
- Pages responsive, navigation interne, pause de la vidéo, prise en compte de la réduction des animations, lien d'évitement.
- Les profils, histoires et voyages d'exemple sont **fictifs**.
- Les 51 photos des carnets d'exemple et des fiches Explorer viennent de **Wikimedia Commons** (licences Creative Commons ou domaine public). Elles sont stockées dans `public/photos/`. Leur auteur, leur licence et leur source sont dans `src/data/travelPhotos.ts`, affichés sur chaque photo et sur la page `/credits`. Toute nouvelle photo doit y être ajoutée avec son crédit.
- Le **Travel DNA** est une simulation de règles locales, **pas une IA** ou un algorithme de production.
- L'**atelier carnet** sauvegarde automatiquement le brouillon dans `localStorage` **uniquement sur l'appareil**. Il permet un export JSON, une remise à zéro, mais pas de publication, d'authentification ou de médias.
- Le formulaire de contact prépare un **e-mail à envoyer par l'utilisateur** et n'affirme plus enregistrer une inscription sans service de collecte.
- Le site vitrine ne constitue **pas** une application sociale avec backend, comptes, notifications réelles ou messagerie.
- La page bêta pointe vers `https://wayorbi-concept-test.pages.dev/` et rappelle la fin de la période de test annoncée : 1er décembre 2026.

## Prochaines étapes avant une vraie application

1. Concevoir/valider les écrans et le design system, puis tester les pages sur mobile.
2. Concevoir une authentification et les autorisations, dont la visibilité public/privé.
3. Définir un modèle de données pour comptes, carnets, étapes, expériences, photos/vidéos, budgets, stories, suivis, favoris, discussions et notifications.
4. Intégrer un backend (Supabase, ou équivalent), la gestion des fichiers, des règles RLS et des sauvegardes.
5. Prévoir la gestion de consentement et de confidentialité, la modération, la suppression des contenus et la conformité RGPD avant ouverture réelle.
6. Ajouter des tests unitaires, tests de parcours E2E, vérifications accessibilité et monitoring.

## Vérification

La syntaxe TypeScript/TSX a été analysée. Le build Vite complet **n'a pas pu être exécuté ici**, faute d'accès aux dépendances npm dans l'environnement de génération. Lancer `npm install && npm run lint && npm run build` avant publication.
