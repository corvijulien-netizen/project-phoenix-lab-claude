# ADR-004 — Séparation des entités Place et Stamp

**Statut** : Accepté

## Contexte

La première version du tracé modélisait chaque lieu du chemin comme une seule
entrée d'un tableau `route` : coordonnées, distance cumulée, et rang d'affichage
sur la carte. Le crédential — le carnet de tampons du pèlerin — était généré à
partir de cette même liste par un calcul purement kilométrique : un tampon tous
les 50 km, la ville la plus proche de chaque palier étant choisie automatiquement
(`STAMP_EVERY = 50`, `STAMP_COUNT = TOTAL_KM / STAMP_EVERY`).

Ce mécanisme contredisait plusieurs règles fondatrices de la Bible de conception
(`docs/bible/chapitre-1-vision.md`, §9) :

- un tampon n'est pas un calcul de distance, c'est un lieu choisi pour son poids
  culturel, historique ou symbolique ;
- le nombre final de tampons n'est pas figé — il ne peut donc pas être déduit
  d'une distance totale divisée par un intervalle fixe ;
- les tampons non atteints ne doivent jamais apparaître dans l'interface, même
  masqués visuellement — la boucle kilométrique générait les 60 tampons d'un
  coup, y compris ceux très loin dans le futur.

De plus, `route` mélangeait deux préoccupations distinctes : *où se trouve un
lieu et comment l'afficher sur la carte* (des données géographiques stables) et
*quels lieux méritent un tampon* (une sélection narrative et éditoriale, appelée
à changer indépendamment de la géométrie).

## Décision

Séparer deux entités dans `assets/data/camino-data.js` :

- **`places`** — un point du tracé : `id` stable (slug), `name`, `coords`,
  `country`, `rank` (densité d'affichage sur la carte), `km` (position réelle,
  projetée depuis la géométrie GPX). C'est une donnée géographique, indépendante
  de toute narration.
- **`STAMPS`** — un lieu choisi pour devenir un tampon du crédential. Référence
  un `place` par `placeId` plutôt que de dupliquer ses coordonnées, et porte
  `routeDistanceKm`, `category`, `description`, `sourceIds`, et un `status`
  (`hidden` | `revealed` | `unlocked`) qui n'est **jamais stocké** : il est
  recalculé à chaque appel de `getStamps(km)` à partir de la progression réelle.

`getStamps(km)` ne renvoie que les tampons dont `routeDistanceKm` est atteint.
Un tampon futur n'est donc pas filtré ou masqué en aval par l'interface : il
n'existe pour aucune partie du programme tant qu'il n'est pas atteint.

## Conséquences

**Positives**

- Un affichage prématuré d'un tampon futur devient structurellement impossible,
  plutôt que dépendant d'une condition CSS ou d'un `if` qu'on pourrait oublier
  de vérifier à un nouvel endroit du code.
- Le nombre de tampons n'est plus contraint par un calcul : `STAMPS` grandit
  librement au rythme d'une sélection éditoriale, sans toucher au reste du code.
- Remplacer la source `STAMPS` par un appel à une future base documentaire ou à
  un Knowledge Graph (Bible, §11) ne demande de changer que la fonction qui
  alimente ce tableau — `getStamps()` reste la seule interface dont le reste du
  site dépend.
- `places` peut évoluer (ajouter, retirer, recalibrer un lieu après vérification
  géométrique) sans jamais affecter la logique des tampons.

**Compromis acceptés**

- `STAMPS` est aujourd'hui curatée à la main, un lieu à la fois — il n'y a pas
  encore d'automatisation ni de règle de sélection formalisée. C'est voulu :
  la Bible réserve explicitement ce choix à une décision éditoriale, pas à un
  algorithme.
- Le statut `revealed` existe dans le type mais n'est jamais produit
  aujourd'hui : ce que signifierait précisément un lieu « révélé mais pas
  encore tamponné » n'est pas encore cadré par la Bible. Le champ reste en
  place comme point d'extension documenté, pas comme fonctionnalité implémentée.

## Alternatives envisagées

- **Conserver `route` et ajouter un indicateur « ceci est un tampon ».**
  Rejeté : ça ne règle pas le problème de fond — le calcul resterait piloté par
  une distance plutôt que par une sélection, et coordonnées géographiques et
  métadonnées narratives resteraient mélangées dans la même structure.
- **Fusionner Place et Stamp en une seule entité enrichie.** Rejeté : la plupart
  des lieux du tracé (86 aujourd'hui) ne sont et ne seront jamais des tampons.
  Leur faire porter des champs narratifs (`category`, `description`,
  `sourceIds`) qu'ils n'utiliseront jamais aurait été un couplage inutile.
