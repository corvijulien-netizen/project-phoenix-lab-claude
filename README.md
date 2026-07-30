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

Le tracé compte 89 villes réelles, de Rome à Santiago.

Les distances ne sont **pas** déduites du vol d'oiseau. Elles sont **calées sur
une vingtaine de distances de référence** relevées par les guides et offices de
pèlerins (Sutri à 45 km, Viterbe à 92, Sienne à 260, Lucques à 419, Burgos à
280 depuis Saint-Jean, Santiago à 780…). Entre deux points d'ancrage, les
villes intermédiaires sont réparties au prorata.

Une approche plus simple — un facteur de sinuosité unique appliqué à tout le
tracé — a été essayée puis **abandonnée** : elle étirait de la même façon une
côte rectiligne et un franchissement de col, et se trompait jusqu'à **+39 %**
sur le Camino Francés. Le calage par ancres tombe juste sur chaque référence.

> **Ces distances restent des approximations.** Les guides varient de ±5 à 10 %
> selon les sources et les variantes. Elles ne remplacent pas un tracé GPX, et
> ne doivent pas être traitées comme des mesures au mètre.

### Un tracé composé, pas un chemin historique

Il n'existe pas de « chemin officiel Rome → Santiago ». Le tracé enchaîne :

| Segment | Statut |
| --- | --- |
| **Via Francigena** — Rome → Lucques | itinéraire réel, section la mieux documentée |
| **Côte ligure** — Lucques → Arles | **estimé** — aucun chemin de pèlerinage ne relie la Toscane à la Provence ; suit l'ancienne Via Aurelia |
| **Via Tolosana** — Arles → Saint-Jean-Pied-de-Port | itinéraire réel, classé UNESCO en 1998 |
| **Camino Francés** — Saint-Jean → Santiago | itinéraire réel, le mieux balisé |

Le site l'affiche tel quel, dans la bande « Un tracé composé » sous la carte, et
marque le maillon ligure comme estimé. Il ne présente pas la combinaison comme
un chemin historique unifié.

### Sur les 3 000 km

Le chemin ainsi reconstitué mesure environ **2 590 km** — cohérent avec la
fourchette de 2 200 à 2 600 km attendue. Les 3 000 km sont conservés comme
**objectif rond et symbolique** : c'est le choix de Julien, et c'est aussi ce
qui donne exactement 60 tampons de 50 km. Le tracé est mis à cette échelle,
donc les positions relatives restent fidèles.

**Conséquence importante :** le nom du lieu affiché est *déduit* de la position
calculée, jamais saisi à la main. Les deux ne peuvent donc pas diverger quand la
distance change.

### Une décision restée ouverte

La Via Tolosana franchit historiquement les Pyrénées au **col du Somport**, puis
devient le Camino Aragonés et rejoint le Camino Francés à Puente la Reina —
**sans passer par Saint-Jean-Pied-de-Port**. Le tracé actuel passe par
Saint-Jean : c'est l'option symbolique, plus simple à raconter puisque c'est la
« porte de Compostelle » la plus connue, mais elle mêle deux chemins distincts.

Les deux se défendent. Le choix appartient à Julien.

---

## Données de démonstration

Tant que `mode` vaut `"demo"`, un bandeau **« Données de démonstration »**
s'affiche et le pied de page le rappelle. Les valeurs actuelles — 18,6 km,
La Storta, 0/60 tampons — servent uniquement à construire et tester.

Elles seront remplacées par les vrais chiffres du Jour 1.
