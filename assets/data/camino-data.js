/* ============================================================================
   Camino Virtuel — données du chemin
   ----------------------------------------------------------------------------
   Ce fichier ne contient QUE le tracé, les lieux et le récit. Aucune donnée
   personnelle, aucune donnée Santé. Les valeurs mesurées vivent dans
   camino-state.js.

   Règle de conception : le HTML n'écrit aucun chiffre en dur. Tout ce qui
   s'affiche est calculé à partir d'ici et de l'état. Un chiffre absent reste
   absent — il ne doit jamais être remplacé par une valeur plausible.

   ┌────────────────────────────────────────────────────────────────────────┐
   │  Place et Stamp sont deux entités distinctes (Bible, ch. 1)             │
   │                                                                        │
   │  Un `place` est un point du tracé : coordonnées, kilomètre réel,       │
   │  densité d'affichage sur la carte. Un `stamp` est un lieu choisi pour   │
   │  son poids culturel ou symbolique, qui RÉFÉRENCE un lieu par son id     │
   │  (`placeId`) plutôt que de dupliquer ses coordonnées. Tous les lieux    │
   │  ne sont pas des tampons ; le choix des tampons est une sélection       │
   │  narrative, jamais un calcul kilométrique.                              │
   └────────────────────────────────────────────────────────────────────────┘
   ========================================================================== */

