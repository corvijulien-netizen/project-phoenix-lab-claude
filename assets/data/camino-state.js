/* ============================================================================
   Camino Virtuel — état courant
   ----------------------------------------------------------------------------
   C'est LE seul fichier à modifier pour mettre le site à jour. Le reste du code
   en découle.

   ┌────────────────────────────────────────────────────────────────────────┐
   │  RÈGLE ABSOLUE — une valeur que l'on n'a pas vaut  null                 │
   │                                                                        │
   │  null  ne signifie pas zéro. null signifie « pas encore mesuré », et    │
   │  l'interface l'affiche comme un état « en attente » explicite.          │
   │  Ne jamais écrire un chiffre plausible à la place d'un chiffre absent : │
   │  une nuit non enregistrée n'est pas une nuit de 7 h.                    │
   └────────────────────────────────────────────────────────────────────────┘
   ========================================================================== */

window.CAMINO_STATE = {

  /* --------------------------------------------------------------------------
     mode : "demo"  → bandeau « données de démonstration » affiché partout
            "reel"  → données réelles, bandeau retiré

     Reste sur "demo" jusqu'au vrai Jour 1. Passer à "reel" est un choix
     explicite, jamais un effet de bord.
     -------------------------------------------------------------------------- */
  mode: "demo",

  /* ---- le chemin -----------------------------------------------------------
     Règle du projet (Bible, ch. 1, §8.2) : ces deux valeurs sont la SEULE
     source des kilomètres qui font avancer le Camino. Elles ne viennent que
     d'activités volontairement enregistrées pour le projet (WorkOutDoors,
     Strava, Apple Exercice...). Les pas ordinaires du quotidien — travail,
     courses, déplacements non enregistrés comme activité dédiée — n'y
     entrent jamais, même indirectement via une autre tuile de l'interface.
     -------------------------------------------------------------------------- */

  // Total cumulé réellement marché depuis le départ, en kilomètres.
  distanceKm: 18.6,

  // Distance marchée aujourd'hui, via une activité officiellement enregistrée.
  // null si la journée n'est pas encore relevée.
  todayKm: 11.2,

  // Objectif d'activité quotidienne affiché dans « Mon quotidien ».
  dailyGoalKm: 15,

  // Date du Jour 1. null tant qu'elle n'est pas fixée.
  // (Les anciens classeurs mentionnent deux dates qui ne concordent pas ;
  //  aucune des deux n'est reprise ici tant que Julien n'a pas tranché.)
  startDate: null,

  /* ---- mon quotidien ---------------------------------------------------------
     Les données de santé passives de Julien — nutrition, sommeil, journal.
     Elles accompagnent le voyage sans en être le récit, et vivent dans la
     colonne de gauche, jamais sous la carte.

     L'activité n'est PAS dupliquée ici : elle est dérivée de `todayKm`
     ci-dessus au moment de l'affichage (voir renderDaily() dans camino.js).
     Une seule source pour ce chiffre, pour qu'il ne puisse jamais diverger
     entre « ce qui fait avancer le Camino » et « ce qui s'affiche ».

     Chaque entrée : { value, unit, goal, updatedAt }
       value     null  → « en attente », affiché comme tel
       goal      null  → aucun objectif fixé, aucune barre de progression
       updatedAt null  → provenance inconnue, la valeur n'est pas datée

     « Compagnons de route » est réservé à la future communauté qui suit
     l'aventure (Bible, ch. 1, §6.3) — ce nom ne doit plus être réutilisé ici.
     -------------------------------------------------------------------------- */
  quotidien: {
    nutrition: { label: "Nutrition", value: null, unit: "kcal",   goal: null, updatedAt: null },
    sommeil:   { label: "Sommeil",   value: null, unit: "h",      goal: null, updatedAt: null },
    journal:   { label: "Journal",   value: null, unit: "entrée", goal: null, updatedAt: null }
  },

  /* ---- comparateur avant / après ------------------------------------------
     Idée retenue mais non alimentée : tant qu'il n'y a pas de vraies photos,
     on n'affiche pas de fausse silhouette. L'interface propose un état
     d'attente dessiné, et rien d'autre.

       avant : { src, date }  |  null
       apres : { src, date }  |  null
     -------------------------------------------------------------------------- */
  transformation: {
    avant: null,
    apres: null
  }
};
