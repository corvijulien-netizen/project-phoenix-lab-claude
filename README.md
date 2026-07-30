# Camino Virtuel

> Mes pas sont réels. Le voyage est virtuel.

Julien marche réellement, sac au dos, autour de chez lui. Chaque kilomètre réel
le fait avancer virtuellement sur un pèlerinage de **Rome à Santiago de
Compostela**, environ 3 000 km. Un crédential de **60 tampons** — un tous les
50 km — se remplit au fil du chemin et débloque la Compostela virtuelle.

---

## Ouvrir le site

**Double-clique sur `index.html`.** C'est tout.

Le site fonctionne sans serveur, sans installation, sans connexion internet.
Tout est embarqué dans le dépôt : la bibliothèque de carte, les contours
géographiques, les fontes, l'illustration. Aucun appel à un service extérieur.

> Une seule fonction demande internet : le bouton **« Vue détaillée »**, qui
> charge les tuiles OpenStreetMap. Sans réseau, la carte dessinée s'affiche
> normalement — c'est le mode par défaut.

---

## Mettre les chiffres à jour

**Un seul fichier à modifier : `assets/data/camino-state.js`.**

Tout le reste en découle — la carte, la position, le nombre de tampons, les
pourcentages, les distances restantes. Il n'y a aucun chiffre écrit en dur
ailleurs dans le site.

```js
window.CAMINO_STATE = {
  mode: "demo",        // "demo" = bandeau de démonstration | "reel" = données réelles
  distanceKm: 18.6,    // total marché depuis le départ
  todayKm: 11.2,       // marché aujourd'hui   (null si pas encore relevé)
  startDate: null,     // date du Jour 1       (null tant qu'elle n'est pas fixée)
  ...
};
```

### La règle du `null`

> **Une valeur que l'on n'a pas vaut `null`. Jamais un chiffre plausible.**

`null` ne veut pas dire zéro. Il veut dire « pas encore mesuré », et le site
l'affiche comme un état **« en attente »** assumé, avec sa propre matière
graphique — hachure fine, encre ocre, contour tireté.

Une nuit non enregistrée n'est pas une nuit de 7 h. Un repas non saisi n'est pas
0 kcal. Le site est construit pour que cette distinction soit impossible à
perdre en route.

---

## Ce que contient le dépôt

```
index.html                      la page
assets/
  css/camino.css                toute la mise en forme
  data/camino-state.js          ← LES CHIFFRES (le seul fichier à modifier)
  data/camino-data.js           le tracé : 89 villes réelles, Rome → Santiago
  data/europe-geo.js            contours côtiers et frontières (Natural Earth)
  js/camino.js                  rendu de la page
  js/camino-map.js              la carte
  js/vendor/                    Leaflet 1.9.4, embarqué
  fonts/                        EB Garamond + Inter, auto-hébergées
  img/                          illustrations d'étape
baseline/                       l'ancienne version, gardée pour comparaison
```

Le dossier **`baseline/`** contient le site tel qu'il était avant cette refonte.
Il ne sert qu'à comparer l'avant et l'après. Il peut être supprimé sans aucun
effet sur le site.

---

## Les règles du projet

Non négociables, elles sont vérifiées à chaque modification :

- Aucune mention de « 365 jours » ni de « Camino 80 » dans l'interface.
- Aucune donnée Santé, nutrition ou sommeil inventée — voir la règle du `null`.
- Aucun export Apple Santé brut publié, aucune donnée privée sans accord.
- Aucun commentaire Santé présenté comme un diagnostic médical.
- Activité, Nutrition, Sommeil et Journal restent **dans la colonne de gauche**.
  Sous la carte, il y a le crédential — pas quatre blocs doublons.
- La carte reste une **vraie carte** Leaflet, zoomable et déplaçable. Jamais une
  image statique.
- Pas d'effet néon, pas de surcharge de coquilles, pas d'avatar.

---

## Comment la position est calculée

Le tracé compte 89 villes réelles, de Rome à Santiago. La somme des segments à
vol d'oiseau entre elles vaut environ 2 050 km, alors qu'un pèlerin qui marche
vraiment en parcourt environ 3 000 : un chemin serpente, monte et contourne.

Le rapport entre les deux (~1,46) est appliqué comme **facteur de sinuosité**.
Il est calculé, pas deviné — il découle directement des deux longueurs. C'est
une approximation, et le site l'annonce comme telle : « ≈ 3 000 km selon le
tracé ».

Le jour où un vrai fichier GPX sera disponible, il remplacera ce calcul sans
rien changer au reste du code.

**Conséquence importante :** le nom du lieu affiché est *déduit* de la position
calculée, jamais saisi à la main. Les deux ne peuvent donc pas diverger quand la
distance change.

---

## Données de démonstration

Tant que `mode` vaut `"demo"`, un bandeau **« Données de démonstration »**
s'affiche et le pied de page le rappelle. Les valeurs actuelles — 18,6 km,
La Storta, 0/60 tampons — servent uniquement à construire et tester.

Elles seront remplacées par les vrais chiffres du Jour 1.
