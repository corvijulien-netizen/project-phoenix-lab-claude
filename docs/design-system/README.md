# Design System — Camino Virtuel

Ce dossier contient les ressources visuelles et sonores **validées** du projet :
logo, icônes, couleurs, typographie, textures, sons, photos, motifs d'interface
et animations.

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
