/* ============================================================================
   Camino Virtuel — application
   ----------------------------------------------------------------------------
   Aucun chiffre n'est écrit dans le HTML. Tout ce qui s'affiche est produit ici
   à partir de CAMINO_STATE (les mesures) et de CAMINO_DATA (le chemin).

   Conséquence directe de la règle « ne jamais inventer une donnée » : une
   valeur nulle ne traverse jamais silencieusement l'interface. Elle est rendue
   par enAttente(), qui produit un état visuel explicite et assumé.
   ========================================================================== */

(() => {
  "use strict";

  const D = window.CAMINO_DATA;
  const S = window.CAMINO_STATE;

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---- formatage ---------------------------------------------------------- */

  const nf = (v, digits = 1) => v.toLocaleString("fr-FR", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : digits,
    maximumFractionDigits: digits
  });

  /** Une valeur absente ne devient jamais un chiffre. */
  function enAttente(label = "en attente") {
    return `<span class="pending" role="note"><i aria-hidden="true"></i>${label}</span>`;
  }

  const has = (v) => v !== null && v !== undefined && !Number.isNaN(v);

  /* ---- état dérivé --------------------------------------------------------- */

  const km        = has(S.distanceKm) ? S.distanceKm : 0;
  const ratio     = Math.min(1, km / D.totalKm);
  const position  = D.locate(km);

  // Seuls les tampons ATTEINTS existent pour le reste du programme : un lieu
  // non révélé n'apparaît dans aucune structure de données, ce qui rend un
  // affichage prématuré impossible plutôt que masqué par du CSS.
  const stamps = D.getStamps(km);

  // Le lieu affiché est DÉDUIT de la position, jamais saisi à la main : les deux
  // ne peuvent donc pas diverger quand la distance change.
  const nearing   = position.to;
  const lastPast  = position.from;

  /* ---- en-tête et progression ---------------------------------------------- */

  function renderHeader() {
    $("[data-km-total]").innerHTML = has(S.distanceKm) ? nf(km) : enAttente("—");
    $("[data-km-goal]").textContent = nf(D.totalKm, 0);
    $("[data-percent]").textContent = (ratio * 100).toFixed(2).replace(".", ",");

    const bar = $("[data-progress-bar]");
    bar.style.setProperty("--p", `${Math.max(ratio * 100, 0.35)}%`);
    bar.setAttribute("aria-valuenow", String(Math.round(km)));
    bar.setAttribute("aria-valuetext",
      `${nf(km)} kilomètres parcourus sur ${nf(D.totalKm, 0)}`);

    $("[data-today]").innerHTML = has(S.todayKm)
      ? `<strong>${nf(S.todayKm)}</strong> km aujourd’hui`
      : enAttente("journée pas encore relevée");

    // Étape en cours : on annonce ce vers quoi on marche, pas un lieu supposé atteint.
    $("[data-stage-name]").textContent = nearing.name;
    $("[data-stage-from]").textContent = lastPast.name;

    const remaining = Math.max(0, nearing.km - km);
    $("[data-stage-remaining]").innerHTML = remaining > 0
      ? `Encore <strong>${nf(remaining)} km</strong> avant d’y arriver`
      : "Étape atteinte";

    const story = D.stories[nearing.name] || D.stories[lastPast.name] || null;
    renderStory(story);
  }

  function renderStory(story) {
    const figure = $("[data-stage-figure]");
    const region = $("[data-stage-region]");

    if (story && story.image) {
      figure.innerHTML =
        `<img src="${story.image}" alt="${story.caption || ""}" loading="lazy">` +
        `<figcaption>${story.caption || ""}</figcaption>`;
      figure.classList.remove("is-pending");
      region.textContent = story.region || "";
    } else {
      // Étape non documentée : on le dit, on ne fabrique pas d'illustration.
      figure.innerHTML =
        `<div class="figure-pending">` +
        `  <svg viewBox="0 0 64 40" aria-hidden="true">` +
        `    <path class="hill" d="M0 34 14 20l9 8 12-15 13 14 16-9v16H0Z"/>` +
        `    <path class="road" d="M26 40c4-9 9-13 14-20"/>` +
        `    <circle class="sun" cx="49" cy="9" r="4"/>` +
        `  </svg>` +
        `  <p>Étape pas encore documentée</p>` +
        `</div>`;
      figure.classList.add("is-pending");
      region.textContent = "";
    }
  }

  /* ---- composition du tracé --------------------------------------------------
     Le chemin enchaîne trois itinéraires réels et un maillon sans équivalent
     historique. Le site l'annonce au lieu de laisser croire à un chemin unique.
     ---------------------------------------------------------------------------- */

  function renderLegs() {
    const host = $("[data-legs]");
    if (!host || !D.legs) return;

    const kmOf = (name) => (D.placeByName(name) || {}).km ?? 0;

    host.innerHTML = D.legs.map((leg) => {
      const from = kmOf(leg.from), to = kmOf(leg.to);
      const done = km >= to;
      const here = km > from && km < to;
      return `
        <li class="leg${leg.estimated ? " is-estimated" : ""}${done ? " is-done" : ""}${here ? " is-here" : ""}">
          <span class="leg-range">${nf(from, 0)} — ${nf(to, 0)} km</span>
          <strong>${leg.name}${leg.estimated ? ' <em>estimé</em>' : ""}</strong>
          <span class="leg-ends">${leg.from} → ${leg.to}</span>
          <p>${leg.note}</p>
        </li>`;
    }).join("");
  }

  /* ---- mon quotidien ---------------------------------------------------------
     « Compagnons de route » est réservé à la future communauté (Bible, §6.3) :
     cette colonne ne montre que les données personnelles de Julien.
     L'activité n'est pas une donnée indépendante : elle est dérivée de
     S.todayKm, la même valeur qui fait avancer le Camino — impossible que les
     deux divergent puisque ce n'est jamais que la même source, affichée deux
     fois.
     ---------------------------------------------------------------------------- */

  function renderDaily() {
    const host = $("[data-daily]");
    if (!host) return;

    const activite = {
      label: "Activité", unit: "km",
      value: S.todayKm, goal: S.dailyGoalKm ?? null, updatedAt: null
    };
    const entries = { activite, ...S.quotidien };

    host.innerHTML = Object.entries(entries).map(([key, c]) => {
      const known = has(c.value);
      const pct = known && has(c.goal) && c.goal > 0
        ? Math.min(100, (c.value / c.goal) * 100)
        : null;

      return `
        <li class="compagnon compagnon-${key}${known ? "" : " is-pending"}">
          <span class="compagnon-label">${c.label}</span>
          <span class="compagnon-value">${
            known
              ? `<strong>${nf(c.value)}</strong><small>${c.unit}</small>`
              : enAttente()
          }</span>
          ${pct !== null
            ? `<span class="compagnon-bar"><i style="width:${pct}%"></i></span>
               <span class="compagnon-goal">Objectif ${nf(c.goal)} ${c.unit}</span>`
            : `<span class="compagnon-goal">${
                 has(c.goal) ? `Objectif ${nf(c.goal)} ${c.unit}` : "Aucun objectif fixé"
               }</span>`}
        </li>`;
    }).join("");
  }

  /* ---- le crédential, en carnet accordéon ------------------------------------
     Six tampons par volet, dix volets, plus la page d'identité : le carnet se
     déplie horizontalement comme un vrai leporello de pèlerin.
     ---------------------------------------------------------------------------- */

  const PER_PANEL = 6;
  const earned = stamps.length;

  /* Un lieu non atteint n'existe jamais dans `stamps` (voir D.getStamps) :
     tout ce qui arrive ici est déjà obtenu. Il n'y a donc plus de notion de
     tampon « verrouillé » ou « en cours » — ce mécanisme appartenait au
     système kilométrique retiré. */
  function stampMarkup(stamp) {
    const cls = [
      "stamp", "is-earned",
      `ink-${stamp.ink || "sepia"}`,
      `shape-${stamp.shape || "cercle"}`
    ].join(" ");

    const icon = stamp.isDeparture ? KEYS_SVG : SHELL_SVG;
    const caption = stamp.isDeparture ? "Départ de l’aventure" : `${nf(stamp.routeDistanceKm, 0)} km`;

    return `
      <li class="${cls}" title="${stamp.description || ""}">
        <span class="stamp-face">
          <span class="stamp-ring" aria-hidden="true"></span>
          <span class="stamp-place">${stamp.place ? stamp.place.name : stamp.name}</span>
          <span class="stamp-shell" aria-hidden="true">${icon}</span>
          <span class="stamp-km">${caption}</span>
        </span>
        <span class="stamp-status">Tampon obtenu</span>
      </li>`;
  }

  /* Coquille Saint-Jacques : éventail à bord festonné, charnière en bas,
     nervures rayonnantes. Géométrie générée, pas approximée à la main. */
  const SHELL_SVG = `
    <svg viewBox="0 0 40 38" aria-hidden="true">
      <path d="M3.5 27.6Q3.1 23.9 7.1 22.5Q7.3 18.3 11.5 18.4Q13.2 14.6 17 16.3Q20 13.3 23 16.3Q26.8 14.6 28.5 18.4Q32.7 18.3 32.9 22.5Q36.9 23.9 36.5 27.6Q30 31 23.4 33.5L22.6 36.4L17.4 36.4L16.6 33.5Q10 31 3.5 27.6Z"/>
      <path d="M20 33L8.4 23.4M20 33L12.3 19.8M20 33L17.3 17.9M20 33L22.7 17.9M20 33L27.7 19.8M20 33L31.6 23.4M20 33L20 16.9"/>
    </svg>`;

  /* Clés croisées, motif générique inspiré des clés de saint Pierre — pour le
     tampon provisoire de Rome uniquement. Schématique, pas la reproduction
     d'un blason ou d'un tampon existant. */
  const KEYS_SVG = `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <g transform="translate(20 20) rotate(-40)">
        <path d="M0 -13V5.4M0 11m-4.6 0a4.6 4.6 0 1 0 9.2 0a4.6 4.6 0 1 0 -9.2 0M0 -13h5M0 -9.5h4"/>
      </g>
      <g transform="translate(20 20) rotate(40) scale(1,-1)">
        <path d="M0 -13V5.4M0 11m-4.6 0a4.6 4.6 0 1 0 9.2 0a4.6 4.6 0 1 0 -9.2 0M0 -13h-5M0 -9.5h-4"/>
      </g>
    </svg>`;

  function renderCredential() {
    const host = $("[data-accordion]");
    if (!host) return;

    const panels = [];

    // Volet de tête : l'identité du carnet. Aucun total n'est annoncé — le
    // nombre final de tampons n'est pas figé (Bible, règle n°10).
    panels.push(`
      <section class="fold fold-cover" aria-label="Couverture du crédential">
        <span class="fold-emblem" aria-hidden="true">${SHELL_SVG}</span>
        <p class="fold-overline">Credencial del peregrino</p>
        <h3>Carnet du pèlerin</h3>
        <dl class="fold-id">
          <div><dt>Départ</dt><dd>Rome · Italie</dd></div>
          <div><dt>Arrivée</dt><dd>Santiago · Espagne</dd></div>
          <div><dt>Distance</dt><dd>${nf(D.totalKm, 0)} km</dd></div>
        </dl>
        <p class="fold-note">Les tampons marquent les lieux les plus significatifs
           du chemin. Ils se révèlent un par un, seulement lorsque Julien les
           atteint réellement.</p>
      </section>`);

    for (let i = 0; i < stamps.length; i += PER_PANEL) {
      const slice = stamps.slice(i, i + PER_PANEL);
      panels.push(`
        <section class="fold fold-page" aria-label="Tampons obtenus">
          <header class="fold-head">
            <span>${earned} obtenu${earned > 1 ? "s" : ""}</span>
            <small>${slice.map((s) => s.place ? s.place.name : s.name).join(" · ")}</small>
          </header>
          <ul class="stamp-row">${slice.map(stampMarkup).join("")}</ul>
        </section>`);
    }

    // Volet final : la Compostela, scellée jusqu'à l'arrivée réelle à
    // Santiago — indépendamment du nombre de tampons obtenus en chemin.
    const complete = km >= D.totalKm;
    panels.push(`
      <section class="fold fold-compostela${complete ? " is-open" : ""}"
               aria-label="Compostela virtuelle">
        <span class="fold-emblem" aria-hidden="true">${SHELL_SVG}</span>
        <p class="fold-overline">Compostela</p>
        <h3>${complete ? "Chemin accompli" : "Scellée"}</h3>
        <p class="fold-note">${complete
          ? "Le chemin de Rome à Santiago est achevé."
          : "Elle se délivre à l’arrivée réelle à Santiago."}</p>
        <span class="wax" aria-hidden="true"><span>${SHELL_SVG}</span></span>
      </section>`);

    host.innerHTML = panels.join("");
    $("[data-stamp-label]").textContent = `${earned} tampon${earned > 1 ? "s" : ""} obtenu${earned > 1 ? "s" : ""}`;
  }

  /* ---- comparateur avant / après --------------------------------------------
     Affiché seulement si les deux photos existent. Sinon : un état d'attente
     dessiné. Jamais de fausse photo de corps.
     ---------------------------------------------------------------------------- */

  function renderTransformation() {
    const host = $("[data-compare]");
    if (!host) return;

    const t = S.transformation || {};
    if (!t.avant || !t.apres) {
      host.innerHTML = `
        <div class="compare-pending">
          <svg viewBox="0 0 120 80" aria-hidden="true">
            <rect class="frame" x="6"  y="8" width="48" height="64" rx="3"/>
            <rect class="frame" x="66" y="8" width="48" height="64" rx="3"/>
            <path class="mark" d="M22 56c0-9 4-14 8-14s8 5 8 14M30 34a5 5 0 1 0 0-10 5 5 0 0 0 0 10"/>
            <path class="mark" d="M82 56c0-9 4-14 8-14s8 5 8 14M90 34a5 5 0 1 0 0-10 5 5 0 0 0 0 10"/>
            <path class="arrow" d="M56 40h8m-3-3 3 3-3 3"/>
          </svg>
          <div>
            <strong>Comparatif en attente</strong>
            <p>Deux photos, même pose, même lumière : la première au Jour 1,
               la seconde plus tard sur le chemin. Rien n’est affiché tant que
               les deux n’existent pas.</p>
          </div>
        </div>`;
      host.classList.add("is-pending");
      return;
    }

    host.classList.remove("is-pending");
    host.innerHTML = `
      <div class="compare" data-compare-widget>
        <img class="compare-before" src="${t.avant.src}" alt="Photo du premier jour">
        <div class="compare-after-wrap"><img src="${t.apres.src}" alt="Photo récente"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Comparer avant et après">
        <span class="compare-handle" aria-hidden="true"></span>
      </div>`;

    const widget = $("[data-compare-widget]", host);
    const range = $("input", widget);
    const sync = () => widget.style.setProperty("--split", `${range.value}%`);
    range.addEventListener("input", sync);
    sync();
  }

  /* ---- carte ---------------------------------------------------------------- */

  let mapApi = null;

  function renderMap() {
    const host = $("#camino-map");
    if (!host) return;

    mapApi = window.CaminoMap.create(host, S, {
      pinLabel: `${nf(km)} km — vers ${nearing.name}`
    });
    if (!mapApi) return;

    $("[data-map-all]")?.addEventListener("click", () => mapApi.showAll());
    $("[data-map-here]")?.addEventListener("click", () => mapApi.showHere());

    const detail = $("[data-map-detail]");
    detail?.addEventListener("click", () => {
      const on = mapApi.toggleTiles();
      detail.setAttribute("aria-pressed", String(on));
      detail.querySelector("span").textContent = on ? "Carte dessinée" : "Vue détaillée";
      $("[data-map-credit]").hidden = !on;
    });
  }

  /* ---- fiche d'étape détaillée ------------------------------------------------
     Le contenu vient des données, jamais du HTML : une étape sans récit affiche
     un état d'attente au lieu du texte d'une autre étape.
     ------------------------------------------------------------------------------ */

  function renderSheet() {
    const host = $("[data-sheet-body]");
    if (!host) return;

    const name = nearing.name;
    const story = D.stories[name] || null;
    const leg = (D.legs || []).find((l) => {
      const to = (D.placeByName(l.to) || {}).km ?? 0;
      return nearing.km <= to;
    });

    if (!story) {
      host.innerHTML = `
        <p class="overline">${leg ? leg.name : "Sur le chemin"}</p>
        <h2>${name}</h2>
        <p class="lead">Cette étape n’a pas encore de récit.</p>
        <p class="sheet-note">
          Les fiches s’écrivent au fil du chemin. Une étape non documentée reste
          vierge — elle n’emprunte pas le texte d’une autre.
        </p>`;
      return;
    }

    host.innerHTML = `
      <p class="overline">${leg ? leg.name : "Sur le chemin"}</p>
      <h2>${name}</h2>
      ${story.region ? `<p class="sheet-region">${story.region}</p>` : ""}
      ${story.lead ? `<p class="lead">${story.lead}</p>` : ""}
      ${story.body ? `<p>${story.body}</p>` : ""}
      ${story.quote ? `<blockquote>« ${story.quote} »</blockquote>` : ""}
      ${S.mode === "demo"
        ? `<p class="sheet-note" data-demo-only>Distances calées sur les guides de
           pèlerins : approximations à ±5 à 10 % selon les sources, en attente d’un
           tracé GPX précis.</p>`
        : ""}`;
  }

  /* ---- fenêtres -------------------------------------------------------------- */

  function wireDialogs() {
    $$("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dlg = $(`#${btn.dataset.open}`);
        if (!dlg) return;
        dlg.showModal?.() ?? dlg.setAttribute("open", "");
        document.body.style.overflow = "hidden";
      });
    });

    $$("dialog").forEach((dlg) => {
      $$("[data-close]", dlg).forEach((b) =>
        b.addEventListener("click", () => dlg.close?.()));
      dlg.addEventListener("close", () => { document.body.style.overflow = ""; });
      dlg.addEventListener("click", (e) => {
        if (e.target === dlg) dlg.close?.();   // clic sur le fond
      });
    });
  }

  /* ---- bandeau démonstration -------------------------------------------------- */

  function renderMode() {
    const isDemo = S.mode === "demo";
    $$("[data-demo-only]").forEach((el) => { el.hidden = !isDemo; });
    document.body.classList.toggle("is-demo", isDemo);
  }

  /* ---- défilement du carnet à la molette -------------------------------------- */

  function wireAccordionScroll() {
    const rail = $("[data-accordion]");
    if (!rail) return;

    // Une molette verticale fait défiler le carnet horizontalement : c'est le
    // geste naturel quand on déplie un leporello.
    rail.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const before = rail.scrollLeft;
      rail.scrollLeft += e.deltaY;
      if (rail.scrollLeft !== before) e.preventDefault();
    }, { passive: false });

    $("[data-accordion-next]")?.addEventListener("click", () => {
      rail.scrollBy({ left: rail.clientWidth * .8, behavior: "smooth" });
    });
    $("[data-accordion-prev]")?.addEventListener("click", () => {
      rail.scrollBy({ left: -rail.clientWidth * .8, behavior: "smooth" });
    });
  }

  /* ---- démarrage --------------------------------------------------------------- */

  renderMode();
  renderHeader();
  renderLegs();
  renderDaily();
  renderCredential();
  renderSheet();
  renderTransformation();
  renderMap();
  wireDialogs();
  wireAccordionScroll();
})();
