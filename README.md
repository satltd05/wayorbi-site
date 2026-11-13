# Wayorbi — site de présentation

Site multipage qui présente **Wayorbi**, un projet de réseau social consacré aux carnets de voyage. Les visiteurs y trouvent le concept, des carnets d’exemple complets, des profils de voyageurs et des démonstrations interactives.

> **Ce site est une démonstration.** Les carnets, voyageurs, budgets, commentaires et stories sont **fictifs**. Les interactions (suivre, aimer, commenter, enregistrer, Travel DNA, brouillon de l’atelier) fonctionnent vraiment, mais elles sont enregistrées **uniquement dans le navigateur du visiteur** (`localStorage`). Il n’y a ni compte, ni serveur, ni publication.

## Pages

| Adresse | Contenu |
| --- | --- |
| `/` | Accueil : vidéo du logo, fil façon réseau social (stories, carnets, suggestions), carnet interactif, estimation de budget |
| `/concept` | Le constat, la réponse de Wayorbi, le parcours avant/pendant/après, les piliers |
| `/carnets` | Les 9 carnets d’exemple, filtrables par type, et la création en deux étapes |
| `/carnets/:id` | Un carnet complet : carte de l’itinéraire, étapes, photos, transports, activités, adresses, conseils, budget en 5 catégories, commentaires |
| `/explorer` | Recherche et filtres (destination, budget, durée, type, transport, envie), tri selon le Travel DNA ; filtres conservés dans l’adresse |
| `/communaute` | Voyageurs, stories, aperçu de la messagerie, profil public ou privé |
| `/voyageurs/:id` | Profil d’un voyageur fictif : stories à la une, carnets, conseils, activité |
| `/travel-dna` | 8 critères, suggestions de carnets et de voyageurs expliquées, calcul transparent |
| `/atelier` | Création d’un carnet en deux étapes, brouillon local, aperçu, export JSON |
| `/mon-espace` | Tout ce que le visiteur a gardé pendant sa visite, effaçable |
| `/fonctionnalites` | Ce qui a une démo sur ce site et ce qui est prévu pour l’application |
| `/beta` | Bêta-test de la maquette ; bascule automatiquement en « terminé » après le 1er décembre 2026 |
| `/faq`, `/credits`, `/mentions-legales`, `/confidentialite` | Informations |

## Lancer le site sur son ordinateur

Prérequis : Node.js 20.19 ou plus récent, et npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

Le serveur de développement et la prévisualisation (`npm run preview`) n’écoutent que sur **cet ordinateur** (`localhost`) : ils ne sont pas accessibles depuis le réseau.

Avant de publier :

```bash
npm run check    # vérification TypeScript (mode strict) + compilation dans dist/
```

## Organisation du code

```
src/
  config/site.ts        contact, dates du bêta-test, informations légales à compléter
  data/carnets.ts       les 9 carnets d'exemple (étapes, budgets, adresses, conseils)
  data/travelers.ts     les 5 voyageurs fictifs (stories, stories à la une)
  data/travelPhotos.ts  les 80 photos et leurs crédits (auteur, licence, source)
  lib/                  calculs (budgets, carte, recherche), Travel DNA, données de démo, routeur
  components/           éléments réutilisables (cartes, carte d'itinéraire, stories, boutons…)
  pages/                une page par fichier, chargée à la demande
  styles/fonts.css      polices hébergées dans le projet (Fraunces, Inter)
public/
  photos/  fonts/  media/logo-wayorbi-anime.mp4  og-image.jpg  _redirects  _headers
docs/                   cahier des charges et documents de travail
```

### Modifier le contenu

- **Un carnet** : `src/data/carnets.ts`. Les totaux, la carte et les filtres se recalculent tout seuls. Une photo inconnue est signalée dès la vérification TypeScript.
- **Une photo** : déposer le fichier dans `public/photos/` puis ajouter son entrée dans `src/data/travelPhotos.ts` **avec l’auteur, la licence et la source**. Elle apparaîtra automatiquement sur la page Crédits.
- **Les dates du bêta-test** : `BETA` dans `src/config/site.ts`. La page Bêta, le menu, l’accueil, le pied de page et la FAQ changent seuls à la date de fin.

## Publier le site

1. **Compléter les mentions légales** : remplir `LEGAL` dans `src/config/site.ts` (éditeur, statut, adresse, directeur de la publication, hébergeur). Tant qu’un champ est vide, la page affiche « À compléter ».
2. **Choisir l’adresse publique** et la déclarer dans la variable `SITE_URL` (voir `.env.example`) : elle complète l’image d’aperçu des liens partagés et génère `sitemap.xml`.
3. **Relire le dossier `docs/`** : il contient des documents de travail ; les retirer du dépôt s’il devient public.
4. **Déposer le code sur GitHub** :
   ```bash
   git remote add origin https://github.com/<compte>/<depot>.git
   git push -u origin main
   ```
5. **Héberger** (Cloudflare Pages, comme la maquette du bêta-test, ou Netlify) :
   - commande de compilation : `npm run build`
   - dossier publié : `dist`
   - variable d’environnement : `SITE_URL`

   `public/_redirects` renvoie toutes les adresses vers l’application (nécessaire pour `/carnets/japon`, etc.) et `public/_headers` ajoute des en-têtes de sécurité et de cache.

## Principes à respecter

- Ne jamais présenter une démonstration comme une fonctionnalité disponible ; ne pas inventer de chiffres, de témoignages, de partenariats ou de services opérationnels.
- Garder la vidéo du logo et l’identité bleu, cyan et violet.
- Créditer chaque photo ; n’utiliser aucune photo de visage pour les profils fictifs.
- Ne rien enregistrer côté serveur sans politique de confidentialité à jour.

## Vers l’application

Ce site ne remplace pas l’application. Pour un réseau social réel, il faudra notamment : authentification et profils, base de données (carnets, étapes, médias, budgets, abonnements), stockage des photos et vidéos, règles de visibilité public/privé, modération, notifications, messagerie, conformité RGPD et tests de bout en bout.
