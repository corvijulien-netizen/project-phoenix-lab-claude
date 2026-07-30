/* ============================================================================
   Camino Virtuel — la carte
   ----------------------------------------------------------------------------
   Une vraie carte Leaflet : zoomable, déplaçable, en coordonnées réelles.
   Ce n'est pas une image.

   Ce qui change par rapport à des tuiles classiques : le fond de carte n'est
   pas une photo aérienne ni un plan routier, c'est une cartographie dessinée
   à partir de contours géographiques réels (Natural Earth). Les tuiles
   OpenStreetMap restent disponibles en un clic, pour qui veut le détail des
   rues — mais le rendu par défaut est celui d'une carte gravée sur papier.
   ========================================================================== */

window.CaminoMap = (() => {
  "use strict";

  const D = window.CAMINO_DATA;

  /* --------------------------------------------------------------------------
     Reliefs. Les grands massifs que le chemin longe ou franchit, tracés par
     leur ligne de crête. Ils sont ensuite rendus en hachures, à la manière des
     cartes gravées du XIXᵉ, plutôt qu'en aplats de couleur.
     -------------------------------------------------------------------------- */
  const RANGES = [
    { name: "Alpes",         weight: 1.0, spine: [[44.2,6.9],[44.7,7.4],[45.2,7.9],[45.6,8.6],[46.0,9.4],[46.4,10.3],[46.6,11.4],[46.8,12.4]] },
    { name: "Apennins",      weight: .75, spine: [[44.3,9.3],[43.8,10.6],[43.4,11.6],[42.9,12.6],[42.3,13.3],[41.8,14.0],[41.2,14.6],[40.5,15.5]] },
    { name: "Pyrénées",      weight: 1.0, spine: [[42.5,3.0],[42.6,2.0],[42.8,1.0],[42.9,0.2],[42.9,-0.7],[43.0,-1.4],[43.1,-2.2]] },
    { name: "Massif central",weight: .55, spine: [[44.5,2.6],[44.9,3.2],[45.3,3.6],[45.7,3.2],[45.9,2.6],[45.5,2.2]] },
    { name: "Cantabriques",  spine: [[43.2,-3.2],[43.1,-4.2],[43.0,-5.2],[42.9,-6.2],[42.8,-7.0]], weight: .8 },
    { name: "Système ibérique", weight: .5, spine: [[42.0,-2.6],[41.7,-2.0],[41.4,-1.6],[41.0,-1.4]] },
    { name: "Jura",          weight: .5, spine: [[46.2,5.9],[46.6,6.4],[47.0,6.9],[47.3,7.3]] }
  ];

  /* Génère des hachures perpendiculaires le long d'une crête : chaque marque
     est un petit chevron, dont la taille décroît vers les extrémités du massif. */
  function hachures(spine, weight) {
    const marks = [];
    for (let i = 1; i < spine.length; i += 1) {
      const [aLat, aLng] = spine[i - 1];
      const [bLat, bLng] = spine[i];
      const steps = 5;
      for (let s = 0; s < steps; s += 1) {
        const t = s / steps;
        const lat = aLat + (bLat - aLat) * t;
        const lng = aLng + (bLng - aLng) * t;
        // normale au segment, corrigée de la convergence des méridiens
        const dLat = bLat - aLat;
        const dLng = (bLng - aLng) * Math.cos(lat * Math.PI / 180);
        const len = Math.hypot(dLat, dLng) || 1;
        const nLat = -dLng / len;
        const nLng = (dLat / len) / Math.cos(lat * Math.PI / 180);
        // taille du chevron : maximale au centre du massif, atténuée aux bouts
        const along = (i - 1 + t) / (spine.length - 1);
        const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, along)));
        const size = (0.10 + 0.16 * fade) * weight;
        marks.push([
          [lat - nLat * size * .45, lng - nLng * size * .45],
          [lat + nLat * size, lng + nLng * size]
        ]);
      }
    }
    return marks;
  }

  /* -------------------------------------------------------------------------- */

  function create(container, state, options = {}) {
    const L = window.L;
    if (!L) {
      container.innerHTML =
        '<p class="map-fallback">La bibliothèque de carte n’a pas pu se charger. ' +
        'Recharge la page pour réessayer.</p>';
      return null;
    }

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 4,
      maxZoom: 17,
      zoomSnap: 0.25,
      wheelPxPerZoomLevel: 140,
      renderer: L.svg({ padding: 0.6 })
    });

    /* ---- panneaux : le fond dessiné, puis le chemin par-dessus ------------- */
    map.createPane("paper");   map.getPane("paper").style.zIndex   = 250;
    map.createPane("relief");  map.getPane("relief").style.zIndex  = 300;
    map.createPane("chemin");  map.getPane("chemin").style.zIndex  = 400;

    /* ---- terres et côtes --------------------------------------------------- */
    const geo = window.CAMINO_GEO;
    let landLayer = null;

    if (geo) {
      // Deux passes : un halo côtier large et pâle, puis le trait de côte net.
      // C'est ce dégradé qui donne l'impression de gravure ancienne.
      // fillOpacity est explicite : Leaflet la fixe à 0.2 par défaut, ce qui
      // délaverait complètement le sable des terres sur le bleu de la mer.
      landLayer = L.layerGroup([
        L.geoJSON(geo, {
          pane: "paper",
          interactive: false,
          style: { className: "land-halo", stroke: true, weight: 7, fill: false, opacity: 1 }
        }),
        L.geoJSON(geo, {
          pane: "paper",
          interactive: false,
          style: {
            className: "land-body",
            stroke: true, weight: 1.1, opacity: 1,
            fill: true, fillOpacity: 1
          }
        })
      ]).addTo(map);
    }

    /* ---- relief ------------------------------------------------------------ */
    const reliefMarks = [];
    RANGES.forEach((range) => {
      hachures(range.spine, range.weight).forEach((seg) => {
        reliefMarks.push(L.polyline(seg, {
          pane: "relief", interactive: false,
          className: "relief-mark", weight: 1, fill: false
        }));
      });
    });
    const reliefLayer = L.layerGroup(reliefMarks).addTo(map);

    /* ---- tuiles OpenStreetMap, en option ----------------------------------- */
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      className: "osm-tiles",
      attribution: "&copy; OpenStreetMap"
    });

    /* ---- le chemin --------------------------------------------------------- */
    const coords = D.route.map((s) => s.coords);
    const here = D.locate(state.distanceKm ?? 0);

    // Portion restante : pointillés discrets.
    L.polyline(coords, {
      pane: "chemin", interactive: false,
      className: "route-remaining", weight: 2.4, fill: false
    }).addTo(map);

    // Portion parcourue : trait plein, doublé d'un halo chaud.
    const walked = walkedCoords(state.distanceKm ?? 0);
    L.polyline(walked, {
      pane: "chemin", interactive: false,
      className: "route-walked-halo", weight: 11, fill: false
    }).addTo(map);
    L.polyline(walked, {
      pane: "chemin", interactive: false,
      className: "route-walked", weight: 4, fill: false
    }).addTo(map);

    function walkedCoords(km) {
      const pos = D.locate(km);
      const out = [];
      for (const stop of D.route) {
        if (stop.km <= km) out.push(stop.coords);
      }
      out.push(pos.coords);
      return out.length > 1 ? out : [D.route[0].coords, pos.coords];
    }

    /* ---- villes ------------------------------------------------------------ */
    const cityMarkers = [];
    let labelFlip = 0;
    const firstStop = D.route[0];
    const lastStop = D.route[D.route.length - 1];

    D.route.forEach((stop) => {
      if (stop.rank > 2) return;              // les hameaux n'encombrent pas la carte
      const isEndpoint = stop === firstStop || stop === lastStop;
      const reached = stop.km <= (state.distanceKm ?? 0);

      // Les villes se suivent de près sur le tracé : en alternant l'étiquette
      // au-dessus puis au-dessous du point, deux voisines ne se recouvrent pas.
      const side = (labelFlip += 1) % 2 ? "label-up" : "label-down";

      const marker = L.marker(stop.coords, {
        pane: "chemin",
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: `city city-rank-${stop.rank} ${side}${reached ? " is-reached" : ""}`,
          html: `<i class="city-dot"></i><b class="city-name">${stop.name}</b>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        })
      }).addTo(map);
      cityMarkers.push({ marker, rank: stop.rank, isEndpoint });
    });

    /* Densité d'étiquettes par paliers de zoom. Sur un écran étroit la carte se
       cadre très large, et toutes les villes se chevauchaient : on ne garde
       alors que les deux extrémités du chemin, puis on densifie en zoomant. */
    function refreshCityLabels() {
      const z = map.getZoom();
      cityMarkers.forEach(({ marker, rank, isEndpoint }) => {
        const el = marker.getElement();
        if (!el) return;
        const visible = isEndpoint          ? true
                      : z < 5               ? false
                      : rank === 1          ? true
                      : z >= 6;
        el.classList.toggle("is-hidden", !visible);
      });
    }
    map.on("zoomend", refreshCityLabels);

    /* ---- position actuelle -------------------------------------------------- */
    const pin = L.marker(here.coords, {
      pane: "chemin",
      zIndexOffset: 1000,
      icon: L.divIcon({
        className: "pilgrim",
        html: '<span class="pilgrim-halo"></span><span class="pilgrim-dot"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
    }).addTo(map);

    // "auto" bascule l'étiquette du côté opposé au bord : près de Rome, à
    // l'extrémité droite du cadrage large, elle se plaçait hors du cadre.
    pin.bindTooltip(options.pinLabel || "Ma position", {
      className: "pilgrim-tip",
      direction: "auto",
      offset: [0, 0],
      permanent: true
    });

    /* ---- cadrages ----------------------------------------------------------- */
    const bounds = L.latLngBounds(coords);
    const showAll = () => map.fitBounds(bounds, { padding: [46, 46], animate: true });
    const showHere = () => map.flyTo(here.coords, 10, { duration: 1.1 });

    let usingTiles = false;
    function toggleTiles(on) {
      usingTiles = on === undefined ? !usingTiles : on;
      container.classList.toggle("is-detailed", usingTiles);
      if (usingTiles) {
        tiles.addTo(map);
        if (landLayer) map.removeLayer(landLayer);
        map.removeLayer(reliefLayer);
      } else {
        map.removeLayer(tiles);
        if (landLayer) landLayer.addTo(map);
        reliefLayer.addTo(map);
      }
      return usingTiles;
    }

    requestAnimationFrame(() => {
      map.invalidateSize();
      showAll();
      refreshCityLabels();
    });

    return { map, showAll, showHere, toggleTiles, position: here, bounds };
  }

  return { create };
})();
