/* ============================================================================
   Camino Virtuel — données du chemin
   ----------------------------------------------------------------------------
   Ce fichier ne contient QUE le tracé et le récit. Aucune donnée personnelle,
   aucune donnée Santé. Les valeurs mesurées vivent dans camino-state.js.

   Règle de conception : le HTML n'écrit aucun chiffre en dur. Tout ce qui
   s'affiche est calculé à partir d'ici et de l'état. Un chiffre absent reste
   absent — il ne doit jamais être remplacé par une valeur plausible.
   ========================================================================== */

window.CAMINO_DATA = (() => {
  "use strict";

  /* --------------------------------------------------------------------------
     Le tracé Rome → Santiago.

     Chaque ville porte désormais un `km` réel, projeté perpendiculairement sur
     la géométrie GPX authentique du pèlerinage (jamais à vol d'oiseau) :

       source      data/gpx/master-route.gpx — 7 relations OpenStreetMap
                   (licence ODbL, © OpenStreetMap contributors), traçabilité
                   complète dans data/gpx/sources.md
       pipeline    data/route/master-route.geojson, route-version.json,
                   projection-report.json
       distance réelle du tracé : 2 796,42 km

     Ces `km` sont mis à l'échelle du cap symbolique de 3 000 km (facteur
     ×1,0728) — voir plus bas pourquoi ce cap est conservé tel quel. Les
     positions RELATIVES, elles, viennent intégralement de la géométrie
     réelle : ce n'est plus une approximation par guide de voyage.

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
  const route = [
    { name: "Rome",                        coords: [41.9028,  12.4964], country: "IT", rank: 1, km:     0.3 },
    { name: "Monte Mario",                 coords: [41.9192,  12.4504], country: "IT", rank: 3, km:     4.6 },
    { name: "La Giustiniana",              coords: [41.9652,  12.4073], country: "IT", rank: 3, km:    15.4 },
    { name: "La Storta",                   coords: [42.0018,  12.3789], country: "IT", rank: 3, km:    21.2 },
    { name: "Isola Farnese",               coords: [42.0215,  12.3763], country: "IT", rank: 3, km:    22.9 },
    { name: "Formello",                    coords: [42.0783,  12.4000], country: "IT", rank: 3, km:    35.8 },
    { name: "Campagnano di Roma",          coords: [42.1354,  12.3749], country: "IT", rank: 3, km:    44.8 },
    { name: "Nepi",                        coords: [42.2422,  12.3467], country: "IT", rank: 3, km:    55.1 },
    { name: "Sutri",                       coords: [42.2470,  12.2168], country: "IT", rank: 3, km:    72.6 },
    { name: "Capranica",                   coords: [42.2556,  12.1739], country: "IT", rank: 3, km:    79.3 },
    { name: "Vetralla",                    coords: [42.3198,  12.0543], country: "IT", rank: 3, km:    96.6 },
    { name: "Viterbe",                     coords: [42.4207,  12.1077], country: "IT", rank: 2, km:   120.7 },
    { name: "Montefiascone",               coords: [42.5393,  12.0316], country: "IT", rank: 3, km:   139.6 },
    { name: "Bolsena",                     coords: [42.6440,  11.9858], country: "IT", rank: 3, km:   157.3 },
    { name: "Acquapendente",               coords: [42.7424,  11.8687], country: "IT", rank: 3, km:   181.8 },
    { name: "Radicofani",                  coords: [42.8954,  11.7675], country: "IT", rank: 3, km:   207.2 },
    { name: "San Quirico d’Orcia",         coords: [43.0578,  11.6040], country: "IT", rank: 3, km:   242.8 },
    { name: "Buonconvento",                coords: [43.1372,  11.4817], country: "IT", rank: 3, km:   266.7 },
    { name: "Sienne",                      coords: [43.3188,  11.3308], country: "IT", rank: 1, km:   299.9 },
    { name: "Monteriggioni",               coords: [43.3897,  11.2233], country: "IT", rank: 3, km:   321.9 },
    { name: "San Gimignano",               coords: [43.4676,  11.0430], country: "IT", rank: 3, km:   354.9 },
    { name: "Altopascio",                  coords: [43.8139,  10.6772], country: "IT", rank: 3, km:   425.9 },
    { name: "Lucques",                     coords: [43.8429,  10.5027], country: "IT", rank: 2, km:   446.0 },
    { name: "Sarzana",                     coords: [44.1122,   9.9636], country: "IT", rank: 3, km:   531.2 },
    { name: "La Spezia",                   coords: [44.1024,   9.8241], country: "IT", rank: 3, km:   547.2 },
    { name: "Rapallo",                     coords: [44.3497,   9.2297], country: "IT", rank: 3, km:   636.0 },
    { name: "Gênes",                       coords: [44.4056,   8.9463], country: "IT", rank: 2, km:   671.3 },
    { name: "Savone",                      coords: [44.3091,   8.4772], country: "IT", rank: 3, km:   723.9 },
    { name: "Finale Ligure",               coords: [44.1697,   8.3436], country: "IT", rank: 3, km:   759.5 },
    { name: "Albenga",                     coords: [44.0490,   8.2127], country: "IT", rank: 3, km:   785.6 },
    { name: "Imperia",                     coords: [43.8878,   8.0289], country: "IT", rank: 3, km:   823.8 },
    { name: "San Remo",                    coords: [43.8159,   7.7761], country: "IT", rank: 3, km:   870.6 },
    { name: "Vintimille",                  coords: [43.7912,   7.6083], country: "IT", rank: 3, km:   888.6 },
    { name: "Menton",                      coords: [43.7750,   7.4975], country: "FR", rank: 3, km:   901.6 },
    { name: "Monaco",                      coords: [43.7384,   7.4246], country: "FR", rank: 3, km:   914.5 },
    { name: "Nice",                        coords: [43.7102,   7.2620], country: "FR", rank: 2, km:   940.1 },
    { name: "Antibes",                     coords: [43.5808,   7.1251], country: "FR", rank: 3, km:   980.8 },
    { name: "Cannes",                      coords: [43.5528,   7.0174], country: "FR", rank: 3, km:  1003.5 },
    { name: "Fréjus",                      coords: [43.4332,   6.7370], country: "FR", rank: 3, km:  1051.0 },
    { name: "Brignoles",                   coords: [43.4058,   6.0616], country: "FR", rank: 3, km:  1141.5 },
    { name: "Saint-Maximin",               coords: [43.4525,   5.8619], country: "FR", rank: 3, km:  1170.9 },
    { name: "Aix-en-Provence",             coords: [43.5297,   5.4474], country: "FR", rank: 2, km:  1220.3 },
    { name: "Salon-de-Provence",           coords: [43.6406,   5.0975], country: "FR", rank: 3, km:  1263.8 },
    { name: "Arles",                       coords: [43.6766,   4.6278], country: "FR", rank: 1, km:  1319.7 },
    { name: "Saint-Gilles",                coords: [43.6766,   4.4307], country: "FR", rank: 3, km:  1343.8 },
    { name: "Lunel",                       coords: [43.6772,   4.1361], country: "FR", rank: 3, km:  1378.3 },
    { name: "Montpellier",                 coords: [43.6108,   3.8767], country: "FR", rank: 2, km:  1421.1 },
    { name: "Lodève",                      coords: [43.7314,   3.3183], country: "FR", rank: 3, km:  1507.1 },
    { name: "Castres",                     coords: [43.6058,   2.2411], country: "FR", rank: 2, km:  1673.8 },
    { name: "Revel",                       coords: [43.4553,   2.0028], country: "FR", rank: 3, km:  1715.8 },
    { name: "Villefranche-de-Lauragais",   coords: [43.4014,   1.7194], country: "FR", rank: 3, km:  1770.2 },
    { name: "Toulouse",                    coords: [43.6047,   1.4442], country: "FR", rank: 1, km:  1813.9 },
    { name: "Gimont",                      coords: [43.6272,   0.8756], country: "FR", rank: 3, km:  1881.8 },
    { name: "Auch",                        coords: [43.6454,   0.5867], country: "FR", rank: 3, km:  1917.1 },
    { name: "Maubourguet",                 coords: [43.4690,   0.0350], country: "FR", rank: 3, km:  1995.1 },
    { name: "Pau",                         coords: [43.2951,  -0.3708], country: "FR", rank: 2, km:  2050.7 },
    { name: "Oloron-Sainte-Marie",         coords: [43.1929,  -0.6087], country: "FR", rank: 3, km:  2091.4 },
    { name: "Saint-Jean-Pied-de-Port",     coords: [43.1632,  -1.2379], country: "FR", rank: 1, km:  2176.4 },
    { name: "Roncevaux",                   coords: [43.0090,  -1.3190], country: "ES", rank: 2, km:  2202.3 },
    { name: "Pampelune",                   coords: [42.8125,  -1.6458], country: "ES", rank: 2, km:  2248.1 },
    { name: "Puente la Reina",             coords: [42.6722,  -1.8144], country: "ES", rank: 3, km:  2273.2 },
    { name: "Estella",                     coords: [42.6710,  -2.0320], country: "ES", rank: 3, km:  2296.5 },
    { name: "Los Arcos",                   coords: [42.5686,  -2.1925], country: "ES", rank: 3, km:  2319.4 },
    { name: "Logroño",                     coords: [42.4627,  -2.4449], country: "ES", rank: 2, km:  2349.3 },
    { name: "Nájera",                      coords: [42.4180,  -2.7280], country: "ES", rank: 3, km:  2379.4 },
    { name: "Santo Domingo",               coords: [42.4410,  -2.9530], country: "ES", rank: 3, km:  2402.6 },
    { name: "Belorado",                    coords: [42.4200,  -3.1919], country: "ES", rank: 3, km:  2426.9 },
    { name: "Burgos",                      coords: [42.3439,  -3.6969], country: "ES", rank: 1, km:  2479.3 },
    { name: "Frómista",                    coords: [42.2670,  -4.4060], country: "ES", rank: 3, km:  2550.0 },
    { name: "Carrión de los Condes",       coords: [42.3372,  -4.6031], country: "ES", rank: 3, km:  2570.2 },
    { name: "Sahagún",                     coords: [42.3720,  -5.0300], country: "ES", rank: 3, km:  2613.1 },
    { name: "Mansilla de las Mulas",       coords: [42.4989,  -5.4172], country: "ES", rank: 3, km:  2652.2 },
    { name: "León",                        coords: [42.5987,  -5.5671], country: "ES", rank: 1, km:  2672.2 },
    { name: "Hospital de Órbigo",          coords: [42.4636,  -5.8811], country: "ES", rank: 3, km:  2706.8 },
    { name: "Astorga",                     coords: [42.4550,  -6.0520], country: "ES", rank: 3, km:  2723.6 },
    { name: "Ponferrada",                  coords: [42.5460,  -6.5960], country: "ES", rank: 3, km:  2781.0 },
    { name: "Villafranca del Bierzo",      coords: [42.6064,  -6.8092], country: "ES", rank: 3, km:  2805.4 },
    { name: "O Cebreiro",                  coords: [42.7080,  -7.0430], country: "ES", rank: 2, km:  2835.3 },
    { name: "Triacastela",                 coords: [42.7561,  -7.2378], country: "ES", rank: 3, km:  2857.6 },
    { name: "Sarria",                      coords: [42.7790,  -7.4140], country: "ES", rank: 3, km:  2876.9 },
    { name: "Portomarín",                  coords: [42.8060,  -7.6160], country: "ES", rank: 3, km:  2900.6 },
    { name: "Palas de Rei",                coords: [42.8740,  -7.8680], country: "ES", rank: 3, km:  2927.4 },
    { name: "Melide",                      coords: [42.9140,  -8.0140], country: "ES", rank: 3, km:  2943.0 },
    { name: "Arzúa",                       coords: [42.9280,  -8.1640], country: "ES", rank: 3, km:  2958.5 },
    { name: "O Pedrouzo",                  coords: [42.9058,  -8.3644], country: "ES", rank: 3, km:  2979.2 },
    { name: "Santiago",                    coords: [42.8782,  -8.5448], country: "ES", rank: 1, km:  3000.0 }
  ];

  const TOTAL_KM      = 3000;  // cap symbolique conservé — voir commentaire ci-dessus
  const STAMP_EVERY   = 50;    // un tampon tous les 50 km réels
  const STAMP_COUNT   = TOTAL_KM / STAMP_EVERY;  // 60

  /* ---- interpolation ------------------------------------------------------ */

  /**
   * Position géographique après `km` kilomètres réellement marchés.
   * Renvoie aussi le contexte narratif : d'où l'on vient, où l'on va.
   */
  function locate(km) {
    const clamped = Math.max(0, Math.min(TOTAL_KM, km));

    if (clamped <= 0) {
      return { coords: route[0].coords.slice(), from: route[0], to: route[1], ratioInLeg: 0 };
    }

    // Chaque ville porte désormais sa distance de marche calée : on interpole
    // directement entre deux villes, sans repasser par le vol d'oiseau.
    for (let i = 1; i < route.length; i += 1) {
      if (route[i].km >= clamped) {
        const a = route[i - 1], b = route[i];
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

    const last = route[route.length - 1];
    return { coords: last.coords.slice(), from: last, to: last, ratioInLeg: 1 };
  }

  /** Ville-étape la plus proche d'une distance donnée (pour nommer un tampon). */
  function placeAt(km) {
    let best = route[0];
    let bestGap = Infinity;
    for (const stop of route) {
      const gap = Math.abs(stop.km - km);
      if (gap < bestGap) { bestGap = gap; best = stop; }
    }
    return best;
  }

  /* ---- le crédential ------------------------------------------------------ */

  /**
   * Les 60 tampons. Chaque tampon est attaché à une ville réelle et reçoit une
   * forme, une encre et une rotation dérivées de son rang — de sorte que deux
   * tampons voisins ne se ressemblent jamais, sans pour autant être aléatoires
   * (le rendu est stable d'un chargement à l'autre).
   */
  const INKS   = ["indigo", "rouge", "vert", "violet", "sepia", "ocre"];
  const SHAPES = ["cercle", "ovale", "ecusson", "tonneau", "carre"];

  function buildStamps() {
    const stamps = [];
    const taken = new Set();

    // Rome est le point de départ, pas une étape à tamponner.
    // Santiago est réservé au 60ᵉ tampon : le dernier cachet du carnet doit
    // être celui de l'arrivée, à 3 000 km — jamais un autre.
    const arrival = route[route.length - 1];
    const pool = route.slice(1, route.length - 1);

    for (let i = 1; i <= STAMP_COUNT; i += 1) {
      const km = i * STAMP_EVERY;

      let place;
      if (i === STAMP_COUNT) {
        place = arrival;
      } else {
        // Ville la plus proche encore disponible : deux tampons ne portent
        // jamais le même lieu, ce qui évite l'effet de motif répété.
        let best = null, bestGap = Infinity;
        for (const stop of pool) {
          if (taken.has(stop.name)) continue;
          const gap = Math.abs(stop.km - km);
          if (gap < bestGap) { bestGap = gap; best = stop; }
        }
        place = best || arrival;
      }
      taken.add(place.name);

      // Décalages premiers entre eux : le rendu varie sans être aléatoire,
      // et reste identique d'un chargement à l'autre.
      stamps.push({
        index: i, km,
        place: place.name, country: place.country, coords: place.coords,
        ink:   INKS[(i * 5) % INKS.length],
        shape: SHAPES[(i * 3) % SHAPES.length],
        tilt:  ((i * 37) % 13) - 6
      });
    }
    return stamps;
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
      lead: "Le terme du chemin, après trois mille kilomètres.",
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
     correspond à une relation OpenStreetMap identifiée et sourcée — plus
     aucun n'est une estimation narrative. */
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
    route, stories, legs,
    totalKm: TOTAL_KM,
    stampEveryKm: STAMP_EVERY,
    stampCount: STAMP_COUNT,
    locate, placeAt, buildStamps
  };
})();
