# Design System — Camino Virtuel

Le Design System est la **source unique de vérité** pour tous les assets
validés du projet : logo, couleurs, icônes, sons, textures, typographie,
photos, animations et composants d'interface. **C'est la seule référence que
Claude Code utilise** pour tout développement ou intégration touchant à
l'apparence du site.

Le Lab (`docs/lab/`) reste, à l'inverse, un espace de recherche et
d'exploration — rien de ce qui s'y trouve n'est utilisable directement sur le
site.

## Le workflow officiel

```
Lab → Validation → Design System → Intégration sur le site
```

Une ressource naît dans le Lab, sous forme d'exploration libre. Elle ne
rejoint le Design System qu'après validation explicite — c'est ce passage qui
la rend utilisable par Claude Code pour une intégration réelle sur le site.

## Règles

- **Le Design System contient uniquement les ressources validées.** Une
  ressource qui n'a pas reçu de statut ✅ Validé n'a pas sa place ici.
- **Claude Code ne doit utiliser que ces ressources** pour tout développement
  ou intégration touchant à l'apparence du site. Aucune ressource extérieure au
  Design System ne doit être introduite dans le code sans passer par ici
  d'abord.
- **Toute nouvelle ressource doit être versionnée** — un numéro de version et
  une date, comme pour un ADR, pour qu'un changement visuel futur puisse être
  distingué de l'original.
- **Une ressource non validée reste dans le Lab** (`docs/lab/`). Elle n'entre
  ici qu'après validation explicite.

## Gabarit d'une ressource validée

Chaque ressource validée — quelle que soit sa catégorie — documente au minimum :

- **un numéro de version** ;
- **un statut** (validé conceptuellement, validé avec fichiers, etc.) ;
- **une courte description** ;
- **les fichiers associés**, lorsqu'ils existent (SVG, PNG, WAV, etc.) — et
  leur absence assumée quand ce n'est pas encore le cas, plutôt que silencieuse.

Voir `assets/logo/README.md` pour un exemple concret de ce gabarit appliqué.

## Structure

| Dossier | Contenu |
| --- | --- |
| `assets/logo/` | Le logo officiel du projet |
| `assets/icons/` | Icônes validées |
| `assets/colors/` | Palette de couleurs validée |
| `assets/typography/` | Polices et échelle typographique validées |
| `assets/textures/` | Textures et matières (papier, grain, etc.) |
| `assets/sounds/` | Ressources sonores validées |
| `assets/photos/` | Photographies validées, prêtes à l'usage |
| `ui/` | Motifs d'interface validés (composants, mises en page de référence) |
| `animations/` | Animations et transitions validées |

Ces dossiers sont créés vides tant qu'aucune ressource n'y a été validée : un
dossier vide ici signifie « rien n'est encore validé pour cette catégorie »,
pas « à remplir dans l'urgence ».
