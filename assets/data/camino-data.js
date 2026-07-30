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

     Via Francigena (Rome → Arles) puis Via Tolosana et Camino Francés
     (Arles → Santiago). Coordonnées réelles des villes-étapes.

     Sur la distance : la somme des segments à vol d'oiseau entre ces 60 points
     vaut ~1 995 km. Un pèlerin qui marche réellement en parcourt ~3 000, parce
     qu'un chemin serpente, monte et contourne. Le rapport entre les deux
     (~1,50) est le facteur de sinuosité appliqué plus bas.

     C'est une approximation, et elle est assumée comme telle : le site affiche
     « ≈ 3 000 km selon le tracé ». Le jour où un vrai fichier GPX sera
     disponible, il remplacera ce calcul sans rien changer au reste du code.
     -------------------------------------------------------------------------- */
  const route = [
    { name: "Rome",                    coords: [41.9028, 12.4964], country: "IT", rank: 1 },
    { name: "Monte Mario",             coords: [41.9192, 12.4504], country: "IT", rank: 3 },
    { name: "La Giustiniana",          coords: [41.9652, 12.4073], country: "IT", rank: 3 },
    { name: "La Storta",               coords: [42.0018, 12.3789], country: "IT", rank: 3 },
    { name: "Isola Farnese",           coords: [42.0215, 12.3763], country: "IT", rank: 3 },
    { name: "Formello",                coords: [42.0783, 12.4000], country: "IT", rank: 3 },
    { name: "Campagnano di Roma",      coords: [42.1354, 12.3749], country: "IT", rank: 3 },
    { name: "Nepi",                    coords: [42.2422, 12.3467], country: "IT", rank: 3 },
    { name: "Sutri",                   coords: [42.2470, 12.2168], country: "IT", rank: 3 },
    { name: "Capranica",               coords: [42.2556, 12.1739], country: "IT", rank: 3 },
    { name: "Vetralla",                coords: [42.3198, 12.0543], country: "IT", rank: 3 },
    { name: "Viterbe",                 coords: [42.4207, 12.1077], country: "IT", rank: 2 },
    { name: "Montefiascone",           coords: [42.5393, 12.0316], country: "IT", rank: 3 },
    { name: "Bolsena",                 coords: [42.6440, 11.9858], country: "IT", rank: 3 },
    { name: "Acquapendente",           coords: [42.7424, 11.8687], country: "IT", rank: 3 },
    { name: "Radicofani",              coords: [42.8954, 11.7675], country: "IT", rank: 3 },
    { name: "San Quirico d’Orcia",     coords: [43.0578, 11.6040], country: "IT", rank: 3 },
    { name: "Buonconvento",            coords: [43.1372, 11.4817], country: "IT", rank: 3 },
    { name: "Sienne",                  coords: [43.3188, 11.3308], country: "IT", rank: 1 },
    { name: "Monteriggioni",           coords: [43.3897, 11.2233], country: "IT", rank: 3 },
    { name: "San Gimignano",           coords: [43.4676, 11.0430], country: "IT", rank: 3 },
    { name: "Altopascio",              coords: [43.8139, 10.6772], country: "IT", rank: 3 },
    { name: "Lucques",                 coords: [43.8429, 10.5027], country: "IT", rank: 2 },
    { name: "Aulla",                   coords: [44.2062,  9.9675], country: "IT", rank: 3 },
    { name: "Sarzana",                 coords: [44.1122,  9.9636], country: "IT", rank: 3 },
    { name: "La Spezia",               coords: [44.1024,  9.8241], country: "IT", rank: 3 },
    { name: "Rapallo",                 coords: [44.3497,  9.2297], country: "IT", rank: 3 },
    { name: "Gênes",                   coords: [44.4056,  8.9463], country: "IT", rank: 2 },
    { name: "Savone",                  coords: [44.3091,  8.4772], country: "IT", rank: 3 },
    { name: "Finale Ligure",           coords: [44.1697,  8.3436], country: "IT", rank: 3 },
    { name: "Albenga",                 coords: [44.0490,  8.2127], country: "IT", rank: 3 },
    { name: "Imperia",                 coords: [43.8878,  8.0289], country: "IT", rank: 3 },
    { name: "San Remo",                coords: [43.8159,  7.7761], country: "IT", rank: 3 },
    { name: "Vintimille",              coords: [43.7912,  7.6083], country: "IT", rank: 3 },
    { name: "Menton",                  coords: [43.7750,  7.4975], country: "FR", rank: 3 },
    { name: "Monaco",                  coords: [43.7384,  7.4246], country: "FR", rank: 3 },
    { name: "Nice",                    coords: [43.7102,  7.2620], country: "FR", rank: 2 },
    { name: "Antibes",                 coords: [43.5808,  7.1251], country: "FR", rank: 3 },
    { name: "Cannes",                  coords: [43.5528,  7.0174], country: "FR", rank: 3 },
    { name: "Fréjus",                  coords: [43.4332,  6.7370], country: "FR", rank: 3 },
    { name: "Brignoles",               coords: [43.4058,  6.0616], country: "FR", rank: 3 },
    { name: "Saint-Maximin",           coords: [43.4525,  5.8619], country: "FR", rank: 3 },
    { name: "Aix-en-Provence",         coords: [43.5297,  5.4474], country: "FR", rank: 2 },
    { name: "Salon-de-Provence",       coords: [43.6406,  5.0975], country: "FR", rank: 3 },
    { name: "Arles",                   coords: [43.6766,  4.6278], country: "FR", rank: 1 },
    { name: "Saint-Gilles",            coords: [43.6766,  4.4307], country: "FR", rank: 3 },
    { name: "Lunel",                   coords: [43.6772,  4.1361], country: "FR", rank: 3 },
    { name: "Montpellier",             coords: [43.6108,  3.8767], country: "FR", rank: 2 },
    { name: "Béziers",                 coords: [43.3442,  3.2158], country: "FR", rank: 3 },
    { name: "Narbonne",                coords: [43.1839,  3.0036], country: "FR", rank: 3 },
    { name: "Carcassonne",             coords: [43.2130,  2.3510], country: "FR", rank: 2 },
    { name: "Castelnaudary",           coords: [43.3181,  1.9506], country: "FR", rank: 3 },
    { name: "Toulouse",                coords: [43.6047,  1.4442], country: "FR", rank: 1 },
    { name: "Gimont",                  coords: [43.6272,  0.8756], country: "FR", rank: 3 },
    { name: "Auch",                    coords: [43.6454,  0.5867], country: "FR", rank: 3 },
    { name: "Maubourguet",             coords: [43.4690,  0.0350], country: "FR", rank: 3 },
    { name: "Aire-sur-l’Adour",        coords: [43.7000, -0.2664], country: "FR", rank: 3 },
    { name: "Arzacq-Arraziguet",       coords: [43.5357, -0.4130], country: "FR", rank: 3 },
    { name: "Orthez",                  coords: [43.4880, -0.7730], country: "FR", rank: 3 },
    { name: "Navarrenx",               coords: [43.3236, -0.7592], country: "FR", rank: 3 },
    { name: "Saint-Jean-Pied-de-Port", coords: [43.1632, -1.2379], country: "FR", rank: 1 },
    { name: "Roncevaux",               coords: [43.0090, -1.3190], country: "ES", rank: 2 },
    { name: "Pampelune",               coords: [42.8125, -1.6458], country: "ES", rank: 2 },
    { name: "Puente la Reina",         coords: [42.6722, -1.8144], country: "ES", rank: 3 },
    { name: "Estella",                 coords: [42.6710, -2.0320], country: "ES", rank: 3 },
    { name: "Los Arcos",               coords: [42.5686, -2.1925], country: "ES", rank: 3 },
    { name: "Logroño",                 coords: [42.4627, -2.4449], country: "ES", rank: 2 },
    { name: "Nájera",                  coords: [42.4180, -2.7280], country: "ES", rank: 3 },
    { name: "Santo Domingo",           coords: [42.4410, -2.9530], country: "ES", rank: 3 },
    { name: "Belorado",                coords: [42.4200, -3.1919], country: "ES", rank: 3 },
    { name: "Burgos",                  coords: [42.3439, -3.6969], country: "ES", rank: 1 },
    { name: "Frómista",                coords: [42.2670, -4.4060], country: "ES", rank: 3 },
    { name: "Carrión de los Condes",   coords: [42.3372, -4.6031], country: "ES", rank: 3 },
    { name: "Sahagún",                 coords: [42.3720, -5.0300], country: "ES", rank: 3 },
    { name: "Mansilla de las Mulas",   coords: [42.4989, -5.4172], country: "ES", rank: 3 },
    { name: "León",                    coords: [42.5987, -5.5671], country: "ES", rank: 1 },
    { name: "Hospital de Órbigo",      coords: [42.4636, -5.8811], country: "ES", rank: 3 },
    { name: "Astorga",                 coords: [42.4550, -6.0520], country: "ES", rank: 3 },
    { name: "Ponferrada",              coords: [42.5460, -6.5960], country: "ES", rank: 3 },
    { name: "Villafranca del Bierzo",  coords: [42.6064, -6.8092], country: "ES", rank: 3 },
    { name: "O Cebreiro",              coords: [42.7080, -7.0430], country: "ES", rank: 2 },
    { name: "Triacastela",             coords: [42.7561, -7.2378], country: "ES", rank: 3 },
    { name: "Sarria",                  coords: [42.7790, -7.4140], country: "ES", rank: 3 },
    { name: "Portomarín",              coords: [42.8060, -7.6160], country: "ES", rank: 3 },
    { name: "Palas de Rei",            coords: [42.8740, -7.8680], country: "ES", rank: 3 },
    { name: "Melide",                  coords: [42.9140, -8.0140], country: "ES", rank: 3 },
    { name: "Arzúa",                   coords: [42.9280, -8.1640], country: "ES", rank: 3 },
    { name: "O Pedrouzo",              coords: [42.9058, -8.3644], country: "ES", rank: 3 },
    { name: "Santiago",                coords: [42.8782, -8.5448], country: "ES", rank: 1 }
  ];

  const TOTAL_KM      = 3000;  // distance de marche de référence, Rome → Santiago
  const STAMP_EVERY   = 50;    // un tampon tous les 50 km réels
  const STAMP_COUNT   = TOTAL_KM / STAMP_EVERY;  // 60

  /* ---- géométrie ---------------------------------------------------------- */

  function haversineKm(a, b) {
    const rad = (v) => v * Math.PI / 180;
    const R = 6371;
    const dLat = rad(b[0] - a[0]);
    const dLng = rad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 +
              Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  // Longueurs de segment et cumul à vol d'oiseau.
  const segments = [];
  let geodesicKm = 0;
  for (let i = 1; i < route.length; i += 1) {
    const d = haversineKm(route[i - 1].coords, route[i].coords);
    segments.push(d);
    geodesicKm += d;
  }

  /* --------------------------------------------------------------------------
     CALAGE SUR DISTANCES DE RÉFÉRENCE

     Un facteur de sinuosité unique appliqué à tout le tracé est faux : il
     étire de la même façon une côte rectiligne et un franchissement de col.
     Mesuré contre les références, il plaçait Sutri à 78 km au lieu de 45, et
     allongeait le Camino Francés de 780 à 961 km — jusqu'à +39 % d'erreur.

     On cale donc le tracé sur des distances réellement relevées par les guides
     de pèlerins, et on interpole proportionnellement entre ces points d'ancrage.

     ATTENTION : ces valeurs sont des approximations couramment citées, qui
     varient de ±5 à 10 % selon les sources et les variantes de chemin. Elles ne
     remplacent pas un tracé GPX. Elles sont bien meilleures qu'un facteur
     uniforme, elles ne sont pas des mesures au mètre.
     -------------------------------------------------------------------------- */

  const idx = (name) => route.findIndex((s) => s.name === name);
  const geoBetween = (a, b) => {
    let sum = 0;
    for (let i = a + 1; i <= b; i += 1) sum += segments[i - 1];
    return sum;
  };

  // Segment 1 — Via Francigena italienne, cumul depuis Rome.
  const anchors = [
    ["Rome", 0], ["La Storta", 19], ["Sutri", 45], ["Viterbe", 92],
    ["Bolsena", 140], ["Acquapendente", 150], ["Sienne", 260], ["Lucques", 419]
  ];

  /* Connecteur ligure Lucques → Arles. C'est le maillon faible du tracé : il
     n'existe aucun itinéraire de pèlerinage documenté entre la Toscane et la
     Provence. On suit ici l'ancienne Via Aurelia le long de la côte, et on
     estime sa longueur à partir de sa propre géométrie plutôt que de la
     deviner — les routes côtières serpentent peu, d'où un facteur modeste. */
  const COASTAL_WINDING = 1.25;
  const connector = geoBetween(idx("Lucques"), idx("Arles")) * COASTAL_WINDING;
  const arlesKm = 419 + connector;

  // Segment 2 — Via Tolosana, cumul depuis Arles.
  [["Arles", 0], ["Saint-Gilles", 20.5], ["Montpellier", 135],
   ["Toulouse", 463], ["Auch", 530], ["Saint-Jean-Pied-de-Port", 700]
  ].forEach(([n, km]) => anchors.push([n, arlesKm + km]));

  const sjppKm = arlesKm + 700;

  // Segment 3 — Camino Francés, cumul depuis Saint-Jean-Pied-de-Port.
  [["Roncevaux", 25], ["Pampelune", 69], ["Puente la Reina", 92],
   ["Logroño", 160], ["Santo Domingo", 200], ["Burgos", 280],
   ["Frómista", 340], ["León", 430], ["Astorga", 485], ["Ponferrada", 525],
   ["O Cebreiro", 560], ["Sarria", 665], ["Santiago", 780]
  ].forEach(([n, km]) => anchors.push([n, sjppKm + km]));

  // Interpolation entre ancres, au prorata des distances à vol d'oiseau.
  const pinned = anchors
    .map(([name, km]) => ({ i: idx(name), km }))
    .filter((a) => a.i >= 0)
    .sort((a, b) => a.i - b.i);

  route[0].km = 0;
  for (let a = 0; a < pinned.length - 1; a += 1) {
    const from = pinned[a], to = pinned[a + 1];
    const span = to.km - from.km;
    const geoSpan = geoBetween(from.i, to.i) || 1;
    let walked = 0;
    for (let i = from.i + 1; i <= to.i; i += 1) {
      walked += segments[i - 1];
      route[i].km = from.km + span * (walked / geoSpan);
    }
  }

  // Le chemin réel ainsi reconstitué mesure moins de 3 000 km. Julien a fixé
  // 3 000 comme objectif — c'est aussi ce qui donne exactement 60 tampons de
  // 50 km. On conserve donc ce cap symbolique et on met le tracé à son échelle :
  // les positions relatives restent fidèles, seule l'unité change.
  const realKm = route[route.length - 1].km;
  const SCALE = TOTAL_KM / realKm;
  route.forEach((s) => { s.km *= SCALE; });

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
      lead: "Fin de la section italienne la mieux documentée du chemin.",
      body: "Au-delà, aucun itinéraire de pèlerinage ne relie la Toscane à la " +
            "Provence : la Via Francigena, elle, remonte vers la Suisse. Le tracé " +
            "suit alors la côte ligure par l’ancienne Via Aurelia — un raccourci " +
            "assumé, pas un chemin balisé."
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

  /* Les trois itinéraires réels que le tracé enchaîne. Il n'existe pas de
     « chemin officiel Rome → Santiago » : c'est une composition, et le site
     doit le dire plutôt que de la présenter comme un chemin historique unique. */
  const legs = [
    { name: "Via Francigena",  from: "Rome",  to: "Lucques",
      note: "Section italienne du chemin de Canterbury à Rome, parcourue vers le nord." },
    { name: "Côte ligure",     from: "Lucques", to: "Arles", estimated: true,
      note: "Aucun itinéraire de pèlerinage ne relie la Toscane à la Provence. " +
            "Ce maillon suit l’ancienne Via Aurelia : c’est un raccourci narratif, " +
            "pas un chemin balisé." },
    { name: "Via Tolosana",    from: "Arles", to: "Saint-Jean-Pied-de-Port",
      note: "Le plus méridional des quatre chemins français, classés à l’UNESCO en 1998." },
    { name: "Camino Francés",  from: "Saint-Jean-Pied-de-Port", to: "Santiago",
      note: "Le chemin le plus emprunté et le mieux balisé des quatre." }
  ];

  return {
    route, stories, legs,
    totalKm: TOTAL_KM,
    stampEveryKm: STAMP_EVERY,
    stampCount: STAMP_COUNT,
    geodesicKm,
    realKm,            // longueur du chemin reconstitué avant mise à l'échelle
    scale: SCALE,      // facteur appliqué pour atteindre l'objectif symbolique
    haversineKm, locate, placeAt, buildStamps
  };
})();
