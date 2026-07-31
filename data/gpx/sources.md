# Sources du tracé maître — Camino Virtuel

Trace complet Rome → Santiago de Compostela, assemblé par tronçons à partir de relations
OpenStreetMap (licence ODbL — © OpenStreetMap contributors). Toutes les jonctions ont été
vérifiées sous le seuil de 150 m fixé par le pipeline.

## 1. Via Francigena — Rome (Saint-Pierre) → Sarzana

- **Relation OSM :** continentale, id 11860709 — https://hiking.waymarkedtrails.org/#route?id=11860709
- **Sous-ensemble utilisé :** Rome → jonction Sarzana/Luni
- **Point de départ forcé :** 41.903170, 12.457577 (écart de 1,45 m avec le point réel du tracé)

## 2. Via della Costa — Sarzana → Ventimiglia

- **Relation OSM :** id 11685878 — https://hiking.waymarkedtrails.org/#route?id=11685878&type=relation
- **Fichier complet utilisé** (remplace une première tentative "Tappa 12" incomplète)
- **Jonction avec Via Francigena :** 0 m (correspondance exacte)

## 3. Via Aurelia — Ventimiglia → Arles

- **Relation OSM :** id 8298137 — https://hiking.waymarkedtrails.org/#route?id=8298137&type=relation
- **Jonction avec Via della Costa :** 11,47 m

## 4. Voie d'Arles (Via Tolosana) — Arles → Oloron-Sainte-Marie

- **Relation OSM :** id 389715 — https://hiking.waymarkedtrails.org/#route?id=389715&type=relation
- **Jonction avec Via Aurelia :** 1,58 m

## 5. Voie du Piémont pyrénéen — Oloron-Sainte-Marie → Saint-Jean-Pied-de-Port

- **Relation OSM :** id 368453 — https://hiking.waymarkedtrails.org/#route?id=368453&type=relation
- **Jonction avec la Voie d'Arles :** 1,84 m

## 6. Voie du Puy (Via Podiensis) — portion finale, Saint-Jean-Pied-de-Port → frontière espagnole

- **Relation OSM :** id 138227 — https://hiking.waymarkedtrails.org/#route?id=138227&type=relation
- **Sous-ensemble utilisé :** uniquement la fin du fichier (le tronçon Le Puy-en-Velay → SJPP n'est pas utilisé)
- **Jonction avec la Voie du Piémont :** 4,32 m

## 7. Camino Francés — frontière espagnole → Santiago de Compostela

- **Relation OSM :** id 2163573 — https://hiking.waymarkedtrails.org/#route?id=2163573&type=relation
- **Jonction avec la Voie du Puy :** 0 m (correspondance exacte)

---

## Distance totale calculée sur la géométrie réelle

**2 796,41 km** — remplace la valeur provisoire de 2 890 km.

---

## Extension bonus (hors récit symbolique principal)

## 8. Camino de Fisterra-Muxía — Santiago de Compostela → Fisterra / Muxía

- **Relation OSM :** id 385098 — https://hiking.waymarkedtrails.org/#route?id=385098
- **Jonction avec Santiago :** 0 m (correspondance exacte)
- **Distance :** 119,79 km
- **Statut :** fichier séparé (`bonus-fisterra-muxia.gpx`), à ne jamais additionner à la distance
  principale de 2 796,41 km. Le récit symbolique reste "Rome → Compostelle" ; cette extension
  sera activée plus tard comme module optionnel.

---

## Récapitulatif des jonctions

| Jonction | Écart |
|---|---|
| Départ Saint-Pierre | 1,45 m |
| Via Francigena → Via della Costa | 0 m |
| Via della Costa → Via Aurelia | 11,47 m |
| Via Aurelia → Voie d'Arles | 1,58 m |
| Voie d'Arles → Voie du Piémont | 1,84 m |
| Voie du Piémont → Voie du Puy | 4,32 m |
| Voie du Puy → Camino Francés | 0 m |
| Camino Francés → Fisterra/Muxía (bonus) | 0 m |

Toutes sous le seuil de 150 m. Aucune donnée inventée, aucun kilomètre estimé.
