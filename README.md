# Camino Virtuel

> Mes pas sont réels. Le voyage est virtuel.

Julien marche réellement, sac au dos, autour de chez lui. Chaque kilomètre
volontairement enregistré pour le projet le fait avancer virtuellement sur un
pèlerinage de **Rome à Santiago de Compostela**, 2 796,42 km selon la
géométrie réelle du tracé. Un crédential se remplit au fil des lieux les plus
significatifs qu'il atteint réellement — jamais tous les 50 km, jamais révélé
à l'avance.

La communauté ne marche pas. Elle suit Julien et devient témoin de son
histoire.

> **Référence du projet : [`docs/bible/chapitre-1-vision.md`](docs/bible/chapitre-1-vision.md).**
> Ce document prime sur ce README en cas de désaccord. Toute décision
> technique, éditoriale ou graphique doit rester cohérente avec lui.

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

Tout le reste en découle — la carte, la position, les tampons révélés, les
pourcentages, les distances restantes. Il n'y a aucun chiffre écrit en dur
ailleurs dans le site.

```js
window.CAMINO_STATE = {
  mode: "demo",         // "demo" = bandeau de démonstration | "reel" = données réelles
  distanceKm: 18.6,     // total marché depuis le départ, activités officielles uniquement
  todayKm: 11.2,        // marché aujourd'hui   (null si pas encore relevé)
  dailyGoalKm: 15,      // objectif d'activité quotidienne affiché dans « Mon quotidien »
  startDate: null,      // date du Jour 1       (null tant qu'elle n'est pas fixée)
  ...
};
```

`distanceKm` et `todayKm` sont la **seule** source des kilomètres qui font
avancer le Camino (Bible, §8.2) : uniquement des activités volontairement
enregistrées pour le projet, jamais les pas ordinaires du quotidien. La tuile
« Activité » de la colonne de gauche affiche `todayKm` directement — ce n'est
pas une valeur indépendante qui pourrait diverger.

### Ajouter un tampon

Les tampons vivent dans `assets/data/camino-data.js`, tableau `STAMPS`. Un
lieu ne devient un tampon qu'après une sélection culturelle ou narrative —
jamais par calcul de distance. Un tampon référence un lieu par son `placeId`
plutôt que de dupliquer ses coordonnées :

```js
{
  id: "stamp-...",
  name: "...",
  placeId: "...",           // doit exister dans `places`
  routeDistanceKm: 0,       // km réel auquel le tampon se révèle
  category: "official" | "historical" | "authorized-reproduction" | "inspired" | "camino-virtual",
  description: "...",
  sourceIds: []
}
```

Un tampon dont `routeDistanceKm` n'est pas encore atteint **n'existe pour
aucune partie du site** — `getStamps(km)` ne le renvoie pas. Ce n'est pas
masqué par du CSS, c'est structurellement invisible.

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
docs/
  bible/chapitre-1-vision.md     référence du projet — prime sur ce README
assets/
  css/camino.css                toute la mise en forme
  data/camino-state.js          ← LES CHIFFRES (le seul fichier à modifier)
  data/camino-data.js           les lieux (Place), les tampons (Stamp), le récit
  data/europe-geo.js            contours côtiers et frontières (Natural Earth)
  js/camino.js                  rendu de la page
  js/camino-map.js              la carte
  js/vendor/                    Leaflet 1.9.4, embarqué
  fonts/                        EB Garamond + Inter, auto-hébergées
  img/                          illustrations d'étape
data/
  gpx/master-route.gpx           tracé source, 131 042 points, 7 relations OSM
  gpx/sources.md                 traçabilité complète (licence, jonctions)
  route/master-route.geojson     le même tracé, converti en LineString WGS84
  route/route-version.json       version du tracé, historique des changements
  route/projection-report.json   détail des 86 lieux projetés, lieu par lieu
