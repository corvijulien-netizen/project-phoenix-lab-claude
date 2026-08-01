# Charte du projet Camino Virtuel

Ce document décrit **comment** le projet est mené : les rôles, les responsabilités,
la manière dont une décision devient définitive, et les principes de travail qui
s'appliquent à chaque contribution — humaine ou assistée par IA.

Il est distinct de la Bible (`docs/bible/`), qui décrit **ce qu'est** le projet et
**pourquoi** il existe. En cas de question sur la vision produit, c'est la Bible qui
fait foi. En cas de question sur la manière de travailler, c'est ce document.

Cette charte évolue peu dans le temps. Un changement de méthode de travail plus
ponctuel (une nouvelle organisation à mettre en place, une migration de dossiers)
est un **plan d'action**, pas une charte — il vit dans une pull request ou dans
`docs/roadmap/`, pas ici.

---

## 1. Rôles

Le projet est mené par une personne, Julien, assistée de plusieurs outils
complémentaires. Aucun outil ne remplace un autre ; chacun a une fonction distincte.

| Rôle | Fonction |
| --- | --- |
| **Julien** | Porteur du projet. Seule autorité sur la vision, le périmètre, et la décision finale de fusionner un changement dans `main`. |
| **ChatGPT** | Gardien principal de la vision produit — coécrit et fait évoluer la Bible avec Julien. |
| **Claude** (conversation) | Coordinateur technique entre la vision produit et l'implémentation. Peut challenger une décision, détecter une incohérence, proposer une meilleure approche technique, affiner les demandes adressées à Claude Code. |
| **Claude Code** | Agent d'implémentation. Écrit le code, exécute les tests, documente ses décisions techniques. Ne fusionne jamais dans `main` sans demande explicite. |

Les concepts validés dans la Bible restent la référence fonctionnelle pour tout le
monde, outils compris : aucun rôle technique ne peut redéfinir la vision produit de
sa propre initiative.

---

## 2. Où vit une décision

Une décision importante ne doit jamais rester **uniquement** dans l'historique
d'une conversation. Une fois validée, elle trouve sa place dans le dépôt :

| Nature de la décision | Emplacement |
| --- | --- |
| Vision produit, règle fondatrice, philosophie du projet | `docs/bible/` |
| Choix d'architecture technique (structure de données, séparation de responsabilités, choix technologique durable) | `docs/adr/` — un ADR par décision |
| Documentation technique du fonctionnement du site | `docs/architecture/` |
| Fonctionnalités prévues, non encore construites | `docs/roadmap/` |
| Décisions produit ou de gouvernance qui ne sont ni une règle de la Bible ni un choix d'architecture | `docs/decisions/` |

L'objectif : le dépôt GitHub devient progressivement la mémoire officielle du
projet. Un nouveau contributeur — humain ou IA — doit pouvoir comprendre l'état du
projet en lisant le dépôt, sans avoir accès à l'historique des conversations qui
ont mené à chaque décision.

---

## 3. Règles de fusion

- **Aucune branche n'est fusionnée dans `main` sans validation explicite de
  Julien.** Ce n'est pas une question de confiance technique : c'est la règle,
  sans exception, quelle que soit la taille du changement.
- Chaque changement significatif passe par une pull request, relue avant fusion.
- Une pull request qui touche à la fois du fonctionnement de site et de la
  documentation de gouvernance doit, autant que possible, être scindée en deux :
  l'une fonctionnelle, l'autre documentaire. Cela garde chaque revue lisible et
  chaque historique de `main` compréhensible.
- Un agent d'implémentation ne présume jamais qu'une validation de principe
  (« je valide », « d'accord ») vaut autorisation de fusionner. La fusion se
  confirme séparément, explicitement.

---

## 4. Principes de développement

Ces principes s'appliquent à toute contribution technique, humaine ou assistée :

- **Vérifier avant d'agir.** Un état supposé (« la PR doit être fusionnée »,
  « ce fichier doit exister ») se vérifie avant qu'une action s'appuie dessus.
- **Ne jamais inventer une règle, une donnée ou une décision manquante.**
  Si la Bible, un ADR ou une conversation ne tranche pas un point, on le signale
  et on attend — on ne comble pas le vide par une supposition plausible.
- **Aucune donnée fabriquée.** Un kilomètre, un poids, une photo, une progression
  doivent être réels ou explicitement marqués comme donnée de démonstration.
  Une valeur absente reste absente ; elle ne devient jamais une valeur plausible.
- **Documenter la décision, pas seulement le code.** Un changement d'architecture
  s'accompagne d'un ADR. Une règle produit nouvelle rejoint la Bible. Un
  changement dans le code sans trace ailleurs dans le dépôt est incomplet.
- **Le site grandit avec l'aventure.** Une implémentation ne doit jamais
  présumer d'un contenu ou d'un chiffre final qui n'existe pas encore — elle
  reste modulaire, prête à recevoir plus tard ce qui n'est pas encore cadré.

---

## 5. Évolution de ce document

Cette charte est versionnée dans le dépôt comme le reste du projet. Toute
modification passe par une pull request documentaire, jamais par une réécriture
directe sur `main`.
