# Architecture Decision Records (ADR)

Un ADR documente une décision d'architecture technique : pourquoi une structure
de données, une séparation de responsabilités ou un choix technologique a été
retenu plutôt qu'une alternative — et ce que cette décision entraîne comme
conséquences, positives ou non.

Un ADR n'est **pas** une règle de vision produit (ça, c'est la Bible,
`docs/bible/`) ni un journal de décisions de gouvernance (ça, c'est
`docs/decisions/`). Un ADR répond à une question technique précise : *comment
le système est construit, et pourquoi de cette façon*.

## Format

Chaque ADR suit la même structure :

- **Statut** — proposé, accepté, remplacé par un ADR ultérieur.
- **Contexte** — quel problème ou quelle contrainte a mené à cette décision.
- **Décision** — ce qui a été retenu.
- **Conséquences** — ce que ça change, en bien comme en mal.
- **Alternatives envisagées** — ce qui a été considéré et pourquoi ce n'est
  pas ce qui a été retenu.

## Index

| ADR | Titre | Statut |
| --- | --- | --- |
| [ADR-004](ADR-004-place-stamp-separation.md) | Séparation des entités Place et Stamp | Accepté |

**ADR-001 à ADR-003** correspondent à des décisions de conception déjà prises
mais pas encore rédigées dans ce format — elles seront ajoutées une fois leur
contenu définitif fourni. Ne pas déduire leur numérotation exacte de leur
absence : elle a été réservée en amont de leur rédaction, pas encore remplie.