baseline/                       l'ancienne version, gardée pour comparaison
```

Le dossier **`baseline/`** contient le site tel qu'il était avant cette refonte.
Il ne sert qu'à comparer l'avant et l'après. Il peut être supprimé sans aucun
effet sur le site.

---

## Les règles du projet

Non négociables, elles sont vérifiées à chaque modification. Reprises et
complétées par la Bible (`docs/bible/chapitre-1-vision.md`), qui fait foi en
cas de désaccord :

- Julien est le personnage principal ; la communauté suit, elle ne marche pas.
- Les kilomètres ne viennent que d'activités volontairement enregistrées pour
  le projet — jamais des pas ordinaires du quotidien.
- La distance de référence est **2 796,42 km**, la distance réelle du tracé.
- Les tampons ne sont **jamais** attribués tous les 50 km ; leur nombre final
  n'est pas figé. Seul celui de Rome est visible au lancement ; les suivants
  ne sont jamais affichés avant que Julien les atteigne réellement.
- Aucune mention de « 365 jours » ni de « Camino 80 » dans l'interface.
- Aucune donnée Santé, nutrition ou sommeil inventée — voir la règle du `null`.
- Aucun export Apple Santé brut publié, aucune donnée privée sans accord.
- Aucun commentaire Santé présenté comme un diagnostic médical.
- Aucune transformation corporelle artificiellement embellie.
- « Mon quotidien » (colonne de gauche : Activité, Nutrition, Sommeil, Journal)
  reste distinct de « Compagnons de route », réservé à la future communauté.
  Sous la carte, il y a le crédential — pas quatre blocs doublons.
- La carte reste une **vraie carte** Leaflet, zoomable et déplaçable. Jamais une
  image statique.
- Pas d'effet néon, pas de surcharge de coquilles, pas d'avatar.

---

## Comment la position est calculée

Le tracé compte **86 villes réelles**, de Rome à Santiago, chacune **projetée
perpendiculairement** sur une géométrie GPX authentique — jamais reliée à vol
d'oiseau, et jamais calée sur des distances de guide approximatives.

### La source : 7 relations OpenStreetMap, pas un tracé dessiné à la main

```
data/gpx/master-route.gpx        le tracé complet, 131 042 points GPS
data/gpx/sources.md              la traçabilité : 7 relations OSM, licence ODbL,
                                  écart de jonction pour chaque raccord
data/route/master-route.geojson  le même tracé, converti en LineString WGS84
data/route/route-version.json    la version de ce tracé (historique des futurs
                                  changements de géométrie)
data/route/projection-report.json le détail des 86 villes projetées : km réel,
                                  distance de projection, décision motivée pour
                                  chaque ville ajoutée ou retirée
