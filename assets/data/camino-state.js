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

  /* ---- le chemin ---------------------------------------------------------- */

  // Total cumulé réellement marché depuis le départ, en kilomètres.
  distanceKm: 18.6,

  // Distance marchée aujourd'hui. null si la journée n'est pas encore relevée.
  todayKm: 11.2,

  // Date du Jour 1. null tant qu'elle n'est pas fixée.
  // (Les anciens classeurs mentionnent deux dates qui ne concordent pas ;
  //  aucune des deux n'est reprise ici tant que Julien n'a pas tranché.)
  startDate: null,

  /* ---- compagnons de route ------------------------------------------------
     Ces quatre domaines accompagnent le voyage sans en être le récit.
     Ils vivent dans la colonne de gauche, jamais sous la carte.

     Chaque entrée : { value, unit, goal, updatedAt }
       value     null  → « en attente », affiché comme tel
       goal      null  → aucun objectif fixé, aucune barre de progression
       updatedAt null  → provenance inconnue, la valeur n'est pas datée
     -------------------------------------------------------------------------- */
  compagnons: {
    activite:  { label: "Activité",  value: 11.2, unit: "km",     goal: 15,   updatedAt: null },
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
