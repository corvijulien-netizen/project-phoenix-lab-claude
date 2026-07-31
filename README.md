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
  data/camino-data.js           le tracé : 86 villes réelles, Rome → Santiago
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
  route/projection-report.json   détail des 86 villes projetées, ville par ville
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

### Sur les 3 000 km affichés — et ce qui reste une vraie question

Le site affiche **« ≈ 3 000 km »** comme cap symbolique — un choix de Julien,
conservé tel quel, distinct de la distance réelle du tracé (2 796,42 km). Les
positions de chaque ville viennent de la géométrie réelle, mises à l'échelle de
ce cap symbolique par un facteur unique (×1,0728) : la précision relative entre
deux villes n'en souffre pas.

**Ce choix mérite d'être reconfirmé maintenant que le tracé réel existe.** Le cap
de 3 000 km est aussi ce qui donne exactement 60 tampons de 50 km — un chiffre
rond, pas un hasard. Basculer l'affichage sur la distance réelle (2 796,42 km)
casserait cette règle : 2 796 / 50 = 55,92, pas un compte rond. Ce n'est pas une
simple substitution de texte, et le choix appartient à Julien :

- garder 3 000 km symbolique (aucun changement, le statu quo) ;
- passer à ~2 800 km réels avec 56 tampons pleins de 50 km et un reliquat ;
- un autre découpage à discuter.

**Conséquence importante, inchangée :** le nom du lieu affiché est *déduit* de
la position calculée, jamais saisi à la main. Les deux ne peuvent donc pas
diverger quand la distance change.

---

## Données de démonstration

Tant que `mode` vaut `"demo"`, un bandeau **« Données de démonstration »**
s'affiche et le pied de page le rappelle. Les valeurs actuelles — 18,6 km,
La Storta, 0/60 tampons — servent uniquement à construire et tester.

Elles seront remplacées par les vrais chiffres du Jour 1.