```

Distance réelle du tracé : **2 796,42 km** — validée à 0,000 % près contre la
valeur calculée indépendamment par les deux relevés (Julien puis Claude, sur le
même fichier GPX).

Le tracé enchaîne 7 chemins de pèlerinage réels et sourcés, affichés tels quels
sous la carte, dans la bande « Un tracé composé » :

| Segment | Relation OSM |
| --- | --- |
| Via Francigena — Rome → Sarzana | 11860709 |
| Via della Costa — Sarzana → Vintimille | 11685878 |
| Via Aurelia — Vintimille → Arles | 8298137 |
| Voie d'Arles (Via Tolosana) — Arles → Oloron-Sainte-Marie | 389715 |
| Piémont pyrénéen — Oloron-Sainte-Marie → Saint-Jean-Pied-de-Port | 368453 |
| Voie du Puy — Saint-Jean-Pied-de-Port → frontière espagnole | 138227 |
| Camino Francés — frontière espagnole → Santiago | 2163573 |

Il n'existe pas de « chemin officiel Rome → Santiago » : c'est une composition
de chemins réels et distincts, et le site le dit plutôt que de la présenter
comme un chemin historique unifié. Contrairement à la version précédente de ce
document, **aucun tronçon n'est plus une estimation narrative** — les 7
segments sont désormais des relations OSM identifiées.

### Le vrai corridor français, découvert par projection

La première version de ce tracé (calée sur des distances de guide) plaçait
17 villes sur un corridor plausible mais faux : Béziers, Narbonne, Carcassonne,
Castelnaudary, Aire-sur-l'Adour, Arzacq-Arraziguet, Orthez, Navarrenx — jusqu'à
**52 km** du vrai tracé une fois la géométrie GPX disponible. Elles appartenaient
à une autre variante du GR653, pas à celle que suit ce fichier.

Le vrai corridor, confirmé par projection (moins de 500 m d'écart pour chaque
ville) : **Arles → Castres → Toulouse → Auch → Pau → Oloron-Sainte-Marie →
Saint-Jean-Pied-de-Port.** Six villes ont été ajoutées après vérification
(Lodève, Castres, Revel, Villefranche-de-Lauragais, Pau, Oloron-Sainte-Marie),
chacune à moins de 500 m du tracé réel. Une septième (Aulla, section italienne)
a été retirée pour la même raison : 10,8 km d'écart, et une position qui violait
l'ordre du parcours. Le détail complet, ville par ville, est dans
`data/route/projection-report.json`, section `resolution`.

Cela répond au passage à la question précédemment ouverte du Somport : la
géométrie réelle confirme que ce tracé passe bien par Saint-Jean-Pied-de-Port,
pas par le col du Somport.

### Sur la distance affichée — tranché par la Bible

Le site affichait auparavant un cap symbolique arrondi à 3 000 km, distinct de
la distance réelle. La Bible de conception (règle fondatrice n°5) tranche cette
question : **la distance de référence est 2 796,42 km**, la distance réelle du
tracé — plus de cap arrondi, plus de mise à l'échelle. Chaque `km` dans
`camino-data.js` est directement la position réelle projetée sur la géométrie
GPX.

Conséquence directe : le crédential n'est plus non plus calé sur un découpage
de 50 km (qui donnait artificiellement 60 tampons pour 3 000 km). Voir
« Le crédential : un modèle piloté par les lieux » plus bas.

**Conséquence inchangée :** le nom du lieu affiché est *déduit* de la position
calculée, jamais saisi à la main. Les deux ne peuvent donc pas diverger quand la
distance change.

---

## Le crédential : un modèle piloté par les lieux

Le tampon n'est plus un calcul kilométrique. C'est une entité (`Stamp`) qui
référence un lieu (`Place`) par son identifiant, se révèle à un `routeDistanceKm`
précis, et n'existe pour l'interface qu'une fois ce seuil atteint :

```js
{
  id, name, placeId, routeDistanceKm,
  status: "hidden" | "revealed" | "unlocked",   // calculé, jamais stocké
  category: "official" | "historical" | "authorized-reproduction" | "inspired" | "camino-virtual",
  image, description, sourceIds
}
```

`status` n'est jamais persisté : `getStamps(km)` le recalcule à chaque appel à
partir de la progression réelle, et **ne renvoie pas du tout** les tampons dont
le seuil n'est pas atteint. Un tampon futur n'est donc pas masqué par du CSS —
il n'existe simplement pour aucune partie du programme tant qu'il n'est pas
atteint. `revealed` est prévu dans le type mais jamais produit aujourd'hui :
la Bible n'a pas encore cadré à quoi correspondrait un lieu « révélé mais pas
encore tamponné », donc ce mécanisme reste un point d'extension documenté,
pas une fonctionnalité inventée.

**Au lancement, un seul tampon existe : Rome.** Priorité appliquée pour son
motif, dans l'ordre demandé par Julien : pas de tampon officiel/historique
disponible ni de droit d'usage vérifié → un tampon **original**, `category:
"inspired"`, dessiné pour ce projet (une coquille, motif jacquaire déjà utilisé
partout ailleurs sur le site, et des clés croisées schématiques évoquant
l'identité de Rome — sans reproduire aucun tampon existant). Il pourra être
remplacé plus tard par une source officielle ou documentée, sans changement de
structure : `getStamps()` est la seule interface dont le reste du site dépend.

Le nombre final de tampons **n'est pas figé**. `STAMPS` grandit au rythme d'une
sélection culturelle et narrative des lieux les plus significatifs du chemin —
jamais d'un calcul de distance.

---

## Données de démonstration

Tant que `mode` vaut `"demo"`, un bandeau **« Données de démonstration »**
s'affiche et le pied de page le rappelle. Les valeurs actuelles — 18,6 km,
La Storta, un seul tampon (Rome) — servent uniquement à construire et tester.

Elles seront remplacées par les vrais chiffres du Jour 1.