window.CAMINO_DATA = (() => {
  "use strict";

  /* --------------------------------------------------------------------------
     Les lieux du tracé Rome → Santiago.

     Chaque lieu porte un `km` réel, projeté perpendiculairement sur la
     géométrie GPX authentique du pèlerinage (jamais à vol d'oiseau, jamais
     calé sur des distances de guide approximatives) :

       source      data/gpx/master-route.gpx — 7 relations OpenStreetMap
                   (licence ODbL, © OpenStreetMap contributors), traçabilité
                   complète dans data/gpx/sources.md
       pipeline    data/route/master-route.geojson, route-version.json,
                   projection-report.json
       distance réelle du tracé, et distance de référence du projet :
       2 796,42 km — ce n'est plus un cap symbolique arrondi.

     Quatre villes ont été retirées après vérification par projection : elles
     appartiennent à une variante du chemin différente de celle que suit ce
     tracé (Aulla, à 10,8 km du tracé réel) ou à un tout autre corridor
     (Béziers, Narbonne, Carcassonne, Castelnaudary, Aire-sur-l'Adour,
     Arzacq-Arraziguet, Orthez, Navarrenx — jusqu'à 52 km d'écart : ces huit
     villes sont sur une branche du GR653 qui ne correspond pas au corridor
     réellement suivi ici, Arles → Castres → Toulouse → Auch → Pau → Oloron).
     Six villes ont été ajoutées après la même vérification (Lodève, Castres,
     Revel, Villefranche-de-Lauragais, Pau, Oloron-Sainte-Marie), chacune à
     moins de 500 m du tracé réel.
     -------------------------------------------------------------------------- */
  const places = [
    { id: "rome",                      name: "Rome",                        coords: [41.9028,  12.4964], country: "IT", rank: 1, km:     0.27 },
    { id: "monte-mario",               name: "Monte Mario",                 coords: [41.9192,  12.4504], country: "IT", rank: 3, km:     4.33 },
    { id: "la-giustiniana",            name: "La Giustiniana",              coords: [41.9652,  12.4073], country: "IT", rank: 3, km:    14.35 },
    { id: "la-storta",                 name: "La Storta",                   coords: [42.0018,  12.3789], country: "IT", rank: 3, km:    19.74 },
    { id: "isola-farnese",             name: "Isola Farnese",               coords: [42.0215,  12.3763], country: "IT", rank: 3, km:    21.32 },
    { id: "formello",                  name: "Formello",                    coords: [42.0783,  12.4000], country: "IT", rank: 3, km:    33.32 },
    { id: "campagnano-di-roma",        name: "Campagnano di Roma",          coords: [42.1354,  12.3749], country: "IT", rank: 3, km:    41.75 },
    { id: "nepi",                      name: "Nepi",                        coords: [42.2422,  12.3467], country: "IT", rank: 3, km:    51.40 },
    { id: "sutri",                     name: "Sutri",                       coords: [42.2470,  12.2168], country: "IT", rank: 3, km:    67.69 },
    { id: "capranica",                 name: "Capranica",                   coords: [42.2556,  12.1739], country: "IT", rank: 3, km:    73.95 },
    { id: "vetralla",                  name: "Vetralla",                    coords: [42.3198,  12.0543], country: "IT", rank: 3, km:    90.02 },
    { id: "viterbe",                   name: "Viterbe",                     coords: [42.4207,  12.1077], country: "IT", rank: 2, km:   112.47 },
    { id: "montefiascone",             name: "Montefiascone",               coords: [42.5393,  12.0316], country: "IT", rank: 3, km:   130.11 },
    { id: "bolsena",                   name: "Bolsena",                     coords: [42.6440,  11.9858], country: "IT", rank: 3, km:   146.64 },
    { id: "acquapendente",             name: "Acquapendente",               coords: [42.7424,  11.8687], country: "IT", rank: 3, km:   169.47 },
    { id: "radicofani",                name: "Radicofani",                  coords: [42.8954,  11.7675], country: "IT", rank: 3, km:   193.17 },
    { id: "san-quirico-d-orcia",       name: "San Quirico d’Orcia",         coords: [43.0578,  11.6040], country: "IT", rank: 3, km:   226.33 },
    { id: "buonconvento",              name: "Buonconvento",                coords: [43.1372,  11.4817], country: "IT", rank: 3, km:   248.63 },
    { id: "sienne",                    name: "Sienne",                      coords: [43.3188,  11.3308], country: "IT", rank: 1, km:   279.57 },
    { id: "monteriggioni",             name: "Monteriggioni",               coords: [43.3897,  11.2233], country: "IT", rank: 3, km:   300.07 },
    { id: "san-gimignano",             name: "San Gimignano",               coords: [43.4676,  11.0430], country: "IT", rank: 3, km:   330.86 },
    { id: "altopascio",                name: "Altopascio",                  coords: [43.8139,  10.6772], country: "IT", rank: 3, km:   397.04 },
    { id: "lucques",                   name: "Lucques",                     coords: [43.8429,  10.5027], country: "IT", rank: 2, km:   415.70 },
    { id: "sarzana",                   name: "Sarzana",                     coords: [44.1122,   9.9636], country: "IT", rank: 3, km:   495.11 },
    { id: "la-spezia",                 name: "La Spezia",                   coords: [44.1024,   9.8241], country: "IT", rank: 3, km:   510.10 },
    { id: "rapallo",                   name: "Rapallo",                     coords: [44.3497,   9.2297], country: "IT", rank: 3, km:   592.81 },
    { id: "genes",                     name: "Gênes",                       coords: [44.4056,   8.9463], country: "IT", rank: 2, km:   625.76 },
    { id: "savone",                    name: "Savone",                      coords: [44.3091,   8.4772], country: "IT", rank: 3, km:   674.80 },
    { id: "finale-ligure",             name: "Finale Ligure",               coords: [44.1697,   8.3436], country: "IT", rank: 3, km:   707.91 },
    { id: "albenga",                   name: "Albenga",                     coords: [44.0490,   8.2127], country: "IT", rank: 3, km:   732.29 },
    { id: "imperia",                   name: "Imperia",                     coords: [43.8878,   8.0289], country: "IT", rank: 3, km:   767.90 },
    { id: "san-remo",                  name: "San Remo",                    coords: [43.8159,   7.7761], country: "IT", rank: 3, km:   811.56 },
    { id: "vintimille",                name: "Vintimille",                  coords: [43.7912,   7.6083], country: "IT", rank: 3, km:   828.30 },
    { id: "menton",                    name: "Menton",                      coords: [43.7750,   7.4975], country: "FR", rank: 3, km:   840.44 },
    { id: "monaco",                    name: "Monaco",                      coords: [43.7384,   7.4246], country: "FR", rank: 3, km:   852.45 },
    { id: "nice",                      name: "Nice",                        coords: [43.7102,   7.2620], country: "FR", rank: 2, km:   876.26 },
    { id: "antibes",                   name: "Antibes",                     coords: [43.5808,   7.1251], country: "FR", rank: 3, km:   914.20 },
    { id: "cannes",                    name: "Cannes",                      coords: [43.5528,   7.0174], country: "FR", rank: 3, km:   935.39 },
    { id: "frejus",                    name: "Fréjus",                      coords: [43.4332,   6.7370], country: "FR", rank: 3, km:   979.64 },
    { id: "brignoles",                 name: "Brignoles",                   coords: [43.4058,   6.0616], country: "FR", rank: 3, km:  1064.07 },
    { id: "saint-maximin",             name: "Saint-Maximin",               coords: [43.4525,   5.8619], country: "FR", rank: 3, km:  1091.42 },
    { id: "aix-en-provence",           name: "Aix-en-Provence",             coords: [43.5297,   5.4474], country: "FR", rank: 2, km:  1137.48 },
    { id: "salon-de-provence",         name: "Salon-de-Provence",           coords: [43.6406,   5.0975], country: "FR", rank: 3, km:  1177.99 },
    { id: "arles",                     name: "Arles",                       coords: [43.6766,   4.6278], country: "FR", rank: 1, km:  1230.10 },
    { id: "saint-gilles",              name: "Saint-Gilles",                coords: [43.6766,   4.4307], country: "FR", rank: 3, km:  1252.60 },
    { id: "lunel",                     name: "Lunel",                       coords: [43.6772,   4.1361], country: "FR", rank: 3, km:  1284.77 },
    { id: "montpellier",               name: "Montpellier",                 coords: [43.6108,   3.8767], country: "FR", rank: 2, km:  1324.64 },
    { id: "lodeve",                    name: "Lodève",                      coords: [43.7314,   3.3183], country: "FR", rank: 3, km:  1404.84 },
    { id: "castres",                   name: "Castres",                     coords: [43.6058,   2.2411], country: "FR", rank: 2, km:  1560.22 },
    { id: "revel",                     name: "Revel",                       coords: [43.4553,   2.0028], country: "FR", rank: 3, km:  1599.35 },
    { id: "villefranche-de-lauragais", name: "Villefranche-de-Lauragais",   coords: [43.4014,   1.7194], country: "FR", rank: 3, km:  1650.03 },
    { id: "toulouse",                  name: "Toulouse",                    coords: [43.6047,   1.4442], country: "FR", rank: 1, km:  1690.78 },
    { id: "gimont",                    name: "Gimont",                      coords: [43.6272,   0.8756], country: "FR", rank: 3, km:  1754.09 },
    { id: "auch",                      name: "Auch",                        coords: [43.6454,   0.5867], country: "FR", rank: 3, km:  1787.00 },
    { id: "maubourguet",               name: "Maubourguet",                 coords: [43.4690,   0.0350], country: "FR", rank: 3, km:  1859.74 },
    { id: "pau",                       name: "Pau",                         coords: [43.2951,  -0.3708], country: "FR", rank: 2, km:  1911.52 },
    { id: "oloron-sainte-marie",       name: "Oloron-Sainte-Marie",         coords: [43.1929,  -0.6087], country: "FR", rank: 3, km:  1949.47 },
    { id: "saint-jean-pied-de-port",   name: "Saint-Jean-Pied-de-Port",     coords: [43.1632,  -1.2379], country: "FR", rank: 1, km:  2028.75 },
    { id: "roncevaux",                 name: "Roncevaux",                   coords: [43.0090,  -1.3190], country: "ES", rank: 2, km:  2052.83 },
    { id: "pampelune",                 name: "Pampelune",                   coords: [42.8125,  -1.6458], country: "ES", rank: 2, km:  2095.52 },
    { id: "puente-la-reina",           name: "Puente la Reina",             coords: [42.6722,  -1.8144], country: "ES", rank: 3, km:  2118.93 },
    { id: "estella",                   name: "Estella",                     coords: [42.6710,  -2.0320], country: "ES", rank: 3, km:  2140.70 },
    { id: "los-arcos",                 name: "Los Arcos",                   coords: [42.5686,  -2.1925], country: "ES", rank: 3, km:  2161.98 },
    { id: "logrono",                   name: "Logroño",                     coords: [42.4627,  -2.4449], country: "ES", rank: 2, km:  2189.85 },
    { id: "najera",                    name: "Nájera",                      coords: [42.4180,  -2.7280], country: "ES", rank: 3, km:  2217.91 },
    { id: "santo-domingo",             name: "Santo Domingo",               coords: [42.4410,  -2.9530], country: "ES", rank: 3, km:  2239.52 },
    { id: "belorado",                  name: "Belorado",                    coords: [42.4200,  -3.1919], country: "ES", rank: 3, km:  2262.17 },
    { id: "burgos",                    name: "Burgos",                      coords: [42.3439,  -3.6969], country: "ES", rank: 1, km:  2311.08 },
    { id: "fromista",                  name: "Frómista",                    coords: [42.2670,  -4.4060], country: "ES", rank: 3, km:  2376.97 },
    { id: "carrion-de-los-condes",     name: "Carrión de los Condes",       coords: [42.3372,  -4.6031], country: "ES", rank: 3, km:  2395.81 },
    { id: "sahagun",                   name: "Sahagún",                     coords: [42.3720,  -5.0300], country: "ES", rank: 3, km:  2435.73 },
    { id: "mansilla-de-las-mulas",     name: "Mansilla de las Mulas",       coords: [42.4989,  -5.4172], country: "ES", rank: 3, km:  2472.18 },
    { id: "leon",                      name: "León",                        coords: [42.5987,  -5.5671], country: "ES", rank: 1, km:  2490.87 },
    { id: "hospital-de-orbigo",        name: "Hospital de Órbigo",          coords: [42.4636,  -5.8811], country: "ES", rank: 3, km:  2523.10 },
    { id: "astorga",                   name: "Astorga",                     coords: [42.4550,  -6.0520], country: "ES", rank: 3, km:  2538.82 },
    { id: "ponferrada",                name: "Ponferrada",                  coords: [42.5460,  -6.5960], country: "ES", rank: 3, km:  2592.29 },
    { id: "villafranca-del-bierzo",    name: "Villafranca del Bierzo",      coords: [42.6064,  -6.8092], country: "ES", rank: 3, km:  2615.05 },
    { id: "o-cebreiro",                name: "O Cebreiro",                  coords: [42.7080,  -7.0430], country: "ES", rank: 2, km:  2642.91 },
    { id: "triacastela",               name: "Triacastela",                 coords: [42.7561,  -7.2378], country: "ES", rank: 3, km:  2663.72 },
    { id: "sarria",                    name: "Sarria",                      coords: [42.7790,  -7.4140], country: "ES", rank: 3, km:  2681.66 },
    { id: "portomarin",                name: "Portomarín",                  coords: [42.8060,  -7.6160], country: "ES", rank: 3, km:  2703.80 },
    { id: "palas-de-rei",              name: "Palas de Rei",                coords: [42.8740,  -7.8680], country: "ES", rank: 3, km:  2728.76 },
    { id: "melide",                    name: "Melide",                      coords: [42.9140,  -8.0140], country: "ES", rank: 3, km:  2743.33 },
    { id: "arzua",                     name: "Arzúa",                       coords: [42.9280,  -8.1640], country: "ES", rank: 3, km:  2757.75 },
    { id: "o-pedrouzo",                name: "O Pedrouzo",                  coords: [42.9058,  -8.3644], country: "ES", rank: 3, km:  2777.03 },
    { id: "santiago",                  name: "Santiago",                    coords: [42.8782,  -8.5448], country: "ES", rank: 1, km:  2796.42 }
  ];

  const placeById = (id) => places.find((p) => p.id === id) || null;
  const placeByName = (name) => places.find((p) => p.name === name) || null;

  // Distance de référence du projet : la distance RÉELLE du tracé (Bible,
  // règle fondatrice n°5). Ce n'est plus un cap symbolique arrondi — chaque
  // `km` ci-dessus est directement la position réelle sur la géométrie GPX.
  const TOTAL_KM = 2796.42;

  /* ---- interpolation ------------------------------------------------------ */

  /**
   * Position géographique après `km` kilomètres réellement marchés.
   * Renvoie aussi le contexte narratif : d'où l'on vient, où l'on va.
   */
  function locate(km) {
    const clamped = Math.max(0, Math.min(TOTAL_KM, km));

    if (clamped <= 0) {
      return { coords: places[0].coords.slice(), from: places[0], to: places[1], ratioInLeg: 0 };
    }

    for (let i = 1; i < places.length; i += 1) {
      if (places[i].km >= clamped) {
        const a = places[i - 1], b = places[i];
        const span = b.km - a.km;
        const r = span === 0 ? 0 : (clamped - a.km) / span;
        return {
          coords: [
            a.coords[0] + (b.coords[0] - a.coords[0]) * r,
            a.coords[1] + (b.coords[1] - a.coords[1]) * r
          ],
          from: a, to: b, ratioInLeg: r
        };
      }
    }

    const last = places[places.length - 1];
    return { coords: last.coords.slice(), from: last, to: last, ratioInLeg: 1 };
  }

  /* --------------------------------------------------------------------------
     Les tampons.

     Un tampon RÉFÉRENCE un lieu (`placeId`) ; il ne recopie pas ses
     coordonnées. Son statut n'est jamais stocké : il est recalculé à chaque
     affichage à partir de la progression réelle de Julien, pour qu'un tampon
     non atteint ne puisse jamais fuiter dans l'interface.

       hidden    lieu non atteint — jamais rendu, aucun nom ni km affiché.
       unlocked  lieu atteint — le tampon existe dans le carnet.
       revealed  réservé pour un usage futur (par exemple : un lieu annoncé
                 juste avant d'être atteint, sans être encore tamponné). Ce
                 mécanisme n'est pas cadré : le statut n'est jamais produit
                 aujourd'hui, seulement prévu dans le type.

     Le nombre final de tampons n'est pas figé (Bible, règle n°10) : cette
     liste n'en contient qu'un seul pour l'instant, Rome, et grandit au fil
     d'une sélection culturelle et narrative — jamais d'un calcul kilométrique.
     Remplacer STAMPS par un appel au futur Knowledge Graph ne demandera pas
     de changer le reste du site : locate(), placeById() et getStamps() sont
     la seule interface dont le reste du code a besoin.
     -------------------------------------------------------------------------- */
  const STAMPS = [
    {
      id: "stamp-rome",
      name: "Rome",
      placeId: "rome",
      routeDistanceKm: 0,
      category: "inspired",
      isDeparture: true,
      ink: "romano",
      shape: "ecusson",
      description:
        "Départ symbolique du pèlerinage, à Saint-Pierre de Rome. Tampon " +
        "provisoire — inspiré des codes graphiques jacquaires (la coquille) " +
        "et de l'identité de Rome (les clés), sans reproduire un tampon " +
        "existant — en attente d'une source officielle ou d'un motif " +
        "documenté du patrimoine romain.",
      sourceIds: []
    }
    // Les prochains tampons s'ajoutent ici au rythme d'une sélection des
    // lieux les plus significatifs du chemin — jamais tous les 50 km.
  ];

  /**
   * Les tampons à afficher pour une progression donnée. Un lieu non atteint
   * n'apparaît jamais dans le tableau renvoyé : il n'existe simplement pas
   * pour l'appelant, ce qui rend un affichage prématuré structurellement
   * impossible plutôt que masqué par du CSS.
   */
  function getStamps(km) {
    return STAMPS
      .filter((s) => s.routeDistanceKm <= km)
      .map((s) => ({ ...s, status: "unlocked", place: placeById(s.placeId) }))
      .sort((a, b) => a.routeDistanceKm - b.routeDistanceKm);
  }

  /* ---- récits d'étape ------------------------------------------------------
     Rédigés à la main, uniquement pour les lieux documentés. Une étape sans
     texte n'en invente pas : l'interface affiche alors un état « en attente »
     assumé plutôt qu'un remplissage automatique.
     -------------------------------------------------------------------------- */
  const stories = {
    "La Storta": {
      region: "Latium · Italie",
      image: "assets/img/stage-la-storta.webp",
      caption: "Aux portes de Rome · Via Francigena",
      lead: "Les premiers kilomètres quittent la ville par la via Cassia. " +
            "Rome se retire lentement derrière les pins.",
      body: "La Storta est la première halte des pèlerins qui montent vers le nord. " +
            "Le bitume cède la place aux chemins de terre, et le paysage du Latium " +
            "s’ouvre sur des collines, des cyprès et des fermes de tuf.",
      quote: "Le vrai voyage commence au premier pas que l’on décide de compter."
    },

    "Sienne": {
      region: "Toscane · Italie",
      lead: "Le chemin traverse les crêtes des Crete Senesi avant de découvrir " +
            "la ville depuis les collines.",
      body: "Au Xᵉ siècle, l’archevêque Sigeric de Canterbury notait ses étapes " +
            "sur le retour de Rome. Son carnet de route est devenu la référence " +
            "historique de la Via Francigena : soixante-dix-neuf jours de marche, " +
            "une vingtaine de kilomètres par jour."
    },

    "Lucques": {
      region: "Toscane · Italie",
      lead: "La Via Francigena continue vers le nord ; le chemin, lui, bifurque vers la mer.",
      body: "Au-delà de Lucques, la Via Francigena classique poursuit vers la Suisse. " +
            "Le tracé quitte donc cette voie pour suivre la côte ligure, par la Via " +
            "della Costa puis la Via Aurelia, jusqu’à la Provence."
    },

    "Arles": {
      region: "Provence · France",
      lead: "Départ de la Via Tolosana, le plus méridional des quatre chemins " +
            "français vers Compostelle.",
      body: "Via Podiensis, Via Lemovicensis, Via Turonensis, Via Tolosana : les " +
            "quatre grands itinéraires français ont été classés au patrimoine " +
            "mondial de l’UNESCO en 1998."
    },

    "Saint-Jean-Pied-de-Port": {
      region: "Pays basque · France",
      lead: "La porte de Compostelle : ici commence le Camino Francés.",
      body: "Sept cent quatre-vingts kilomètres jusqu’à Santiago, trente à " +
            "trente-cinq jours de marche, et le chemin le mieux balisé des quatre. " +
            "Demain, la montée vers le col de Roncevaux."
    },

    "O Cebreiro": {
      region: "Galice · Espagne",
      lead: "Le seuil de la Galice, à mille trois cents mètres, souvent dans la brume.",
      body: "C’est ici que Don Elías Valiña Sampedro, curé du village, a peint en " +
            "1984 les premières flèches jaunes du Camino. Elles sont aujourd’hui " +
            "indissociables de la coquille, et elles ont fait renaître le chemin."
    },

    "Sarria": {
      region: "Galice · Espagne",
      lead: "Début des cent derniers kilomètres.",
      body: "Sur cette dernière portion, les vrais pèlerins doivent faire tamponner " +
            "leur crédential deux fois par jour pour obtenir la Compostela. " +
            "Beaucoup partent d’ici : c’est la distance minimale reconnue."
    },

    "Santiago": {
      region: "Galice · Espagne",
      lead: "Le terme du chemin.",
      body: "La légende raconte que le corps de l’apôtre Jacques, perdu en mer, " +
            "s’échoua sur la côte galicienne recouvert de coquilles Saint-Jacques. " +
            "Les rainures de la coquille figurent les chemins venus de toute " +
            "l’Europe — tous convergeant vers un seul point.",
      quote: "Toutes les lignes de la coquille se rejoignent au même endroit."
    }
  };

  /* Les 7 tronçons réels qui composent le tracé (data/gpx/sources.md). Il
     n'existe pas de « chemin officiel Rome → Santiago » : c'est une
     composition de chemins de pèlerinage distincts, et le site le dit plutôt
     que de la présenter comme un chemin historique unique. Chaque tronçon
     correspond à une relation OpenStreetMap identifiée et sourcée. */
  const legs = [
    { name: "Via Francigena",  from: "Rome",  to: "Sarzana",
      note: "Section italienne du chemin de Canterbury à Rome, parcourue vers le nord. " +
            "Relation OSM 11860709." },
    { name: "Via della Costa",  from: "Sarzana", to: "Vintimille",
      note: "Le long de la côte ligure jusqu’à la frontière française. " +
            "Relation OSM 11685878, jonction exacte avec la Via Francigena." },
    { name: "Via Aurelia",  from: "Vintimille", to: "Arles",
      note: "La Riviera puis la Provence, jusqu’au départ de la Via Tolosana. " +
            "Relation OSM 8298137." },
    { name: "Voie d’Arles",    from: "Arles", to: "Oloron-Sainte-Marie",
      note: "Via Tolosana, le plus méridional des quatre chemins français classés " +
            "à l’UNESCO en 1998. Relation OSM 389715." },
    { name: "Piémont pyrénéen", from: "Oloron-Sainte-Marie", to: "Saint-Jean-Pied-de-Port",
      note: "Le seuil des Pyrénées avant la porte de Compostelle. Relation OSM 368453." },
    { name: "Voie du Puy",     from: "Saint-Jean-Pied-de-Port", to: "Roncevaux",
      note: "Portion finale de la Via Podiensis, jusqu’à la frontière espagnole. " +
            "Relation OSM 138227." },
    { name: "Camino Francés",  from: "Roncevaux", to: "Santiago",
      note: "Le chemin le plus emprunté et le mieux balisé des quatre. " +
            "Relation OSM 2163573, jonction exacte avec la Voie du Puy." }
  ];

  return {
    places, stories, legs,
    totalKm: TOTAL_KM,
    placeById, placeByName,
    locate, getStamps
  };
})();
