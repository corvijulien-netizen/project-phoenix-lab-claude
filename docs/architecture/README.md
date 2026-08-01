# Architecture technique

Ce dossier documente **comment le site fonctionne** : le flux de données entre
`camino-state.js` (les mesures), `camino-data.js` (le tracé, les lieux, les
tampons) et le rendu (`camino.js`, `camino-map.js`) ; la structure du pipeline
géométrique (`data/gpx/` → `data/route/`) ; les choix d'organisation du code.

Distinct de `docs/adr/` : un ADR documente *pourquoi* une décision a été prise
à un instant donné. Ce dossier documente *l'état actuel* du système, mis à
jour au fil de son évolution plutôt que figé à la date d'une décision.

Encore vide : le projet est encore à un stade où le code lui-même, largement
commenté, sert de documentation d'architecture. Ce dossier se remplira quand
la complexité du système dépassera ce que des commentaires en ligne peuvent
raisonnablement expliquer — notamment à l'arrivée d'un Knowledge Graph ou
d'une base documentaire externe (Bible, §11).
