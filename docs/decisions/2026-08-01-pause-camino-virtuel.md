# Mise en pause de Camino Virtuel

## Statut

**Projet mis en pause le 1er août 2026, pour une durée indéterminée.**

Camino Virtuel n'est ni abandonné ni supprimé. Aucun fichier, aucune
documentation, aucune maquette, aucun asset n'a été retiré du dépôt à
l'occasion de cette pause. Ce document est le point de reprise destiné à
une future session Claude Code, humaine ou assistée.

## Raison

Le concept de Camino Virtuel est devenu, au fil de sa conception, suffisamment
ambitieux pour mériter un développement dédié à part entière — voyage
extérieur, voyage intérieur, crédential, communauté, Knowledge Graph, jumeau
numérique évolutif. Il ne peut plus avancer en tâche de fond.

La priorité immédiate redevient **Project Phoenix**, consacré à la
transformation physique de Julien — le projet initial de ce dépôt.

## Ce qui est définitivement validé

Ces éléments sont des décisions actées, pas des hypothèses — ils font foi en
cas de reprise :

- La phrase fondatrice : *« Mes pas sont réels. Le voyage est virtuel. »* et
  *« Tu ne suis pas simplement un voyage. Tu deviens le témoin de son
  histoire. »* (emplacement dans l'interface non tranché).
- **Julien est le personnage principal** ; la communauté suit son aventure,
  elle ne marche pas elle-même (Bible, §4-5).
- **Distance de référence : 2 796,42 km**, la distance réelle du tracé —
  ce n'est plus un cap symbolique arrondi (Bible, règle fondatrice n°5).
- **Les kilomètres ne comptent que s'ils viennent d'une activité
  volontairement et officiellement enregistrée** pour le projet ; les pas
  ordinaires du quotidien ne font jamais avancer le Camino (Bible, §8.2).
- **Règles d'authenticité** : aucune donnée fabriquée, aucune transformation
  corporelle artificiellement embellie (Bible, §8.1 et §8.3).
- **Les tampons ne sont jamais attribués tous les 50 km**, ne sont jamais
  révélés avant que Julien atteigne réellement le lieu ; seul le tampon de
  Rome est visible au lancement (Bible, §9 ; implémenté, voir plus bas).
- **Séparation des entités Place et Stamp** dans l'architecture technique
  (ADR-004, `docs/adr/ADR-004-place-stamp-separation.md`).
- **Le vrai corridor du tracé français** : Arles → Castres → Toulouse → Auch
  → Pau → Oloron-Sainte-Marie → Saint-Jean-Pied-de-Port, confirmé par
  projection sur la géométrie GPX réelle (pas la variante Béziers-Narbonne-
  Carcassonne envisagée puis écartée).
- **Le tracé s'appuie sur 7 relations OpenStreetMap réelles et sourcées**
  (licence ODbL), traçabilité complète dans `data/gpx/sources.md`.
- **Gouvernance du projet** : la Charte (`docs/CHARTER.md`), la règle
  qu'aucune branche n'est fusionnée dans `main` sans validation explicite de
  Julien, et la règle que toute décision importante doit trouver sa place
  dans le dépôt plutôt que de rester uniquement dans une conversation.
- **Le Design System est la source unique de vérité** pour les assets
  validés ; workflow `Lab → Validation → Design System → Intégration sur le
  site` (`docs/design-system/README.md`).
- **Logo « Tampon Camino Virtuel », version 1.0, validé conceptuellement**
  (nom et version arrêtés) — les fichiers graphiques (SVG, PNG, favicon)
  restent à produire.
- **Identité visuelle** : palette sable/papier, vert olive, terre cuite,
  ocre, bleu minéral ; typographie EB Garamond (titres) + Inter (texte
  courant) ; motif de la coquille Saint-Jacques comme fil visuel du
  crédential.

## Ce qui reste expérimental ou non tranché

- **ADR-001 à ADR-003** : décisions déjà prises en conception (hors de cette
  session), mais jamais rédigées dans le dépôt. Ne pas en inventer le
  contenu — voir `docs/adr/README.md`.
- **Le statut `revealed` d'un Stamp** existe dans le type mais n'a jamais été
  produit : son usage fonctionnel n'est pas cadré (voir ADR-004).
- **Le nombre final de tampons** n'est pas figé — sélection éditoriale à
  faire, pas un calcul.
- **Les règles des tampons communautaires** : durée de disponibilité,
  rattrapage, compte visiteur obligatoire ou non — aucune n'est validée
  (Bible, §9.4 et §16).
- **Le jumeau numérique évolutif** : protocole photo, fond gris ou bleu,
  technologie finale — non arrêtés (Bible, §12).
- **Le nom final de la rubrique « transformation »** dans le menu (pistes :
  Transformation, Évolution, Voyage intérieur, Métamorphose — aucune
  validée).
- **Le découpage de la Bible en plusieurs chapitres** (`00-philosophie.md`,
  `01-vision.md`, etc.) a été explicitement mis en attente par Julien : le
  document actuel (`docs/bible/chapitre-1-vision.md`) reste un bloc unique
  tant que la structure globale de la Bible n'est pas plus claire.
- **Le Knowledge Graph** : orientation fonctionnelle actée, technologie non
  arrêtée (PostgreSQL/PostGIS évoqué comme piste, pas comme décision).

## État actuel du site et de la documentation

Le site (`index.html` + `assets/`) est fonctionnel, statique, sans backend :
86 lieux réels, distance de 2 796,42 km, un seul tampon visible (Rome, motif
provisoire original). Toutes les valeurs affichées sont des données de
démonstration (`mode: "demo"` dans `assets/data/camino-state.js`) — aucune
donnée réelle de Julien n'a encore été branchée.

Un audit technique complet a été mené le 1er août 2026 (dans l'historique de
cette session, pas encore transcrit en document du dépôt). Points notables à
ne pas perdre avant de reprendre :

- **Le dépôt est public**, et `docs/bible/chapitre-1-vision.md` y mentionne
  déjà un objectif de poids personnel de Julien. Ce point avait été signalé
  dès le début du projet (« un suivi public, des données privées ») et
  n'a, à la connaissance de cette session, jamais été tranché.
- **Aucun script de génération n'est versionné dans le dépôt** : ni le
  pipeline géométrique (GPX → GeoJSON → projection → `camino-data.js`), ni
  le script qui assemble `camino-virtuel-autonome.html`. Les résultats sont
  dans le dépôt, pas les outils qui les produisent.
- **Aucun test automatisé, aucune CI.** La rigueur appliquée pendant la
  construction (86 lieux vérifiés, ordre monotone, unicité des tampons) n'a
  jamais été capturée comme suite de tests.
- `.claude/settings.local.json` est committé par erreur (permissions Bash
  propres à une session passée, sans valeur pour une reprise future).

## Pull requests

| PR | Titre | État |
| --- | --- | --- |
| [#1](https://github.com/corvijulien-netizen/project-phoenix-lab-claude/pull/1) | Add Camino Virtuel web application with interactive route mapping | **Fusionnée** dans `main` |
| [#2](https://github.com/corvijulien-netizen/project-phoenix-lab-claude/pull/2) | Documentation & Gouvernance : charte, structure docs/, ADR-004 | **Fusionnée** dans `main` |
| [#3](https://github.com/corvijulien-netizen/project-phoenix-lab-claude/pull/3) | Documentation : structure Design System / Lab | **Ouverte, non fusionnée** — contient ce document de pause |

## Architecture documentaire existante

```
docs/
├── CHARTER.md                                 gouvernance, rôles, règles de fusion
├── README.md                                  index de toute la documentation
├── bible/
│   └── chapitre-1-vision.md                   vision produit, non découpée
├── adr/
│   ├── README.md                               convention ADR, index
│   └── ADR-004-place-stamp-separation.md      seul ADR rédigé à ce jour
├── architecture/README.md                      vide, réservé à l'état technique du système
├── roadmap/README.md                           vide, réservé au prévu-non-construit
├── decisions/
│   ├── README.md
│   └── 2026-08-01-pause-camino-virtuel.md     ce document
├── design-system/
│   ├── README.md                               source unique de vérité, workflow, gabarit
│   ├── assets/logo/README.md                   logo validé conceptuellement, v1.0
│   └── assets/{icons,colors,typography,textures,sounds,photos}/, ui/, animations/  (vides)
└── lab/
    ├── README.md
    └── concepts/, explorations/, archives/     (vides)
```

## Décisions concernant la route, la distance réelle, les lieux et les tampons

- Tracé source : `data/gpx/master-route.gpx` (131 042 points), assemblé à
  partir de 7 relations OSM. Traçabilité complète et écarts de jonction dans
  `data/gpx/sources.md`.
- Pipeline : `data/route/master-route.geojson`, `route-version.json`,
  `projection-report.json` — chaque lieu est projeté perpendiculairement sur
  la géométrie réelle, jamais à vol d'oiseau.
- 86 lieux retenus dans `assets/data/camino-data.js` (`places`). Neuf lieux
  ont été retirés après vérification (Aulla, et huit villes du corridor
  Béziers-Narbonne-Carcassonne-Orthez, appartenant à une autre variante du
  GR653) ; six ajoutés après vérification (Lodève, Castres, Revel,
  Villefranche-de-Lauragais, Pau, Oloron-Sainte-Marie).
- Les tampons (`STAMPS`) référencent un lieu par `placeId`, jamais par
  duplication de coordonnées. `getStamps(km)` ne renvoie que les tampons
  atteints — un tampon futur n'est jamais exposé aux composants de
  l'interface, bien qu'il reste présent dans la source de données
  (voir ADR-004 pour la nuance exacte).
- L'extension bonus Santiago → Fisterra/Muxía (`data/gpx/bonus-fisterra-
  muxia.gpx`, 119,79 km) existe mais n'a jamais été activée ni intégrée au
  récit principal.

## Concept du crédential

Un carnet de pèlerin en accordéon (« leporello »), pas une grille technique :
volet de couverture (identité du carnet), volets de tampons obtenus (six par
volet), volet de clôture (Compostela, scellée jusqu'à l'arrivée réelle à
Santiago — indépendamment du nombre de tampons). Chaque tampon porte une
`category` (`official`, `historical`, `authorized-reproduction`, `inspired`,
`camino-virtual`), une description, et des `sourceIds` le cas échéant.

Le tampon de Rome, seul existant à ce jour, est `category: "inspired"` :
motif original combinant la coquille jacquaire (utilisée dans tout le site)
et des clés croisées schématiques évoquant Saint-Pierre — aucun tampon
existant n'a été copié.

## Identité graphique et logo étudiés

- Palette : sable/papier, vert olive, terre cuite, ocre, bleu minéral.
- Typographie : EB Garamond (titres, registre éditorial) + Inter (texte
  courant, chiffres).
- Motif récurrent : la coquille Saint-Jacques, générée géométriquement (pas
  une image importée) pour rester nette à toutes les tailles.
- Logo officiel « Tampon Camino Virtuel », v1.0, validé conceptuellement
  (`docs/design-system/assets/logo/README.md`) — fichiers graphiques (SVG,
  PNG, favicon) pas encore produits.

## Menu à six rubriques et iconographie étudiée

**Ce point n'a pas de trace dans cette session.** Aucun menu à six rubriques
ni iconographie associée n'a été discuté ou produit dans le cadre du travail
mené ici avec Claude Code. Si cette réflexion existe, elle a été menée dans
la conversation de conception parallèle (avec ChatGPT ou avec Claude en tant
que coordinateur technique) et n'a pas encore été transcrite dans ce dépôt.

À défaut de cette matière, ce document ne peut pas la restituer sans
l'inventer — ce qui contredirait la règle du projet de ne jamais combler un
vide par une supposition plausible. **À récupérer et à documenter (dans
`docs/roadmap/` ou `docs/decisions/`) avant toute reprise du chantier menu.**

La seule trace connexe dans la Bible (§16, « Architecture du menu ») liste
neuf pistes non tranchées — chemin, voyage intérieur, nutrition, sommeil,
transformation, héritage, journal, crédentiale, communauté — explicitement
comme non décidées, pas comme un menu à six rubriques arrêté.

## Concepts communautaires et futurs

Décrits dans la Bible, aucun n'est construit :

- Compagnons de route (la communauté qui suit Julien, distincte de la
  colonne « Mon quotidien » qui affiche les données personnelles).
- Tampons communautaires / preuves de présence, règles de disponibilité et
  de rattrapage non définies.
- Moments secrets et événements le long du chemin (distincts des tampons,
  densité indicative de 1 à 6 selon la distance de la marche).
- Jumeau numérique évolutif (protocole photo quotidien, curseur temps/km/
  transformation).
- Knowledge Graph ou base documentaire équivalente, pilotant à terme lieux,
  tampons, événements et médias.

## Chantiers non commencés

- Rédaction d'ADR-001 à ADR-003.
- Découpage de la Bible en chapitres (mis en attente, pas annulé).
- Chapitre 2 de la Bible (« Expérience quotidienne »), annoncé mais jamais
  écrit.
- Menu à six rubriques et iconographie (voir plus haut — contenu introuvable
  dans cette session).
- Comptes visiteurs, tampons communautaires, moments secrets.
- Jumeau numérique évolutif.
- Knowledge Graph complet.
- Correctifs de dette technique identifiés par l'audit du 1er août 2026 :
  scripts de pipeline et de build à committer, tests automatisés, CI,
  décision sur la visibilité du dépôt.
- Activation éventuelle de l'extension Fisterra-Muxía.

## Point de reprise recommandé

1. Statuer sur la visibilité du dépôt avant d'y ajouter la moindre donnée
   personnelle réelle (poids, photos) — le plus urgent des points en
   suspens.
2. Relire et fusionner la PR #3 (ou la clore si son contenu est devenu
   obsolète d'ici la reprise).
3. Committer les scripts de pipeline géométrique et de build du fichier
   autonome, aujourd'hui absents du dépôt.
4. Récupérer le contenu du menu à six rubriques et de l'iconographie
   étudiée, s'il existe, auprès de la conversation de conception parallèle.
5. Reprendre la rédaction des ADR-001 à 003 une fois leur contenu fourni.
6. Relire ce document dans son intégralité avant de coder quoi que ce soit :
   il est plus rapide à lire que l'historique complet des conversations.

## Règle claire pour Project Phoenix

**Ne pas transférer automatiquement la direction artistique de Camino
Virtuel vers Project Phoenix.** La palette, la typographie, le motif de la
coquille et le ton éditorial ont été pensés spécifiquement pour l'univers du
pèlerinage de Compostelle. Project Phoenix mérite sa propre identité
visuelle, déterminée pour son propre objet — la transformation physique de
Julien — pas héritée par défaut d'un projet mis en pause.
